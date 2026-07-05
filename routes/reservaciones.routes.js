// manejando las rutas para los métodos de la sección "Reservaciones"
const express = require('express')
// constante principal para manejar las rutas
const router = express.Router()
// llamando a los métodos a utilizar para las rutas
const {
    crearReservacion,
    misReservaciones,
    todasReservaciones,
    cambiarEstado,
    cancelarReservacion
} = require('../controller/reservacion.controller')
const { verificarToken, verificarAdmin } = require('../middleware/auth.middleware')

// creando las rutas (/api/reservaciones)

// rutas protegidas para clientes
// el cliente debe estar autenticado con token
router.post('/', verificarToken, crearReservacion) // /api/v1/reservaciones/
router.get('/mis', verificarToken, misReservaciones) // /api/v1/reservaciones/mis
router.delete('/:id', verificarToken, cancelarReservacion) // /api/v1/reservaciones/:id

// rutas protegidas para administradores
// antes de la acción, se agregan los permisos para entrar a esa ruta
router.get('/', verificarToken, verificarAdmin, todasReservaciones) // /api/v1/reservaciones/
router.put('/:id/estado', verificarToken, verificarAdmin, cambiarEstado) // /api/v1/reservaciones/:id/estado

// exportando las rutas
module.exports = router
