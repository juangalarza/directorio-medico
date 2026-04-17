# Tareas del Proyecto: Directorio Médico Comodoro

Este documento es el checklist de ejecución del proyecto, basado estructuradamente en las fases y requerimientos del archivo `master.md`.
Marcaremos las tareas con `[ ]` (pendientes), `[/]` (en progreso), y `[x]` (completadas).

## 🚀 Fase 1: MVP (Semanas 1–3)
**Objetivo:** Setup inicial, base de datos completa, autenticación, landing public y dashboard base.

- [ ] **Setup Inicial**
  - [ ] Inicializar proyecto Next.js 14+ (App Router).
  - [ ] Configurar Tailwind CSS + shadcn/ui.
  - [ ] Configurar variables de entorno iniciales (Supabase, Vercel).
  - [ ] Integrar TypeScript estricto.

- [ ] **Base de Datos (Supabase)**
  - [ ] Crear tabla `cities`.
  - [ ] Crear tabla `specialties`.
  - [ ] Crear tabla `profiles` (extensión de auth.users).
  - [ ] Crear tabla `doctors` (perfil profesional + datos).
  - [ ] Crear tabla `doctor_specialties` (M:N).
  - [ ] Crear tabla `doctor_schedule` (horarios obligatorios).
  - [ ] Crear tabla `google_calendar_tokens`.
  - [ ] Crear tabla `appointments` (turnos).
  - [ ] Crear tabla `subscriptions`.
  - [ ] Crear tabla `ads` (banners publicitarios).
  - [ ] Crear tabla `reviews`.
  - [ ] Configurar RLS (Row Level Security) para tables relevantes (doctors, appointments, tokens).
  - [ ] Crear índices de la base de datos (sección 3.12).

- [ ] **Autenticación (Médicos)**
  - [ ] Configurar Supabase Auth (email/password).
  - [ ] Crear triggers en Supabase DB para popular `profiles` y `doctors` (plan free) al registro.
  - [ ] Construir página `/registro`.
  - [ ] Construir wizard/onboarding inicial de médicos (Datos básicos, Foto, Dirección, Horarios).
  - [ ] Construir página `/login`.

- [ ] **Desarrollo Público (Frontend de Buscador)**
  - [ ] Crear Landing Page (`/`) con estética definida (hero, cómo funciona, especialidades destacadas, métricas).
  - [ ] Construir `/buscar` (Motor de búsqueda con filtros ciudad, especialidad, etc).
  - [ ] Desarrollar `/medico/[slug]` (Perfil público estilizado, todavía sin turno online activo).
  - [ ] Implementar componente NavBar / Footer estándar.

- [ ] **Desarrollo Privado (Dashboard Médico MVP)**
  - [ ] Crear layout `/dashboard/`.
  - [ ] Panel Inicio con resumen básico de métricas.
  - [ ] Editor de `/dashboard/perfil` completo (foto, bio, dirección, especialidades).
  - [ ] Interfaz de gestión de `/dashboard/horarios` (editor de días/slots y duración de turnos).

## 💰 Fase 2: Monetización y Turnos (Semanas 4–5)
**Objetivo:** Integraciones de Google Calendar, Reservas asíncronas de pacientes, y Módulo Mercado Pago.

- [ ] **Google Calendar API**
  - [ ] OAuth2 conectividad en `/dashboard/calendario`.
  - [ ] Guardado seguro y encriptación de Tokens en BD.
  - [ ] Función para leer disponibilidad/huecos libres del médico según slots del respectivo Google Calendar.

- [ ] **Sistema de Turnos**
  - [ ] Front-end: Formulario UI embebido en perfil público para reservar turno en base a disponibilidad obtenida de Calendar.
  - [ ] Back-end `POST /api/turnos`: Validaciones, agendamiento de evento y almacenamiento en DB (`appointments`).

- [ ] **Notificaciones Emails (Resend)**
  - [ ] Setup Resend + React Email.
  - [ ] Email de confirmación al paciente por turno reservado.
  - [ ] Email de notificación de turno al médico.
  - [ ] Email de bienvenida por Upgrade a Premium.

- [ ] **Pasarela de Pagos (Mercado Pago)**
  - [ ] UI de planes y suscripciones `/dashboard/suscripcion`.
  - [ ] Integrar MP suscripciones recurrentes.
  - [ ] Webhook listener (`/api/webhooks`) para actualizar DB (`doctors` y `subscriptions`) on-the-fly.
  - [ ] Habilitar botón especial UI para médicos que pagan: WhatsApp con links personalizados.

## 📈 Fase 3: SEO & Crecimiento (Semanas 6–7)
**Objetivo:** Expansión de captación de tráfico web local e interfaz de control administrativa.

- [ ] **Optimización SEO y Landings de Ciudad**
  - [ ] Hub Principal de Ciudad `/ciudad/[ciudad]` (Médicos destacados locales).
  - [ ] Landing por Especialidad+Ciudad `/ciudad/[ciudad]/[especialidad]` (Full SEO metadata).
  - [ ] Configurar Metadata OG tags (dynamic meta title, decription).
  - [ ] Construcción de sitemap.xml dinámico y robots.txt ajustado.

- [ ] **UI Mejorada**
  - [ ] Integrar Google Maps en el Perfil del Médico nativamente.

- [ ] **Panel Admin**
  - [ ] Crear Layout admin seguro para Rol Owner (`/admin`).
  - [ ] ABM (CRUD) completo de Médicos (Cambio de plan a mano, verificaciones explícitas, banneos).
  - [ ] Interfaz de configuración de Ciudades.
  - [ ] Módulo completo de Publicidad (`/admin/publicidad`): Creación de banners e inserción en frontend.

## 🌍 Fase 4: Expansión (Futuro Cercano)
**Objetivo:** Aumentar alcance, consolidar y derivar productos adicionales.

- [ ] Añadir nueva ciudad (p.ej. San Juan). Repetir ciclo operatorio.
- [ ] Módulo de Sistema de Reviews / Reseñas moderables.
- [ ] Exponer una API Pública.
- [ ] Desarrollo de App Móvil (React Native/Expo).

---

> Al recibir la orden de inicio, usaremos este documento para registrar avances (cambiando `[ ]` por `[/]` y `[x]`), siempre rigiéndonos por las reglas visuales/arquitectónicas de `master.md`.
