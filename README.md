# Irving Acosta — Portafolio

Portafolio personal de una sola página, construido con **Vite**, **React** y **Tailwind CSS**, optimizado para desplegarse en **Vercel**.

## Características

- Hero interactivo con `HeroField` y nombre magnético (`MagneticName`)
- Overlay de proyectos con View Transitions API
- Accesibilidad: skip link, `inert` en el shell al abrir overlay, lazy-loading de imágenes
- Respeto a `prefers-reduced-motion`
- SEO básico: meta description, Open Graph y Twitter cards
- Analytics y rendimiento en producción (Vercel)

## Secciones

| Sección   | Contenido                                      |
|-----------|------------------------------------------------|
| Hero      | Tagline + nombre + redes sociales              |
| Acerca de | Biografía                                      |
| Servicios | Grid de servicios                              |
| Proyectos | Cards con preview e overlay de detalle         |
| Contacto  | Enlaces sociales                               |

## Stack

- Vite 6 + React 18
- Tailwind CSS 3
- `@vercel/analytics` — visitas y eventos
- `@vercel/speed-insights` — Core Web Vitals

## Requisitos

- Node.js **≥ 20**

## Desarrollo

```bash
npm install
npm run dev
```

## Scripts

| Comando           | Descripción                |
|-------------------|----------------------------|
| `npm run dev`     | Servidor de desarrollo     |
| `npm run build`   | Build de producción → `dist` |
| `npm run preview` | Previsualizar el build     |
| `npm run lint`    | ESLint                     |

## Personalizar contenido

Edita `src/yourData.js` para actualizar:

- Nombre y taglines del hero
- Texto “Acerca de mí”
- Servicios
- Proyectos (título, descripción, imagen, URL)
- Enlaces sociales

Las imágenes de proyectos viven en `public/static/images/`.

## Deploy en Vercel

El proyecto incluye `vercel.json` con:

- Framework **Vite** y output `dist`
- Rewrite SPA (sin romper `/assets` ni `/static`)
- Cache largo e inmutable para assets hasheados
- Cache con `stale-while-revalidate` para imágenes estáticas
- Headers de seguridad (`X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`)

### Pasos

1. Importa el repo en [Vercel](https://vercel.com/new).
2. Deja el framework en **Vite** (o déjalo auto-detectar).
3. Build: `npm run build` → directorio `dist`.
4. En el dashboard, activa:
   - **Analytics**
   - **Speed Insights**

## Estructura

```
src/
  App.jsx                 # Layout principal + analytics
  yourData.js             # Contenido editable
  components/             # UI (Header, WorkCard, overlay, etc.)
  hooks/                  # useViewTransition, reduced motion
  styles/globals.css      # Tokens y estilos globales
public/static/images/     # Assets de proyectos
vercel.json               # Config de deploy y caching
vite.config.js            # Build: chunks de React, target es2020
```

## Optimizaciones de build

- Chunk separado de `react` / `react-dom` para mejor caching
- CSS code-splitting
- Target `es2020` (navegadores modernos)
- Sin sourcemaps en producción
