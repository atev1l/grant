import styles from './styles.module.scss'
import clsx from 'clsx'
import React from 'react'
import fp from 'lodash/fp'

interface Itypo {
	type: 'p5sb'
		| 'p7sb'
		| 'p5'
		| 'p4'
		| 'p4sb'
		| 'p3sb'
		| 'p3'
		| 'p2'
		| 'p2sb'
		| 'p1'
		| 'p1sb'
		| 't2'
		| 't1sb'
		| 't1'
		| 't0'
	color?: string
	classNames?: string
	onClick?: never
}


export const Typography: React.FC<Itypo> = ({
	children,
	classNames,
	color= 'blck',
	type = 'p3',
	onClick = fp.noop
}) => {
	return (
		<div className={clsx(styles[type], `text-${color}`, classNames)} onClick={onClick}>
			{children}
		</div>
	)
}
