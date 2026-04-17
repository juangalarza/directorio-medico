# MASTER.MD — Directorio Médico Comodoro
> Documento maestro de referencia para agentes IA y desarrolladores.
> Versión 1.0 | Stack: Next.js · Supabase · Resend · Google Calendar API · Vercel

---

## 0. VISIÓN DEL PRODUCTO

**Problema validado:** Los médicos de Comodoro Rivadavia usan Instagram como directorio improvisado, con pérdida de turnos, sin SEO y con experiencia de usuario deficiente.

**Solución:** Plataforma web con posicionamiento SEO local agresivo, perfil profesional para cada médico y reserva de turnos integrada directamente con Google Calendar. Arquitectura multi-ciudad desde el día 1.

**Diferencial clave:** No es un SaaS de gestión de turnos genérico. Es el directorio de salud #1 de cada ciudad donde opere, monetizable con suscripciones y publicidad local.

---

## 1. STACK TECNOLÓGICO

| Capa | Tecnología | Justificación |
|---|---|---|
| Framework | Next.js 14+ (App Router) | SSR/SSG nativo → SEO óptimo |
| Deploy | Vercel | Edge Network, CI/CD automático |
| Base de datos + Auth | Supabase (PostgreSQL) | Open source, RLS nativo, realtime |
| Mailing | Resend + React Email | Transaccional, alta deliverability |
| Calendario | Google Calendar API (OAuth2) | Lee huecos libres, escribe turnos |
| Mapas | Google Maps Platform | Geolocalización de consultorios |
| Pagos (futuro inmediato) | Mercado Pago | Cobro de suscripciones en AR/LATAM |
| Estilos | Tailwind CSS 4.x + shadcn/ui | DX rápido, componentes accesibles |
| Lenguaje | TypeScript (strict) | Seguridad de tipos en todo el proyecto |

---

## 2. ARQUITECTURA GENERAL

```
directorio-medico/
├── app/
│   ├── (public)/               # Rutas públicas (landing, búsqueda, perfil)
│   │   ├── page.tsx            # Landing / Home
│   │   ├── buscar/             # Motor de búsqueda de médicos
│   │   │   └── page.tsx
│   │   ├── medico/[slug]/      # Perfil público del médico
│   │   │   └── page.tsx
│   │   └── ciudad/[ciudad]/    # Hub SEO por ciudad
│   │       └── page.tsx
│   ├── (auth)/                 # Login / Registro
│   │   ├── login/page.tsx
│   │   └── registro/page.tsx
│   ├── dashboard/              # Área privada del médico
│   │   ├── layout.tsx
│   │   ├── page.tsx            # Resumen / métricas
│   │   ├── perfil/page.tsx     # Editar perfil público
│   │   ├── turnos/page.tsx     # Ver/gestionar turnos
│   │   ├── calendario/page.tsx # Conectar Google Calendar
│   │   └── suscripcion/page.tsx
│   ├── admin/                  # Panel de administración (owner)
│   │   ├── layout.tsx
│   │   ├── medicos/page.tsx
│   │   ├── ciudades/page.tsx
│   │   └── publicidad/page.tsx
│   └── api/
│       ├── auth/               # Supabase auth callbacks
│       ├── turnos/             # POST crear turno, GET disponibilidad
│       ├── google/             # OAuth2 callback, token refresh
│       └── webhooks/           # Mercado Pago events
├── components/
│   ├── ui/                     # shadcn/ui base components
│   ├── landing/                # Secciones de la landing
│   ├── dashboard/              # Componentes del área privada
│   ├── search/                 # Buscador, filtros, tarjetas
│   └── shared/                 # Navbar, Footer, SEO head
├── lib/
│   ├── supabase/               # Client, server, middleware helpers
│   ├── google-calendar/        # OAuth2 + Calendar API wrapper
│   ├── resend/                 # Email templates + sender
│   └── utils/                  # Helpers generales
└── types/                      # Tipos TypeScript globales
```

---

## 3. ESTRUCTURA DE BASE DE DATOS (SUPABASE / POSTGRESQL)

> **Principio de diseño:** Multi-ciudad desde el día 1. Toda entidad relevante tiene `city_id`. Las tablas están normalizadas para evitar duplicación y preparadas para escalar a miles de médicos por ciudad.

---

