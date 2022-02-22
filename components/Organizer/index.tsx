import {Typography} from '../Typography'
import React from 'react'
import clsx from 'clsx'

interface IOrg {
	label: string
	value: string
	link?: string
	line?: boolean
}


export const Organizer: React.FC<IOrg> = ({
	label = '',
	value = '',
	link,
	line = true,
}) => (
	<div className={clsx('d-flex justify-content-between mt-3 pb-3',
		line &&
		'border-bottom border-lgr')}
	>
		<Typography type={'p1sb'} color={'gry'} classNames={'ms-3'}>
			{label}
		</Typography>
		<Typography type={'p3'} classNames={'me-2'}>
			{link ? (
				<a href={link} className={'link-orng'}>
					{value}
				</a>) : value}
		</Typography>
	</div>
)
