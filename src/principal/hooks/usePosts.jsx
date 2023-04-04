import { useContext } from 'react'
import PostContext from '../context/PostsProvider'

export const usePosts = () => {
  return useContext(PostContext)
}
