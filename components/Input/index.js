import { useController } from 'react-hook-form'
import { Typography } from '../Typography'
import styles from './s.module.scss'
import clsx from 'clsx'
import { useState } from 'react'
// import moment from 'moment'
// import fp from 'lodash/fp'


export const Input = ({
	children = '',
	name,
	control,
	icon,
	disabled = false,
	placeholder,
	type = 'text',
	containerClassname= '',
	...props
}) => {
	const {field, fieldState} = useController({
		control,
		name,
		defaultValue: type === 'datetime-local' ? '01 01 0001, 00:00:00' : ''
	})

	// const typeMapper = {
	// 	'datetime-local': {
	// 		value: moment(field.value).format('dddd, MMMM DD YYYY, h:mm:ss'),
	// 		onChange: value => field.onChange(moment(value).format('dddd, MMMM DD YYYY, h:mm:ss'))
	// 	}
	// }

	const [isActive, setIsActive] = useState(false)

	return (
		<Typography type={'p1'} color={'gry'} classNames={clsx('my-2', containerClassname)}>
			<div className={'d-flex flex-column'}>
				<Typography type={'p3'} color={fieldState.error ? 'danger' : 'gry'} classNames={'my-1'}>
					{/*{children}*/}
					{fieldState.error ? `${children}  (${fieldState.error.message})` : children}
				</Typography>
				<div
					onClick={() => setIsActive(true)}
					className={clsx(
						'mt-1 rounded brdr-4 border bg-white d-flex align-items-center justify-content-between',
						fieldState.error ? 'border-danger' : isActive && 'border-orng')}>
					{type !== 'description' ? <input
						{...field}
						type={type}
						placeholder={placeholder}
						onBlur={() => setIsActive(false)}
						disabled={disabled}
						{...props}
						className={clsx(styles.input, 'my-2 p-1 ms-1 d-flex w-100')}/>
						: <textarea
							{...field}
							placeholder={placeholder}
							onBlur={() => setIsActive(false)}
							className={clsx(styles.input, 'my-2 p-1 ms-1 d-flex w-100')}
							{...props}
						/>
					}
					{icon && (
						<div className={'border-start border-1 p-1'}>
							{icon}
						</div>
					)}
				</div>
			</div>
		</Typography>
	)
}
