import styles from './s.module.scss'
import clsx from 'clsx'
import 'react-dates/initialize'

import { useState } from 'react'
import { DateRangePicker } from 'react-dates'
import { VERTICAL_ORIENTATION } from 'react-dates/constants'
import { useController } from 'react-hook-form'
import moment from 'moment'

export const CalendarInput = ({
	names = [],
	control,
	placeholders= [],
	...props
}) => {

	const startDate = useController({control, name: names[0]})
	const endDate = useController({control, name: names[1]})

	const [focused, setFocus] = useState(null)

	return (
		<div className={clsx('d-flex w-100 my-2', styles.container)}>
			<DateRangePicker
				isOutsideRange={() => false}
				enableOutsideDays={true}
				startDate={moment(startDate.field.value)}
				endDate={moment(endDate.field.value)}
				startDateId={names[0]}
				endDateId={names[1]}
				startDatePlaceholderText={placeholders[0]}
				endDatePlaceholderText={placeholders[1]}
				onDatesChange={(dates) => {
					startDate.field.onChange(moment(dates.startDate).toISOString())
					endDate.field.onChange(moment(dates.endDate).toISOString())
				}}
				orientation={VERTICAL_ORIENTATION}
				focusedInput={focused}
				onFocusChange={setFocus}
				{...props}
			/>
		</div>
	)
}
