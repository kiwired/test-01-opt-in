
import { createRef, useRef, useState } from 'react'
import clsx from 'clsx'

import css from './input-opt-in.module.css'

const string2code = (defaultValue?: string) => {
	return Array(6).fill('').map((_val, key) => defaultValue?.[key] || '')
}

export type InputOptInProps = {
	defaultValue?: string
	onChange: (value: string) => void
	tone?: 'success' | 'danger'
	loading?: boolean
}

export const InputOptIn = (props: InputOptInProps) => {
	
	const inputRefs = useRef(Array(6).fill(null).map(() => createRef<HTMLInputElement>()))
	const [code, setCode] = useState(() => string2code(props.defaultValue))

	const onChange = (key: number, value: string) => {
		// if not a number, ignore
		if (!/^\d*$/.test(value)) {
			return
		}

		const newCode = [...code]
		newCode[key] = value.slice(-1)

		setCode(newCode)
		props.onChange(newCode.join(''))

		if (key < code.length - 1 && value !== '') {
			inputRefs.current[key + 1].current?.focus()
		}
	}

	const onKeyUp = (key: number, event: React.KeyboardEvent<HTMLInputElement>) => {
		if (!/^\d$/.test(event.key)) {
			event.preventDefault()
		}
		if (event.key === 'Backspace' && key > 0 && code[key] === '') {
			inputRefs.current[key - 1].current?.focus()
		}
	}
	

	const onPaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
		event.preventDefault()
		const value = event.clipboardData.getData('Text').replace(/[^0-9]/g, '')
		const code = string2code(value)
		setCode(code)
	}
	
	return (
		<div className={css.wrap}>
			{code.map((val, key) => (
				<input
					key={key}
					className={clsx(css.input, {
						[css.primary]: val !== '' && !props.tone,
						[css.success]: props.tone === 'success',
						[css.danger]: props.tone === 'danger',
					})}
					type={'number'}
					maxLength={1}
					value={val}
					onChange={(e) => onChange(key, e.target.value)}
					onKeyUp={(e) => onKeyUp(key, e)}
					onPaste={(e) => onPaste(e)}
					ref={inputRefs.current[key]}
					// disabled={props.loading}
				/>
			))}
		</div>
	)
}