### 3.1 Tabla: `cities`
```sql
CREATE TABLE cities (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,               -- "Comodoro Rivadavia"
  slug        TEXT UNIQUE NOT NULL,        -- "comodoro-rivadavia"
  province    TEXT NOT NULL,               -- "Chubut"
  country     TEXT NOT NULL DEFAULT 'AR',
  is_active   BOOLEAN DEFAULT TRUE,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);
```

---

### 3.2 Tabla: `specialties`
```sql
CREATE TABLE specialties (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT UNIQUE NOT NULL,        -- "Cardiología"
  slug        TEXT UNIQUE NOT NULL,        -- "cardiologia"
  icon_name   TEXT,                        -- Nombre de ícono (Lucide, etc.)
  created_at  TIMESTAMPTZ DEFAULT NOW()
);
```

---

### 3.3 Tabla: `profiles` (extiende auth.users de Supabase)
```sql
CREATE TABLE profiles (
  id              UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role            TEXT NOT NULL DEFAULT 'doctor'  -- 'doctor' | 'admin'
    CHECK (role IN ('doctor', 'admin')),
  full_name       TEXT,
  avatar_url      TEXT,
  phone           TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);
```

---

### 3.4 Tabla: `doctors` (perfil público + datos profesionales)
```sql
CREATE TABLE doctors (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id          UUID UNIQUE NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  city_id             UUID NOT NULL REFERENCES cities(id),

  -- Identidad profesional
  slug                TEXT UNIQUE NOT NULL,     -- "dr-juan-perez-cardiologo"
  full_name           TEXT NOT NULL,
  bio                 TEXT,
  profile_image_url   TEXT,
  cover_image_url     TEXT,

  -- Contacto y ubicación
  address             TEXT,
  lat                 NUMERIC(9,6),
  lng                 NUMERIC(9,6),
  maps_place_id       TEXT,                     -- Google Place ID
  whatsapp_number     TEXT,                     -- Solo en plan Premium
  website_url         TEXT,

  -- Datos médicos
  license_number      TEXT,                     -- Matrícula
  medical_school      TEXT,
  graduation_year     INT,

  -- Plan y visibilidad
  plan                TEXT NOT NULL DEFAULT 'free'
    CHECK (plan IN ('free', 'premium')),
  is_verified         BOOLEAN DEFAULT FALSE,
  is_active           BOOLEAN DEFAULT TRUE,
  search_priority     INT DEFAULT 0,            -- Mayor = más arriba en resultados

  -- SEO
  meta_title          TEXT,
  meta_description    TEXT,

  created_at          TIMESTAMPTZ DEFAULT NOW(),
  updated_at          TIMESTAMPTZ DEFAULT NOW()
);
```

---

### 3.5 Tabla: `doctor_specialties` (relación M:N)
```sql
CREATE TABLE doctor_specialties (
  doctor_id     UUID NOT NULL REFERENCES doctors(id) ON DELETE CASCADE,
  specialty_id  UUID NOT NULL REFERENCES specialties(id) ON DELETE CASCADE,
  is_primary    BOOLEAN DEFAULT FALSE,
  PRIMARY KEY (doctor_id, specialty_id)
);
```

---

### 3.6 Tabla: `doctor_schedule` (horarios de atención)
```sql
CREATE TABLE doctor_schedule (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  doctor_id     UUID NOT NULL REFERENCES doctors(id) ON DELETE CASCADE,
  day_of_week   INT NOT NULL CHECK (day_of_week BETWEEN 0 AND 6), -- 0=Dom
  start_time    TIME NOT NULL,
  end_time      TIME NOT NULL,
  slot_minutes  INT NOT NULL DEFAULT 30,        -- Duración del turno
  is_active     BOOLEAN DEFAULT TRUE
);
```

---

### 3.7 Tabla: `google_calendar_tokens`
```sql
CREATE TABLE google_calendar_tokens (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  doctor_id       UUID UNIQUE NOT NULL REFERENCES doctors(id) ON DELETE CASCADE,
  access_token    TEXT NOT NULL,               -- Cifrado en app layer
  refresh_token   TEXT NOT NULL,               -- Cifrado en app layer
  token_expiry    TIMESTAMPTZ NOT NULL,
  calendar_id     TEXT NOT NULL DEFAULT 'primary',
  connected_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);
```
> ⚠️ Los tokens deben encriptarse antes de persistir (AES-256 o Supabase Vault).

---

