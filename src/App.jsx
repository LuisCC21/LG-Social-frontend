import { AuthProvider } from './auth/context/AuthProvider'
import { PostProvider, ComentarioProvider } from './principal/context'
import { AppRouter } from './router/AppRouter'

function App() {
  return (
    <AuthProvider>
      <PostProvider>
        <ComentarioProvider>
          <AppRouter />
        </ComentarioProvider>
      </PostProvider>
    </AuthProvider>
  )
}

export default App
