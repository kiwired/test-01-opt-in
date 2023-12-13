
import clsx from 'clsx'

import css from './text.module.css'

export interface TextProps {
	id?: string
	as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'strong'
	variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'xs' | 'sm' | 'md' | 'lg'
	fontWeight?: 'regular' | 'medium' | 'semibold' | 'bold'
	align?: 'start' | 'center' | 'end' | 'justify'
	tone?: 'subdued' | 'danger' | 'success' | 'primary'
	children: React.ReactNode
}

export const Text = ({
	id,
	as,
	variant,
	fontWeight,
	// align,
	tone,
	children,
}: TextProps) => {

	const Component = as || 'span'

	const cn = clsx(css.text, {
		// variants
		[css.h1]: variant == 'h1',
		[css.h2]: variant == 'h2',
		[css.h3]: variant == 'h3',
		[css.h4]: variant == 'h4' || variant == 'lg',
		[css.h5]: variant == 'h5' || variant == 'md',
		[css.h6]: variant == 'h6' || variant == 'sm',
		[css.xs]: variant == 'xs',
		// weights
		[css.semibold]: fontWeight == 'semibold',
		[css.bold]: fontWeight == 'bold',
		// tones
		[css.subdued]: tone == 'subdued',
		[css.success]: tone == 'success',
		[css.danger]: tone == 'danger',
		[css.primary]: tone == 'primary',
	})

	return (
		<Component className={cn} {...(id && { id })}>
			{children}
		</Component>
	)
}
