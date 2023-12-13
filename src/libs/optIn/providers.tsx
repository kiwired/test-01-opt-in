import { useState } from 'react'
import { Navigate, NavigateProps, useLocation } from 'react-router-dom'
import { useOptIn } from './hooks'
import { OptInContext } from './context'

export const OptInProvider = ({ children }: { children: React.ReactNode }) => {

	const [verified, setVerified] = useState(true)
	const [lastSend, setLastSend] = useState<Date | null>(null)

	const onVerify = (code: string, callback: (error?: Error) => void) => {
		setTimeout(() => {
			if (code !== '123456') {
				callback(new Error('Seems that entered OTP is not correct.'))
				return
			}
			setVerified(true)
			callback()
		}, 2000)
	}

	const onSend = (callback: (error?: Error) => void) => {
		setTimeout(() => {
			// TODO: send code
			setLastSend(new Date())
			callback()
		}, 2000)
	}

	const value = { verified, lastSend, onVerify, onSend };

	return (
		<OptInContext.Provider value={value}>
			{children}
		</OptInContext.Provider>
	)
}

export const RequireOptIn = ({ fallback, children }: { fallback: NavigateProps['to'], children: JSX.Element }) => {
	const { verified } = useOptIn()
	const location = useLocation()

	if (!verified) {
		return <Navigate to={fallback} state={{ from: location }} replace />
	}

	return children
}
