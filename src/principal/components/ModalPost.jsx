import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import { useAuth } from '../../auth/hooks/useAuth'
import { usePosts } from '../hooks/usePosts'
import { Alerta } from '../../components/Alerta'

export function ModalPost() {
  const [alerta, setAlerta] = useState({})
  const {
    modalPost,
    setModalPost,
    descripcion,
    setDescripcion,
    createPost,
    post,
    setPost,
    editPost,
  } = usePosts()

  const { auth } = useAuth()

  useEffect(() => {
    setDescripcion(post.descripcion)
  }, [post])

  const closeModal = () => {
    setModalPost(false)
    setDescripcion('')

    setTimeout(() => {
      // Hace que no se muestre el texto Gaurdar en el boton, cuando cerramos el modal al actualizar
      setPost({})
    }, 500)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!descripcion || descripcion?.trim().length === 0) {
      return (
        setAlerta({
          msg: 'La publicacion no puede estar vacia',
          error: true,
        }),
        setTimeout(() => {
          setAlerta({})
        }, 2000)
      )
    }

    if (Object.keys(post).length > 0) {
      editPost(post._id)
      setModalPost(false)
      setDescripcion('')

      setTimeout(() => {
        setPost({})
      }, 500)
    } else {
      createPost()
      setModalPost(false)
      setPost({})
      setDescripcion('')
    }
  }

  const { msg } = alerta
  return (
    <>
      <Transition appear show={modalPost} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-25' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                  <Dialog.Title
                    as='h3'
                    className='text-lg leading-6 font-bold text-center'
                  >
                    {Object.keys(post).length > 0
                      ? 'Editar Publicacion'
                      : 'Crear Publicacion'}
                    {msg && <Alerta alerta={alerta} />}
                  </Dialog.Title>

                  <div className='mt-2'>
                    <textarea
                      name='post'
                      cols='50'
                      rows='5'
                      placeholder={`¿Que estas pensando, ${auth.nombre}?`}
                      value={descripcion}
                      onChange={(e) => setDescripcion(e.target.value)}
                      maxLength={150}
                      className='w-full bg-gris-oscuro p-3 rounded-md text-white  overflow-hidden resize-none'
                    ></textarea>
                  </div>

                  <div className='mt-4 text-center'>
                    <form className='flex justify-center gap-8'>
                      <input
                        type='button'
                        className='inline-flex justify-center rounded-md border  hover:cursor-pointer bg-slate-500  hover:bg-opacity-90 text-white font-bold bg-blue-100 px-4 py-2 text-sm text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                        onClick={closeModal}
                        value={'Cancelar'}
                      />
                      <input
                        type='submit'
                        className='inline-flex justify-center rounded-md border hover:cursor-pointer hover:bg-opacity-90 bg-blue text-white font-bold bg-blue-100 px-4 py-2 text-sm text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                        onClick={handleSubmit}
                        value={
                          Object.keys(post).length > 0
                            ? 'Actualizar'
                            : 'Publicar'
                        }
                      />
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
