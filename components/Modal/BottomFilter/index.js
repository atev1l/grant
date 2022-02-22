import clsx from 'clsx'
import styles from '../styles.module.scss'
import { motion } from 'framer-motion'
import { store as main_store } from '../../../lib/store/main'
import { useDispatch, useSelector } from '../../GeneralCtx'
import { useRef } from 'react'
import { useOnClickOutside } from '../../../lib/hooks/useOnClickOutside'
// TODO: исправить календарь
import { Cross } from '../../icons'
import { Typography } from '../../Typography'
import { useForm } from 'react-hook-form'
import { Button } from '../../Button'


export const BottomFilter = () => {

	const dp = useDispatch()

	const sort = useSelector('main.filters.sort')
	const {filters} = useSelector('main.modal.addition')

	const {control, handleSubmit, reset} = useForm({
		defaultValues: {
			sort
		}
	})

	const closer = () => dp(main_store.actions.hideModal())

	const outRef = useRef(null)

	useOnClickOutside(outRef, closer)

	const applyFilter = data => {
		dp(main_store.actions.setFilters(data))
		closer()
	}

	return (
		<motion.div
			initial={{opacity: 0}}
			animate={{opacity: 1}}
			exit={{opacity: 0}}
			transition={{duration: 0.5}}
			className={clsx('position-fixed vw-100 vh-100 top-0 left-0 bg-mbck',
				styles.m_back
			)}
		>
			<motion.div
				ref={outRef}
				initial={{y: 80, boxShadow: '0px 110px 0px 50px rgba(255, 255, 255, 1)'}}
				animate={{y: 0}}
				exit={{y: 80}}
				transition={{duration: 0.3}}
				drag={'y'}
				onDragEnd={(_, i) => i.offset.y > 60 && closer()}
				dragConstraints={{bottom: 50, top: 0}}
				className={clsx('m-0 position-fixed bg-wht bottom-0 w-100 py-2 px-3 brdr-4', styles.m_gen)}
			>
				<form onSubmit={handleSubmit(applyFilter)}>
					<div className={'d-flex justify-content-between align-items-center pt-2'}>
						<div onClick={closer}>
							<Cross/>
						</div>
						<Typography type={'t1'} classNames={'text-center ps-5'}>
							Фильтры
						</Typography>
						<Button textType={'p5sb'} color={'rd'} onClick={() => reset()} radius={1} classNames={'m-0'}>
							Очистить
						</Button>
					</div>
					<div className={'my-2'}>
						{filters(control)}

						{/*<Select*/}
						{/*	className={'my-4'}*/}
						{/*	control={control}*/}
						{/*	name='dates'*/}
						{/*	icon={<Calendar />}*/}
						{/*	label={'Дни проведения'}/>*/}
						<Button variant={'orng'} htmlType={'submit'} classNames={'d-flex w-100'}>
							Показать результаты
						</Button>
					</div>
				</form>
			</motion.div>
		</motion.div>
	)
}
