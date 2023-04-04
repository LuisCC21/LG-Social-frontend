export const formatearFecha = (fecha) => {
  const nuevaFecha = new Date(fecha.split('T')[0].split('-'))
  const opciones = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
  return nuevaFecha.toLocaleDateString('es-ES', opciones)
}

export const tiempoTranscurrido = (desde, hasta) => {
  const diferencia = hasta - desde
  const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24))
  const horas = Math.floor(
    (diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  )
  const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60))
  const segundos = Math.floor((diferencia % (1000 * 60)) / 1000)
  const milisegundos = diferencia % 1000

  return {
    dias,
    horas,
    minutos,
    segundos,
    milisegundos,
  }
}
