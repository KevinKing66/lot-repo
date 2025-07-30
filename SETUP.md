# SETUP.md

## Requisitos Previos

- Node.js ≥ 18.x
- PostgreSQL ≥ 14.x
- Yarn o npm
- Docker/Docker Desk (en mac/linux debemos de instalar docker.io y docker-compose)
- Git

---

## Estructura General

1. LoT: Esta es el frontend (React + Vite)
- src: Código fuente principal del proyecto.
- src/assets: Archivos estáticos como imágenes, íconos o fuentes.
- src/features: Los módulos funcionales separados por dominio.
- src/core: Contiene la lógica esencial y de arranque del sistema.
- src/shared: Código reutilizable entre varios features
- component: Componentes reutilizables.
- context: Contextos globales de React (como autenticación, tema, usuario, etc.).
- hooks: Custom hooks reutilizables para lógica compartida entre componentes.
- pages: Vistas principales del sistema, cada una asociada a una ruta.
- reducers: Reducers para el manejo del estado local o global con useReducer o context.
- routes: Definición de las rutas de navegación y componentes asociados.
- types: Tipos e interfaces TypeScript globales (DTOs, enums, etc.).
- utils: Funciones utilitarias generales (como helpers de fecha, cálculos, etc.).

2. lot-backend: es el backend (Express + TypeScript)
src: Código fuente principal del backend.
- src/config: Archivos de configuración global (como base de datos, variables, etc.).
- src/controllers: Controladores que gestionan la lógica de las rutas (reciben la petición y delegan al servicio).
- src/dto: Objetos de transferencia de datos (Data Transfer Objects) para definir y validar la forma de los datos entrantes.
- src/entities: Entidades utilizadas por el ORM (como TypeORM), representan tablas en la base de datos.
- src/enum: Enumeraciones globales, como roles de usuario, estados, tipos, etc.
- src/middleware: Middlewares personalizados para Express, como autenticación, validación, etc.
- src/routes: Definición de rutas y sus controladores asociados.
- src/services: Lógica de negocio reutilizable, se encargan de procesar datos y comunicarse con las entidades.
- src/test: Pruebas unitarias o de integración del backend (usando Jest o similar).
- src/types: Tipos TypeScript globales, interfaces extendidas y helpers de tipado.
- src/utils: Funciones utilitarias reutilizables (como manejo de JWT, validaciones, cálculos, etc.).

3. docker-compose.yml: Archivo para crear la base de datos


## Crear base de datos

para crear la base de datos que usaremos: `docker-compose up --build`, con este comando se construirá la imagen y levantará el contenedor de PostgreSQL automáticamente.


para eliminar la db: `docker-compose down -v`, Esto detendrá y eliminará el contenedor y el volumen (los datos también se borran).


## BACKEND
### DESPLIEGUE 
Para desplegar debemos:
1. deberemos de ir a `lot-backend`
2. crear un archivo llamado `.env`, este archivo tendra las siguientes variables: 
<pre>
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=lot
DB_PASSWORD=lot
DB_NAME=lot
</pre>
aparte de esto tambien debes definir la variable `JWT_SECRET` en el `.env`
3. instalar dependencias `npm i`
4. para el despliegue local se recomienda el modo dev:
- (Modo dev) <pre>npm run dev</pre>
- (Modo prod) 
<pre>
npm run build
node dist/index.js
</pre>
> (Puedes ajustar los scripts en package.json si es necesario.)

### TEST
Para hacer los test: `npm test`

## FRONTEND 

Para desplegar el frontend debemos:
1. deberemos de ir a `LoT`
2. crear un archivo llamado `.env`, este archivo tendra las siguientes variables: 
<pre>
VITE_API_URL=http://localhost:3000/api
VITE_API_HOSTNAME=localhost:3000
</pre>
aparte de esto tambien debes definir la variable  `VITE_JWT_SECRET`,`VITE_GOOGLE_MAPS_API_KEY`, `VITE_GOOGLE_MAPS_MAP_ID` que son la api key de googles maps, y el map Id del mapa que seleccionamops en google cloud respetiovamente, recuerda que esto va en el `.env`
3. instalar dependencias `npm i`
4. para el despliegue local se recomienda el modo dev:
- (Modo dev) ejecutas `npm run dev`