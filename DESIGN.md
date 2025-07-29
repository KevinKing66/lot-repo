# DESIGN.md

## Stack Seleccionado

- **Frontend:** React + Vite
- **Backend:** Express.js con TypeScript
- **Base de Datos:** PostgreSQL

---

## Justificación del Stack

### 🔷 Frontend: React + Vite

- **React** es una librería moderna, ampliamente adoptada y con una gran comunidad.
- **Vite** es un *bundler* rápido y moderno, con soporte para hot module replacement (HMR) mucho más veloz que Webpack.

---

### 🔷 Backend: Express + TypeScript

- **Express** es un framework minimalista, fácil de entender y con buena documentación, aparte de estar mas familiarizado con el uso de websocket en comparacion a NestJS.
- **TypeScript** aporta tipado estático, ayudando a detectar errores en tiempo de desarrollo y mejorando el autocompletado.


---

### 🔷 Base de Datos: PostgreSQL

- PostgreSQL es una base de datos relacional robusta, con soporte para funciones avanzadas.
- su velocidad
- Es de código abierto, confiable, y bien documentado.

**Desventajas:**
- La gestión de esquemas puede ser más rígida que en bases NoSQL como MongoDB.
- Puede requerir ajustes de rendimiento para grandes volúmenes si no se diseñan bien los índices o consultas.

---

## Alternativas Consideradas

- **MongoDB:** descartado por falta de consistencia relacional fuerte.
- **NestJS:** más robusto, pero mayor curva de aprendizaje frente a Express.
- **Next.js:** ideal para SSR, pero innecesario si la app es estrictamente SPA.

---

## Conclusión

El stack elegido balancea simplicidad, velocidad de desarrollo y robustez. Es ideal para aplicaciones de tamaño medio con necesidad de control estricto en el backend y una interfaz web interactiva.
