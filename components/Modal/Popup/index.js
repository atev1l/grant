import { useDispatch, useSelector } from '../../GeneralCtx'
import { store as main_store } from '../../../lib/store/main'
import { useRef } from 'react'
import { useOnClickOutside } from '../../../lib/hooks/useOnClickOutside'
import { motion } from 'framer-motion'
import clsx from 'clsx'
import styles from '../styles.module.scss'
import { Typography } from '../../Typography'
import Link from 'next/link'
import fp from 'lodash/fp'


export const Popup = () => {

	const dp = useDispatch()

	const {message, addition} = useSelector('main.modal')

	const closer = () => dp(main_store.actions.hideModal())

	const outRef = useRef(null)

	useOnClickOutside(outRef, closer)

	return (
		<motion.div
			initial={{opacity: 0}}
			animate={{opacity: 1}}
			exit={{opacity: 0}}
			transition={{duration: 0.5}}
			className={clsx('position-fixed vw-100 vh-100 top-0 left-0 d-flex justify-content-center',
				styles.m_back
			)}
		>
			<motion.div
				ref={outRef}
				initial={{y: 80}}
				animate={{y: 0}}
				exit={{y: 80}}
				transition={{duration: 0.3}}
				drag={'y'}
				onDragEnd={(_, i) => i.offset.y > 60 && closer()}
				dragConstraints={{bottom: 50, top: 0}}
				className={clsx('bg-wht px-3 pt-2 pb-3 brdr-4 mx-4 my-auto d-flex flex-column', styles.m_gen)}
			>
				<Typography type={'t1'} classNames={'mt-3 px-2'} c>
					{message}
				</Typography>
				<Typography type={'p3'} classNames={'my-1 px-2'}>
					{fp.isFunction(addition.description) ? addition.description() : addition.description}
				</Typography>
				<Link href={addition.link}>
					<a href={addition.link} onClick={()=> closer()} className={'text-end text-orng mb-2 px-2 mt-3'}>
						{addition.btn_text}
					</a>
				</Link>
			</motion.div>
		</motion.div>
	)
}
