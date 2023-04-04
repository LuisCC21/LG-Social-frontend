import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'

import { usePosts } from '../hooks/usePosts'

export const ModalEliminarPost = () => {
  const { setPost, modalPostElimar, setModalPostElimar, deletePost } =
    usePosts()

  const closeModal = () => {
    setModalPostElimar(false)
    setPost({})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    deletePost()
    setPost({})
    setModalPostElimar(false)
  }

  return (
    <>
      <Transition appear show={modalPostElimar} as={Fragment}>
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
                    Eliminar Publicacion
                  </Dialog.Title>
                  <div className='my-2 text-center'>
                    <p>
                      Si elimina esta publicacion, no podra volver a
                      recuperarla.
                    </p>
                  </div>

                  <div className='mt-4 text-center'>
                    <form className='flex justify-center gap-8'>
                      <input
                        type='button'
                        className='inline-flex justify-center rounded-md border  hover:cursor-pointer bg-slate-500 text-white font-bold bg-blue-100 px-4 py-2 text-sm text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                        onClick={closeModal}
                        value={'Cancelar'}
                      />
                      <input
                        type='submit'
                        className='inline-flex justify-center rounded-md border hover:cursor-pointer bg-red-600 text-white font-bold bg-blue-100 px-4 py-2 text-sm text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                        onClick={handleSubmit}
                        value={'Elminar'}
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
