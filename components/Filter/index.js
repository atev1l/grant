import {Typography} from '../Typography'
import {CalendarInput} from '../CalendarInput'
import {useForm} from 'react-hook-form'


import {useDispatch} from '../GeneralCtx'
import {actions} from '../../lib/store'
// import { useEffect } from 'react'
import {HORIZONTAL_ORIENTATION, OPEN_DOWN} from 'react-dates/constants'
import {Button} from '../Button'

export const Filter = () => {

	const dp = useDispatch()

	const {control, register, handleSubmit} = useForm({
		defaultValues: {
			sort: 'DESC'
		}
	})
	//
	// useEffect(() => {
	// 	const ss = watch((value, {name}) => {
	// 		debugger
	// 		// setValue(name, value[name])
	// 		dp(actions.main.setFilters(getValues(name)))
	// 		// Object.keys(value).map((key) => setValue(key, value[key]))
	// 	})
	// 	return () => ss.unsubscribe()
	// }, [])

	return (
		<>
			<form
				className={'border bg-white rounded'}
				onSubmit={handleSubmit((s) => dp(actions.main.setFilters(s)))}
			>
				<div className={'pt-3 px-3'}>
					<Typography
						type={'p5sb'}
						color={'gry'}
						classNames={'mb-1'}
					>
						Сортировка
					</Typography>
					<div className="form-check">
						<input
							className="form-check-input"
							value={'ASC'}
							type="radio"
							id={'id_asc'}
							{...register('sort')}
						/>
						<label className="form-check-label" htmlFor={'id_asc'}>
							Сначала ближайшие
						</label>
					</div>
					<div className="form-check">
						<input
							className={'form-check-input'}
							type="radio"
							value={'DESC'}
							id={'id_desc'}
							{...register('sort')}
						/>
						<label className="form-check-label" htmlFor={'id_desc'}>
							Сначала новые
						</label>
					</div>

				</div>
				<hr/>
				<div className={'pb-4 px-3'}>
					<Typography
						type={'p5sb'}
						color={'gry'}
						classNames={'mb-2'}
					>
						Календарь
					</Typography>
					<CalendarInput
						openDirection={OPEN_DOWN}
						orientation={HORIZONTAL_ORIENTATION}
						control={control}
						placeholders={['с', 'до']}
						names={['gte', 'lte']}
						// openDirection={'up'}
					/>
					<Button htmlType={'submit'} variant={'orng'} classNames={'d-flex w-100'}>
						Применить
					</Button>
				</div>
			</form>
		</>
	)
}
