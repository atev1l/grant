import clsx from 'clsx'
import style from './style.module.scss'
import { Typography } from '../Typography'
import Link from 'next/link'
import { useState } from 'react'


export const NotificationCard = ({
	title,
	text,
	date,
	hideLabelAll= false,
	children,
	link = ''
}) => {
	const [isOpen, setOpen] = useState(false)
	return (
		<Link href={link}>
			<a href={link}>
				<div className={clsx(style.main, 'p-3 w-100 brdr-4 bg-white mt-3')}>
					<div className={'d-flex justify-content-start'}>
						<Typography type={'p1sb'} color={title === 'Заявка была изменена' ? 'drd' : 'grn'} classNames={'d-flex align-items-center'}>
							{title}
							<Typography type={'p4sb'} color={'gry'} classNames={'ms-1'}>
								{date}
							</Typography>
						</Typography>
					</div>
					<Typography type={'p2'}>
						{text}
					</Typography>
					{hideLabelAll ? '' : 
						<Typography type={'p2sb'} color={'orng'} classNames={'d-flex justify-content-end'} onClick={() => setOpen(!isOpen)}>
					Узнать больше
						</Typography>
					}
					{children}
				</div>
			</a>
		</Link>
	)
}