### 3.8 Tabla: `appointments` (turnos reservados)
```sql
CREATE TABLE appointments (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  doctor_id           UUID NOT NULL REFERENCES doctors(id),
  google_event_id     TEXT,                    -- ID del evento en Google Calendar

  -- Datos del paciente (no registrado)
  patient_name        TEXT NOT NULL,
  patient_email       TEXT NOT NULL,
  patient_phone       TEXT,

  -- Turno
  start_datetime      TIMESTAMPTZ NOT NULL,
  end_datetime        TIMESTAMPTZ NOT NULL,
  reason              TEXT,                    -- Motivo de consulta

  -- Estado
  status              TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  cancellation_reason TEXT,

  -- Tracking
  booked_via          TEXT DEFAULT 'web'
    CHECK (booked_via IN ('web', 'whatsapp', 'admin')),

  created_at          TIMESTAMPTZ DEFAULT NOW(),
  updated_at          TIMESTAMPTZ DEFAULT NOW()
);
```

---

### 3.9 Tabla: `subscriptions`
```sql
CREATE TABLE subscriptions (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  doctor_id           UUID NOT NULL REFERENCES doctors(id),
  plan                TEXT NOT NULL CHECK (plan IN ('free', 'premium')),
  status              TEXT NOT NULL DEFAULT 'active'
    CHECK (status IN ('active', 'cancelled', 'past_due', 'trial')),

  -- Mercado Pago
  mp_subscription_id  TEXT UNIQUE,
  mp_preapproval_id   TEXT,

  -- Período
  current_period_start TIMESTAMPTZ,
  current_period_end   TIMESTAMPTZ,
  trial_end            TIMESTAMPTZ,

  created_at          TIMESTAMPTZ DEFAULT NOW(),
  updated_at          TIMESTAMPTZ DEFAULT NOW()
);
```

---

### 3.10 Tabla: `ads` (banners publicitarios)
```sql
CREATE TABLE ads (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  city_id       UUID REFERENCES cities(id),    -- NULL = todas las ciudades
  advertiser    TEXT NOT NULL,                  -- "Farmacia del Pueblo"
  image_url     TEXT NOT NULL,
  link_url      TEXT,
  position      TEXT NOT NULL                  -- 'sidebar' | 'banner_top' | 'banner_mid'
    CHECK (position IN ('sidebar', 'banner_top', 'banner_mid')),
  starts_at     TIMESTAMPTZ NOT NULL,
  ends_at       TIMESTAMPTZ NOT NULL,
  is_active     BOOLEAN DEFAULT TRUE,
  click_count   INT DEFAULT 0,
  impression_count INT DEFAULT 0,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);
```

---

### 3.11 Tabla: `reviews` (reseñas de pacientes — futuro)
```sql
CREATE TABLE reviews (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  doctor_id   UUID NOT NULL REFERENCES doctors(id) ON DELETE CASCADE,
  patient_email TEXT,
  rating      INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment     TEXT,
  is_verified BOOLEAN DEFAULT FALSE,
  is_visible  BOOLEAN DEFAULT FALSE,         -- Requiere moderación
  created_at  TIMESTAMPTZ DEFAULT NOW()
);
```

---

### 3.12 Índices clave
```sql
-- Búsquedas por ciudad + especialidad (consulta más frecuente)
CREATE INDEX idx_doctors_city ON doctors(city_id);
CREATE INDEX idx_doctors_plan_priority ON doctors(plan, search_priority DESC);
CREATE INDEX idx_doctor_specialties_specialty ON doctor_specialties(specialty_id);

-- Turnos por médico y fecha
CREATE INDEX idx_appointments_doctor_date ON appointments(doctor_id, start_datetime);
CREATE INDEX idx_appointments_status ON appointments(status);

-- Anuncios activos por ciudad
CREATE INDEX idx_ads_city_active ON ads(city_id, is_active, ends_at);
```

---

### 3.13 Row Level Security (RLS)
```sql
-- doctors: cada médico solo edita su propio perfil
ALTER TABLE doctors ENABLE ROW LEVEL SECURITY;
CREATE POLICY "doctors_own_update" ON doctors
  FOR UPDATE USING (profile_id = auth.uid());

-- appointments: médico ve sus propios turnos
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "appointments_doctor_select" ON appointments
  FOR SELECT USING (
    doctor_id IN (SELECT id FROM doctors WHERE profile_id = auth.uid())
  );

-- google_calendar_tokens: solo el propietario
ALTER TABLE google_calendar_tokens ENABLE ROW LEVEL SECURITY;
CREATE POLICY "tokens_own" ON google_calendar_tokens
  FOR ALL USING (
    doctor_id IN (SELECT id FROM doctors WHERE profile_id = auth.uid())
  );
```

