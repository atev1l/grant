import { motion } from 'framer-motion'
import { Typography } from '../Typography'
import { useCallback, useRef, useState } from 'react'
import { Button } from '../Button'
import { useOnClickOutside } from '../../lib/hooks/useOnClickOutside'


export const DropdownNotifications = ({
	children,
	icon = false,
	actions = [],
	...btnProps
}) => {
	const [isShow, setIsShow] = useState(false)
	const [isShowChecker, setIsShowChecker] = useState(false)
	const menuRef = useRef(null)

	const hider = useCallback(() => {
		if (!isShowChecker || !isShow)
			setIsShow(!isShow)
		setIsShowChecker(!isShowChecker)
	}, [isShow])

	const action = act => () => {
		act()
		setIsShow(false)
		setIsShowChecker(false)
	}

	useOnClickOutside(menuRef, () => {
		setIsShowChecker(true)
		setIsShow(false)
	})

	return (
		<div className={'position-relative'}>
			{icon ? (
				<div onClick={hider}>
					{icon}
				</div>
			) : (
				<Button variant={'grn'} onClick={hider} {...btnProps}>
					{children}
				</Button>
			)}
			{isShow && (
				<motion.div
					ref={menuRef}
					initial={{opacity: 0, zIndex: 9999}}
					animate={{opacity: 1}}
					exit={{opacity: 0, zIndex: 9999}}
					transition={{duration: 0.3}}
					className={'position-absolute sh-lg_down bg-wht brdr-4 p-2 py-3 end-0 overflow-auto'}
				>
					{actions.map((i, k) => (
						<div
							key={String(k)}
							onClick={action(i.callback)}
							className={'d-flex align-items-center p-2 me-2'}
						>
							<div>
								{i.icon}
							</div>
							<Typography type="p1" classNames={'text-nowrap mx-2'}>
								{i.name}
							</Typography>
						</div	>
					))}
				</motion.div>)}
		</div>
	)
}
