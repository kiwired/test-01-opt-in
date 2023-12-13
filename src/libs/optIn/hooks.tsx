import { useContext } from 'react'
import { OptInContext } from './context'

export const useOptIn = () => {
	return useContext(OptInContext)
}