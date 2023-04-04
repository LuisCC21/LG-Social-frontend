import { useEffect, useRef, useState } from 'react'
import { Switch } from '@headlessui/react'
import { useAuth } from '../../auth/hooks/useAuth'

export const ToggleSeguir = ({ creador }) => {
  const [enabled, setEnabled] = useState(false)
  const listRef = useRef(null)
  const { followUser, unfollowUser, auth, loading } = useAuth()

  const handleClick = () => {
    listRef.current.click()
  }

  useEffect(() => {
    if (auth.seguidos?.includes(creador._id)) {
      setEnabled(true)
    } else {
      setEnabled(false)
    }
  }, [creador, auth])

  const handleSubmit = () => {
    if (enabled) {
      unfollowUser(creador._id)
    } else {
      followUser(creador._id)
    }
  }

  return (
    <div className='flex flex-col sm:gap-0.5 items-center '>
      <span
        className={`${enabled && 'text-blue'} text-xs hover:cursor-pointer`}
        onClick={handleClick}
      >
        {enabled ? 'Siguiendo' : 'Seguir'}
      </span>
      <div>
        <Switch
          disabled={loading}
          checked={enabled}
          onChange={setEnabled}
          ref={listRef}
          onClick={handleSubmit}
          className={`${enabled ? 'bg-blue' : 'bg-slate-400'}
          relative inline-flex h-[12px]  w-[40px] sm:h-[15px] sm:w-[43px] shrink-0 cursor-pointer rounded-full  border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
        >
          <span className='sr-only'>Use setting</span>
          <span
            aria-hidden='true'
            className={`${enabled ? 'translate-x-0' : 'translate-x-7'}
            pointer-events-none inline-block h-[12px] w-[13px] sm:h-[15px] sm:w-[15px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
          />
        </Switch>
      </div>
    </div>
  )
}
