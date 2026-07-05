# API Restaurante 🍽️

API REST para la gestión de reservaciones en un restaurante.  
Incluye autenticación con JWT, control de roles (cliente y admin), y validación de disponibilidad de mesas.

---

## 🚀 Instalación

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/tuusuario/api_restaurante.git
   cd api_restaurante
Instalar dependencias:

bash
npm install
Configurar variables de entorno:

Copiar el archivo .env.example a .env:

bash
cp .env.example .env
Editar .env con tus credenciales reales.

Ejecutar migraciones de Prisma:

bash
npx prisma migrate dev --name init
Iniciar el servidor:

bash
npm run dev
🔑 Autenticación
Registro y login de usuarios.

El login devuelve un JWT que debe enviarse en el header Authorization como:

Código
Bearer <token>
📌 Endpoints
Método	Endpoint	Descripción	Acceso
POST	/api/reservaciones	Crear reservación (valida disponibilidad)	Cliente
GET	/api/reservaciones/mis	Mis reservaciones (usuario actual)	Cliente
GET	/api/reservaciones	Todas las reservaciones con filtros	Admin
PUT	/api/reservaciones/:id/estado	Cambiar estado de reservación	Admin
DELETE	/api/reservaciones/:id	Cancelar propia reservación	Cliente


📦 Base de datos
Prisma ORM con PostgreSQL.

Archivo database/schema.sql incluye el esquema y datos iniciales (seed).

Modelos principales:

Usuario

Mesa

Reservacion

🛠️ Tecnologías
Node.js + Express

Prisma ORM

PostgreSQL

JWT para autenticación

Thunder Client 




👨‍💻 Uso rápido
Ejemplo de crear reservación (Cliente):

json
POST /api/reservaciones
Authorization: Bearer <token>

{
  "mesaId": 1,
  "fecha": "2026-07-05",
  "hora": "19:00",
  "personas": 2
}
Ejemplo de ver reservaciones propias:

json
GET /api/reservaciones/mis
Authorization: Bearer <token>
