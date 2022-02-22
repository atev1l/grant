import {Typography} from '../Typography'
import React from 'react'
import clsx from 'clsx'

interface IBlock {
	label: string
	value: string
	link?: string
	line?: boolean
}


export const Block: React.FC<IBlock> = ({
	label = '',
	value = '',
	link,
	line = true
}) => (
	<div className={clsx('d-flex justify-content-between mt-2 pb-2',
		line &&
		'border-bottom border-lgr')}
	>
		<Typography type={'p2'} color={'gry'}>
			{label}
		</Typography>
		<Typography type={'p3'}>
			{link ? (
				<a href={link} className={'link-orng'}>
					{value}
				</a>) : value}
		</Typography>
	</div>
)
