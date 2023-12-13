import clsx from 'clsx'

import css from './button.module.css'

type ButtonProps = {
	tone?: 'black'
	plain?: boolean
	onClick?: () => void
	children?: React.ReactNode
}

export const Button = (props: ButtonProps) => {
	const cn = clsx(css.button, {
		// tones
		[css.black]: props.tone === 'black',
		// styles
		[css.plain]: props.plain,
	})
	return (
		<button type={'button'} className={cn} onClick={props.onClick}>
			{props.children}
		</button>
	)
}