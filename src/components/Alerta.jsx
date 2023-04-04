export const Alerta = ({ alerta }) => {
  return (
    <div
      className={`${
        alerta.error ? 'bg-red-500' : 'bg-blue'
      } text-center text-xl  text-white font-bold p-2 rounded-md block`}
    >
      {alerta.msg}
    </div>
  )
}
