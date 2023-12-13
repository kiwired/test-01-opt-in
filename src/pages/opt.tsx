import { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useOptIn } from '../libs/optIn'

import { Stack, Button, InputOptIn, Countdown, Text, type TextProps, Loader } from '../components'

import srcCarretLeft from '../assets/caret-left.svg'
import srcCheck from '../assets/check.svg'

import css from './opt.module.css'

export const OptRoute = () => {

	const navigate = useNavigate()

	const [code, setCode] = useState('')
	const [loader, setLoader] = useState<null | 'verifying' | 'redirecting' | 'resending'>(null)
	const [canResend, setCanResend] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const { verified, lastSend, onVerify, onSend } = useOptIn()

	const onResend = useCallback(() => {
		setLoader('resending')
		onSend(() => {
			setLoader(null)
			setCanResend(false)
		})
	}, [onSend])

	const onChange = (value: string) => {
		setError(null)
		setCode(code)
		if (value.length == 6 && !loader) {
			setLoader('verifying')
			onVerify(value, (error) => {
				if (error) {
					setLoader(null)
					setError(error.message)
					return
				}
				setLoader('redirecting')
				navigate('/settings')
			})
		}
	}

	const alert = useMemo<{ tone?: TextProps['tone'], text: React.ReactNode }>(() => {

		if (verified) {
			return {
				tone: 'success',
				text: (
					<Stack align='center'>
						<img src={srcCheck} />
						<span>OTP is correct</span>
					</Stack>
				)
			}
		}

		if (loader === 'verifying') {
			return {
				tone: 'subdued',
				text: 'Verifying OTP...'
			}
		}

		if (loader === 'resending') {
			return {
				tone: 'subdued',
				text: 'Sending new OTP...'
			}
		}

		if (error) {
			return {
				tone: 'danger',
				text: error
			}
		}

		if (!lastSend || canResend) {
			return {
				tone: 'subdued',
				text: (
					<>
						{'Having trouble?'}
						{' '}
						<Button plain onClick={onResend}>
							Request a new OTP
						</Button>
					</>
				)
			}
		}

		return {
			tone: 'subdued',
			text: (
				<>
					{'Having trouble? Request a new OTP in'}
					{' '}
					<Countdown startAt={lastSend} seconds={60} onFinish={() => setCanResend(true)} />
				</>
			)
		}
	}, [verified, lastSend, canResend, loader, error, onResend])

	useEffect(() => {
		if (!lastSend) {
			onResend()
		}
	}, [lastSend, onResend])

	return (
		<div className={css.container}>

			<div className={css.navigate}>
				<Link className={css.back} to={'/'}>
					<img src={srcCarretLeft} /> Back
				</Link>
			</div>

			<div className={css.box}>

				<div className={css.title}>
					Verify Your Number
				</div>

				<Text as={'p'} variant={'md'} tone='subdued'>
					Enter the OTP we sent to +7-111-111-11-11
				</Text>

				<div className={css.input}>
					<InputOptIn
						defaultValue={code}
						onChange={onChange}
						tone={verified ? 'success' : error ? 'danger' : undefined}
						loading={loader === 'verifying'}
					/>
					{loader ==='verifying' && (
						<Loader />
					)}
				</div>

				<Text as={'p'} variant={'md'} tone={alert.tone}>
					{alert.text}
				</Text>

				{loader === 'redirecting' && (
					<div className={css.redirecting}>
						<Stack>
							[loader]
							<Text as={'p'} variant={'xs'} tone='subdued'>
								Redirecting to your account...
							</Text>
						</Stack>
					</div>
				)}

			</div>

		</div>
	)
}