---

## 4. ESTRUCTURA DE PÁGINAS Y DASHBOARDS

### 4.1 Área Pública

| Ruta | Descripción | SEO |
|---|---|---|
| `/` | Landing principal con hero, CTA, cómo funciona, planes | H1: "Encontrá tu médico en Comodoro" |
| `/buscar` | Motor de búsqueda con filtros (especialidad, ciudad, plan) | Dynamic |
| `/medico/[slug]` | Perfil del médico + formulario de turno | H1: nombre + especialidad |
| `/ciudad/[ciudad]` | Hub de ciudad con médicos destacados | H1: "Médicos en [Ciudad]" |
| `/ciudad/[ciudad]/[especialidad]` | Landing SEO por especialidad + ciudad | Máximo valor SEO |

### 4.2 Dashboard del Médico

| Sección | Funcionalidades |
|---|---|
| **Inicio** | Métricas: visitas al perfil, turnos del mes, % ocupación |
| **Mi Perfil** | Editor completo: foto, bio, dirección, horarios, especialidades |
| **Turnos** | Vista de agenda (calendario + lista), cancelar, confirmar |
| **Google Calendar** | Conectar/desconectar OAuth2, elegir calendario, ver estado de sync |
| **Suscripción** | Plan actual, upgrade a Premium, historial de pagos |
| **WhatsApp** | (Premium) Configurar número y mensaje predefinido |

### 4.3 Panel de Administración

| Sección | Funcionalidades |
|---|---|
| **Médicos** | Listado, verificar, cambiar plan manualmente, desactivar |
| **Ciudades** | Activar nueva ciudad, asignar slug, configurar SEO |
| **Publicidad** | CRUD de banners, fechas, ciudades, métricas de impresiones |
| **Reportes** | MRR, churn, ciudades más activas |

---

## 5. FLUJOS CRÍTICOS

### 5.1 Reserva de Turno (Plan Premium)
```
Paciente → Perfil del médico
→ Selecciona fecha/hora (slots desde Google Calendar API)
→ Completa nombre + email + teléfono + motivo
→ POST /api/turnos
  → Escribe evento en Google Calendar (OAuth2)
  → INSERT en tabla appointments
  → Resend: email de confirmación al paciente
  → Resend: notificación al médico
→ Redirección a página de confirmación con código de turno
```

### 5.2 Registro de Médico
```
Médico → /registro
→ Supabase Auth (email/password)
→ Trigger DB: crea perfil en `profiles` + `doctors` (plan: free)
→ Onboarding wizard:
  1. Datos básicos (nombre, especialidad, ciudad)
  2. Foto de perfil
  3. Dirección del consultorio
  4. Horarios de atención
→ Dashboard habilitado (plan Free activo)
```

### 5.3 Upgrade a Premium
```
Médico → Dashboard → Suscripción → "Quiero Premium"
→ Mercado Pago: crear suscripción recurrente
→ Webhook MP → POST /api/webhooks
  → UPDATE doctors SET plan = 'premium'
  → INSERT subscriptions
  → Resend: email de bienvenida Premium
→ Funcionalidades desbloqueadas: Google Calendar, WhatsApp, prioridad
```

---

## 6. MODELO DE NEGOCIO

### Planes de Suscripción

| Feature | Gratis | Premium ($15–$25 USD/mes) |
|---|---|---|
| Perfil público | ✅ | ✅ |
| Aparición en búsquedas | ✅ (última posición) | ✅ (posición prioritaria) |
| Horarios visibles | ✅ | ✅ |
| Botón de WhatsApp | ❌ | ✅ |
| Reserva de turnos online | ❌ | ✅ |
| Sync con Google Calendar | ❌ | ✅ |
| Notificaciones por email | ❌ | ✅ |
| Badge "Verificado" | ❌ | ✅ |
| Estadísticas del perfil | ❌ | ✅ |

### Publicidad
- Espacios para laboratorios, farmacias y clínicas locales
- Segmentación por ciudad
- CPM fijo mensual (no programático en etapa inicial)

### Escalabilidad Multi-Ciudad
- Nueva ciudad = nuevo registro en `cities` + slug + landing `/ciudad/[slug]`
- Sin cambios en código, sin migraciones de DB
- Campaña de captación local de médicos (ciclo repetible)

---

## 7. FASES DE EJECUCIÓN

