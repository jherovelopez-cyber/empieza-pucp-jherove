# Empieza PUCP

Empieza PUCP es una plataforma mobile-first para estudiantes de nuevo ingreso de la Pontificia Universidad Catolica del Peru. Ordena informacion que ya existe, pero que normalmente llega fragmentada, en una ruta clara para cachimbos, Jefes de Horario y Centros Federados.

## Stack

- Next.js App Router, React y TypeScript strict.
- Tailwind CSS con componentes estilo shadcn/ui.
- TanStack Query para server state.
- Zustand solo para estado temporal de interfaz del mapa.
- Supabase Auth, PostgreSQL, Storage y Realtime preparado.
- MapLibre GL JS, GeoJSON y pathfinding demo.
- Vitest y React Testing Library.
- PWA lista para Vercel.

## Arquitectura

El proyecto usa un monolito modular organizado por dominios en `src/features`. La UI consume repositorios, no llamadas directas a Supabase. Hoy la app usa datos demo; las implementaciones Supabase quedan preparadas para reemplazar esos repositorios sin reescribir componentes.

## Estructura

- `src/app`: rutas publicas y zonas por rol.
- `src/features`: auth, onboarding, campus-map, grades, JH, CF y demo data.
- `src/components`: componentes reutilizables de layout, navegacion, feedback y UI.
- `src/services`: Supabase y mapas.
- `public/campus`: GeoJSON demo.
- `supabase/migrations`: esquema inicial con RLS.
- `tests`: pruebas unitarias principales.
- `docs/architecture.md`: documento tecnico.

## Roles

- Cachimbo: onboarding, mapa, cursos, JH, notificaciones y perfil.
- JH: dashboard, grupo, checklist, mensajes, recursos y perfil.
- CF: coordinacion, JH, horarios, contenido, anuncios, reportes y perfil.

## Instalacion

```bash
corepack enable
pnpm install
```

## Ejecucion

```bash
pnpm dev
```

Abre `http://localhost:3000`.

## Pruebas y calidad

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

## Modo Demo

El archivo `.env.example` incluye:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_DEMO_MODE=true
```

Con `NEXT_PUBLIC_DEMO_MODE=true`, el login permite entrar con:

- `student@demo.com`: Cachimbo.
- `jh@demo.com`: JH.
- `cf@demo.com`: Centro Federado.

No se requieren credenciales reales para ejecutar la aplicacion.

## Supabase Real

Para conectar Supabase:

1. Crea un proyecto en Supabase.
2. Ejecuta `supabase/migrations/0001_initial_schema.sql`.
3. Carga `supabase/seed.sql` si quieres datos base.
4. Configura `.env.local` con `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` y `NEXT_PUBLIC_DEMO_MODE=false`.
5. Implementa los repositorios Supabase pendientes para onboarding, grades, JH, CF y contenido.

El modelo incluye perfiles, facultades, semestres, grupos, miembros de grupo, onboarding, checklist JH, anuncios, cursos, esquemas de evaluacion, notas, lugares del campus y recursos de contenido.

## Campus Demo

Los datos de campus estan en `public/campus/*.geojson` y en `src/features/demo/demo-data.ts`. Para reemplazarlos por datos reales PUCP, conserva los tipos `CampusPlace`, `CampusRoute` y `CampusNode`, cambia el repositorio de mapas y conecta el algoritmo A* o Dijkstra con el grafo real de rutas.

## Roadmap

- Repositorios Supabase completos.
- Formularios reales para anuncios y contenido.
- Notificaciones push.
- Mapas PUCP reales y rutas accesibles.
- Reportes agregados por facultad y grupo.
- Integracion institucional cuando existan credenciales y permisos.
