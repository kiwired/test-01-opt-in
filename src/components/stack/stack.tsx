import clsx from 'clsx'

import css from './stack.module.css'

const Stack = ({
	direction = 'row',
	gap,
	align,
	children
}: {
	direction?: 'row' | 'column',
	gap?: 'xs' | 'sm' | 'md' | 'lg',
	align?: 'start' | 'center' | 'end',
	children: React.ReactNode
}) => {
	const cn = clsx(css.stack, {
		// direction
		[css.row]: !direction || direction === 'row',
		[css.column]: direction === 'column',
		// gaps
		[css.xs]: gap === 'xs',
		[css.sm]: gap === 'sm',
		[css.md]: gap === 'md',
		[css.lg]: gap === 'lg',
		// align
		[css.start]: align === 'start',
		[css.center]: align === 'center',
		[css.end]: align === 'end',
	})
	return (
		<div className={cn}>
			{children}
		</div>
	)
}

Stack.Item = ({
	children
}: {
	children: React.ReactNode
}) => {
	return (
		<div className={'stack-item'}>
			{children}
		</div>
	)
}

export { Stack }