### Fase 1 — MVP (Semanas 1–3)
- [ ] Setup Next.js + Supabase + Vercel + Resend
- [ ] Migraciones de DB completas (todas las tablas de la sección 3)
- [ ] Auth: registro e inicio de sesión de médicos
- [ ] Perfil público del médico (sin turno online)
- [ ] Motor de búsqueda básico (por especialidad + ciudad)
- [ ] Landing principal con SEO base
- [ ] Dashboard: editor de perfil + horarios

### Fase 2 — Monetización (Semanas 4–5)
- [ ] Integración Google Calendar OAuth2 (leer disponibilidad)
- [ ] Formulario de reserva de turno → escribe en Calendar
- [ ] Emails de confirmación con Resend
- [ ] Integración Mercado Pago suscripciones recurrentes
- [ ] Webhook MP → actualización automática de plan
- [ ] Botón WhatsApp en perfil Premium

### Fase 3 — SEO & Crecimiento (Semanas 6–7)
- [ ] Landings SEO por ciudad + especialidad (`/ciudad/comodoro-rivadavia/cardiologia`)
- [ ] Sitemap dinámico + robots.txt + metadatos OG
- [ ] Google Maps en perfil de médico
- [ ] Panel de administración completo
- [ ] Sistema de banners publicitarios

### Fase 4 — Expansión
- [ ] Segunda ciudad (San Juan u otra)
- [ ] Reviews moderadas de pacientes
- [ ] App móvil (React Native / Expo) — opcional
- [ ] API pública para integraciones de terceros

---

## 8. VARIABLES DE ENTORNO REQUERIDAS

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Google
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REDIRECT_URI=https://tudominio.com/api/google/callback

# Resend
RESEND_API_KEY=
RESEND_FROM_EMAIL=turnos@directoriomedico.com

# Mercado Pago
MP_ACCESS_TOKEN=
MP_WEBHOOK_SECRET=

# Encriptación de tokens
ENCRYPTION_KEY=                        # 32 bytes, AES-256

# App
NEXT_PUBLIC_APP_URL=https://tudominio.com
NEXT_PUBLIC_GOOGLE_MAPS_KEY=
```

---

## 9. PROMPT DE DISEÑO PARA PENCIL.DEV

Usar este prompt como brief de diseño web para la plataforma completa:

---

```
Diseña una plataforma de directorio médico llamada "Directorio Médico Comodoro" con foco en conversión alta, confianza inmediata y experiencia de usuario excepcional. 

