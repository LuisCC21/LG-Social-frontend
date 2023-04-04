export const NoticationAlert = ({ msg }) => {
  return (
    <div className='sticky w-full sm:w-2/3 bg-gradient-to-t from-blue to-cyan-400 p-2 lg:w-1/3 rounded-lg mx-auto text-white text-center font-semibold animate-bounce '>
      {msg}
    </div>
  )
}
