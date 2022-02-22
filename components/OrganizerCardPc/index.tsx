import {Typography} from '../Typography'
import React from 'react'
import clsx from 'clsx'

interface IOrg {
	label: string
	value: string
	link?: string
	line?: boolean
}


export const OrganizerCardPc: React.FC<IOrg> = ({
	label = '',
	value = '',
	link,
	line = true,
}) => (
	<div className={clsx('d-flex w-100 bg-white justify-content-between align-items-center mt-3 brdr-3',
		line &&
		'border-bottom border-lgr')} style={{
		cursor: 'pointer',
		height: 75
	}}
	>
		<Typography type={'p1sb'} color={'blck'} classNames={'ms-3'}>
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
