const express = require('express')
const cors = require('cors')
const swaggerUi = require('swagger-ui-express')
const swaggerJsdoc = require('swagger-jsdoc')

// inicializar express
const app = express()

// middlewares globales
app.use(cors())
app.use(express.json())

// importar rutas
const authRoutes = require('./routes/auth.routes')
const mesasRoutes = require('./routes/mesas.routes')
const reservacionesRoutes = require('./routes/reservaciones.routes')

// usar rutas con prefijo
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/mesas', mesasRoutes)
app.use('/api/v1/reservaciones', reservacionesRoutes)

// configuración Swagger
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Restaurante',
      version: '1.0.0',
      description: 'Documentación interactiva de la API Restaurante'
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [{ bearerAuth: [] }]
  },
  apis: ['./routes/*.js'] // aquí Swagger leerá tus JSDoc
}

const specs = swaggerJsdoc(options)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))

// levantar servidor
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})
