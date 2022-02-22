import {useController} from 'react-hook-form'
import {Typography} from '../Typography'
import clsx from 'clsx'
import {useState} from 'react'
import {useDispatch} from '../GeneralCtx'
// import moment from 'moment'
// import fp from 'lodash/fp'


export const InputFile = ({
	children = '',
	name,
	control,
	icon,
	...props
}) => {
	const {field} = useController({
		control,
		name,
		defaultValue: ''
	})

	const dp = useDispatch()

	// const typeMapper = {
	// 	'datetime-local': {
	// 		value: moment(field.value).format('dddd, MMMM DD YYYY, h:mm:ss'),
	// 		onChange: value => field.onChange(moment(value).format('dddd, MMMM DD YYYY, h:mm:ss'))
	// 	}
	// }

	const [isActive, setIsActive] = useState(false)

	return (
		<Typography type={'p1'} color={'gry'} classNames={'my-2'}>
			<div className={'d-flex flex-column'}>
				<div
					onClick={() => setIsActive(true)}
					className={clsx(
						'mt-1 rounded brdr-4 border bg-white d-flex align-items-center justify-content-between',
						isActive && 'border-orng')}>
					<input type="file" id="files" hidden/>
					<label htmlFor="files" className={'w-100 p-2 py-3'}>{children ? children : 'Загрузите документы'}</label>
					{icon && (
						<div className={'pe-3'}>
							{icon}
						</div>
					)}
				</div>
			</div>
		</Typography>
	)
}
