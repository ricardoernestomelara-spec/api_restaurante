const prisma = require('../prisma/client')

// Crear reservación
const crearReservacion = async (req, res) => {
  try {
    const { mesaId, fecha, hora, personas } = req.body
    const usuarioId = req.usuario.id  // viene del token

    // convertir fecha y hora a objetos Date
    const fechaObj = new Date(fecha) // ejemplo: "2026-07-05"
    const horaObj = new Date(`1970-01-01T${hora}`) // ejemplo: "19:00"

    // verificar si ya existe una reservación en esa mesa, fecha y hora
    const existe = await prisma.reservacion.findFirst({
      where: {
        mesaId: Number(mesaId),
        fecha: fechaObj,
        hora: horaObj,
        estado: { not: 'cancelada' }
      }
    })

    if (existe) {
      return res.status(400).json({ error: 'La mesa ya está reservada en ese horario' })
    }

    // crear la nueva reservación
    const nueva = await prisma.reservacion.create({
      data: {
        mesaId: Number(mesaId),
        usuarioId,
        fecha: fechaObj,
        hora: horaObj,
        personas: Number(personas),
        estado: 'pendiente'
      }
    })

    res.status(201).json({ message: 'Reservación creada', reservacion: nueva })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al crear reservación' })
  }
}

// Obtener reservaciones del usuario autenticado
const misReservaciones = async (req, res) => {
  try {
    const lista = await prisma.reservacion.findMany({
      where: { usuarioId: req.usuario.id },
      include: { mesa: true }
    })
    res.status(200).json(lista)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al obtener reservaciones' })
  }
}

// Obtener todas las reservaciones (solo admin)
const todasReservaciones = async (req, res) => {
  try {
    const lista = await prisma.reservacion.findMany({
      include: { mesa: true, usuario: true }
    })
    res.status(200).json(lista)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al obtener todas las reservaciones' })
  }
}

// Cambiar estado de una reservación (solo admin)
const cambiarEstado = async (req, res) => {
  try {
    const { id } = req.params
    const { estado } = req.body

    const reservacion = await prisma.reservacion.update({
      where: { id: Number(id) },
      data: { estado }
    })

    res.status(200).json({ message: 'Estado actualizado', reservacion })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al cambiar estado' })
  }
}

// Cancelar reservación propia (cliente)
const cancelarReservacion = async (req, res) => {
  try {
    const { id } = req.params

    const reservacion = await prisma.reservacion.findUnique({
      where: { id: Number(id) }
    })

    if (!reservacion || reservacion.usuarioId !== req.usuario.id) {
      return res.status(403).json({ error: 'No puedes cancelar esta reservación' })
    }

    const cancelada = await prisma.reservacion.update({
      where: { id: Number(id) },
      data: { estado: 'cancelada' }
    })

    res.status(200).json({ message: 'Reservación cancelada', reservacion: cancelada })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al cancelar reservación' })
  }
}

module.exports = { crearReservacion, misReservaciones, todasReservaciones, cambiarEstado, cancelarReservacion }