IDENTIDAD VISUAL
- Nombre tentativo: "MediComodoro" o similar. Limpio, moderno, local.
- Paleta: Azul profundo (#0F2D5E) como color primario de confianza médica. Blanco puro como base. Un acento verde-salud vibrante (#00C896) para CTAs y elementos de acción. Grises neutros para jerarquía de texto.
- Tipografía: Display serif moderna (como Playfair Display o Cormorant) para títulos que transmitan autoridad y calidez. Sans-serif limpia y geométrica (DM Sans o Plus Jakarta Sans) para cuerpo y UI. Nunca Inter ni Arial.
- Mood: Confiable pero accesible. Clínico sin frialdad. Premium sin ser inaccesible. Como si Notion y una clínica privada de primer nivel tuvieran un hijo.

LANDING PAGE — SECCIONES Y UX
1. HERO: Buscador prominente en primer plano ("¿Qué especialista buscás?") con campo de texto + selector de especialidad + botón CTA verde. Fondo con fotografía o ilustración médica de alta calidad, no de stock genérico. Sub-headline que comunique: velocidad + confianza + facilidad para sacar turno. Badge social proof: "X médicos registrados · Y turnos reservados este mes".

2. CÓMO FUNCIONA: 3 pasos visuales con iconografía custom, no genérica. Paso 1: Buscá tu especialista. Paso 2: Revisá su perfil y disponibilidad. Paso 3: Reservá tu turno al instante. Animación sutil de entrada al hacer scroll.

3. ESPECIALIDADES DESTACADAS: Grid de cards con ícono + nombre de especialidad. Al hacer hover, micro-animación de elevación. Mínimo 8 especialidades. Diseño tipo "pill tags" o cards redondeadas.

4. MÉDICOS DESTACADOS: Carrusel o grid de 3-4 perfiles premium. Foto circular del médico, nombre, especialidad, ciudad, badge "Verificado", botón "Reservar turno". Estética de tarjeta de presentación premium.

5. PARA MÉDICOS (sección de conversión B2B): Split layout. Izquierda: mockup del dashboard del médico en un frame de laptop/tablet. Derecha: headline + bullets de beneficios (más visibilidad, turnos automáticos, pacientes reales) + CTA "Registrá tu consultorio gratis". Diseño que transmite profesionalismo y ahorro de tiempo.

6. PLANES Y PRECIOS: Cards de comparación Gratis vs Premium. La card Premium debe dominar visualmente (borde destacado, badge "Más elegido"). Lista de features con check/cross. CTA de upgrade prominente.

7. TESTIMONIOS: 2-3 citas de médicos o pacientes. Diseño editorial con comilla grande decorativa. Foto y nombre del testimonial.

8. FOOTER: Logo + links útiles + redes sociales + "Próximamente en San Juan" como señal de expansión.

PERFIL DEL MÉDICO (página individual)
- Layout de 2 columnas: izquierda ancha con info del médico, derecha sticky con el widget de reserva de turno.
- Header con foto de perfil grande (circular), nombre, especialidad, badge verificado, rating (si tiene), botón WhatsApp (plan premium).
- Mapa de Google integrado mostrando ubicación del consultorio.
- Sección de horarios de atención visualmente clara (grilla por día).
- Widget de reserva: calendario compacto con slots disponibles resaltados en verde. Al seleccionar slot, aparece formulario inline (nombre, email, teléfono, motivo). UX de 2 pasos máximo.
- El CTA de reservar turno debe ser imposible de perder.

DASHBOARD DEL MÉDICO
- Sidebar oscuro (#0F2D5E) con iconografía y labels claros.
- Header con saludo personalizado y resumen rápido (turnos hoy, esta semana).
- Cards de métricas estilo glassmorphism sutil sobre fondo claro.
- Sección de próximos turnos con timeline visual.
- Estado de conexión con Google Calendar: chip verde/rojo visible siempre.
- Formularios de edición de perfil con autoguardado y feedback visual.

PRINCIPIOS UX IRRENUNCIABLES
- Mobile-first y 100% responsive. El 70%+ del tráfico será móvil.
- Velocidad percibida: skeleton loaders, optimistic UI, transiciones de 200ms.
- Accesibilidad: contraste AA mínimo, tamaños de tap target ≥ 44px, labels en formularios siempre visibles.
- Confianza visual: badge "SSL Seguro", logos de métodos de pago, número de médicos registrados siempre visible.
- El flow de reservar un turno no debe tener más de 3 clicks desde cualquier punto del sitio.
- Los CTAs principales siempre en verde vibrante (#00C896). Los CTAs secundarios en outlined azul. Nunca gris para acciones importantes.
- Jerarquía visual brutal: el usuario debe saber en 3 segundos qué hace el sitio y cómo sacar un turno.

MICROINTERACCIONES REQUERIDAS
- Buscador con autocompletado de especialidades en tiempo real.
- Cards de médico con hover elevation + aparición de botón "Reservar".
- Slots del calendario con estado: disponible (verde), seleccionado (azul oscuro), ocupado (gris tachado).
- Formulario de turno con validación en línea y confirmación animada al final.
- Dashboard: indicador de % de perfil completado con barra de progreso y sugerencias de qué completar.

REFERENTES VISUALES
- Estética general: Doctolib (Francia) + Cal.com + Linear
- Cards y componentes: Vercel Design System
- Fotografía: Unsplash categoría "medical professional" pero con edición de color para que encaje con la paleta
- Nunca: fondos púrpura, iconografía de clip art médico, stock photos de doctores genéricos sonriendo forzado
```

---

## 10. CONVENCIONES DEL PROYECTO

- **Commits:** `feat:`, `fix:`, `chore:`, `db:` como prefijos
- **Nomenclatura DB:** `snake_case` siempre
- **Nomenclatura TS:** `camelCase` para variables, `PascalCase` para tipos/componentes
- **Rutas API:** RESTful. Ej: `POST /api/turnos`, `GET /api/medicos/[slug]/disponibilidad`
- **Idioma del código:** inglés. Idioma de la UI y comentarios de negocio: español
- **Secretos:** Nunca en el código. Siempre en `.env.local` + Vercel Environment Variables
- **Migraciones DB:** Solo via Supabase Dashboard o CLI (`supabase migration new`). Nunca SQL crudo en producción sin versionar.

---

*Este documento es la fuente de verdad del proyecto. Cualquier decisión técnica que contradiga este master.md debe discutirse y actualizarse aquí antes de implementarse.*
