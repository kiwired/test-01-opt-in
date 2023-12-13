import { createContext } from 'react'

type OptInContextType = {
	verified: boolean
	lastSend: Date | null

	onVerify: (code: string, callback: (error?: Error) => void) => void
	onSend: (callback: (error?: Error) => void) => void
}

export const OptInContext = createContext<OptInContextType>(null!)
