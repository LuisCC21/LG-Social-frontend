import { useAuth } from '../../auth/hooks/useAuth'
import { Navegacion } from '../components/Navegacion'
import { NoticationAlert } from '../components/NoticationAlert'
import { usePosts } from '../hooks/usePosts'

export const PrincipalLayout = ({ children }) => {
  const { followedUser } = useAuth()
  const { postDeleted } = usePosts()

  return (
    <>
      <header className='md:container  md:mx-auto sticky top-0 z-30'>
        <Navegacion />
        {followedUser === 'followed' && (
          <NoticationAlert msg={'Usuario seguido correctamente'} />
        )}
        {followedUser === 'unFollowed' && (
          <NoticationAlert msg={'Usuario eliminado correctamente'} />
        )}
        {postDeleted && (
          <NoticationAlert msg={'Publicación eliminada correctamente'} />
        )}
      </header>
      <main className='bg-fondo w-full xl:w-[80%] 2xl:w-[85%] 3xl:w-[75%] mx-auto min-h-screen md:p-10 xl:px-0 border-x shadow-md relative'>
        {children}
      </main>
    </>
  )
}
