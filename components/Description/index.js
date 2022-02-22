import clsx from 'clsx'
import style from './style.module.scss'
import { Typography } from '../Typography'
// import Link from 'next/link'
import { useState } from 'react'


export const Description = ({
	title,
	text,
	hideLabelAll= false,
	children,
	// link = ''
}) => {
	const [isOpen, setOpen] = useState(false)
	return (
		// <Link href={link}>
		// 	<a href={link}>
		<div className={clsx(style.main, 'p-3 w-100 brdr-4 bg-white mt-3')}>
			<Typography type={'t1'}>
				{title}
			</Typography>
			<Typography type={'p2'}>
				{text?.substring(0, !isOpen ? 100 : text.length)}
			</Typography>
			{hideLabelAll ? '' : 
				<Typography type={'p2sb'} color={'orng'} onClick={() => setOpen(!isOpen)}>
					Показать все
				</Typography>
			}
			{children}
		</div>
	// </a>
		// </Link>
	)
}
