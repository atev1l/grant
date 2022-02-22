import { useRouter } from 'next/router'
import clsx from 'clsx'
import styles from './styles.module.scss'
import { Button } from '../Button'
import fp from 'lodash/fp'

const args = (isActive = false) => ({
	variant: isActive ? 'orng' : '',
	color: isActive ? 'white' : 'gry'
})

export const GroupButtons = ({
	tabs = [],
	type = 'pathname',
	className,
}) => {
	const {push, ...router} = useRouter()

	return (
		<div className={clsx('d-flex justify-content-around bg-white', styles.box, 'sh-down', className)}>
			{tabs.map((tab, i) =>
				<Button key={String(i)}
					onClick={() => push(tab.path)}
					classNames={'d-flex w-100'}
					{...args(fp.get(type, router) === tab.path)}
				>
					{tab?.name}
				</Button>
			)
			}
		</div>
	)
}
