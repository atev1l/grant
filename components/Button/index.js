import clsx from 'clsx'
import { Typography } from '../Typography'

export const Button = ({
	variant = '',
	htmlType = 'button',
	onClick = null,
	radius = 3,
	textType = 'p1sb',
	classNames = '',
	typoClassNames = '',
	color = 'white',
	disabled = false,
	outline = false,
	children,
}) => {
	return (
		<button onClick={onClick}
			className={clsx('btn text-center py-2 d-flex justify-content-center',
				`btn-${(disabled ? 'gry' : outline ? `outline-${variant}` : variant)}`,
				`brdr-${radius}`,
				classNames)}
			disabled={disabled}
			type={htmlType}>
			<Typography type={textType} classNames={clsx('text-center', typoClassNames)} color={color}>
				{children}
			</Typography>
		</button>
	)
}
