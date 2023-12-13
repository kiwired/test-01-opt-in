import { useCallback, useEffect, useState } from 'react'

export const Countdown = ({ startAt, seconds, onFinish }: { startAt: Date, seconds: number, onFinish: VoidFunction }) => {

	const [timeLeft, setTimeLeft] = useState(Math.round((startAt.getTime() + seconds * 1000 - Date.now()) / 1000))

	const onTick = useCallback(() => {
		const timeLeft = Math.round((startAt.getTime() + seconds * 1000 - Date.now()) / 1000)
		setTimeLeft(timeLeft)
		if (!timeLeft) {
			onFinish()
		}
	}, [startAt, seconds, onFinish])

	useEffect(() => {
		const interval = setInterval(onTick, 1000)
		return () => clearInterval(interval)
	}, [onTick])

	return `${Math.floor(timeLeft / 60).toString().padStart(2, '0') }:${(timeLeft % 60).toString().padStart(2, '0')}`
}