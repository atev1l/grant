import { Typography } from '../Typography'
import { ArrowDown } from '../icons'
import { useController } from 'react-hook-form'


export const Select = ({
	icon = <ArrowDown/>,
	label = 'label',
	list = new Map(),
	className,
	...controller
}) => {
	const {field, fieldState} = useController(controller)
	return (
		<div className={className}>
			<Typography type={'p3'} color={fieldState.error ? 'danger' : 'gry'} classNames={'my-1'}>
				{/*{children}*/}
				{fieldState.error ? `${label}  (${fieldState.error.message})` : label}
			</Typography>
			<Typography type={'p2'} classNames={'position-relative'}>
				<select
					{...field}
					className="form-select form-control-lg brdr-3 shadow-none border-0 bg-lght"
					aria-label={label}>
					{Array.from(list.keys()).map((v, index) => (
						<option key={String(index)}
							defaultChecked={index === 0}
							value={v}>
							{list.get(v)}
						</option>
					))}
				</select>
				<div
					className={'position-absolute end-0 top-0 mt-2 me-2'}>
					{icon}
				</div>
			</Typography>
		</div>
	)
}
