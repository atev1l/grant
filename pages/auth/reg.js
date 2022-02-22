import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import Link from 'next/link'
import clsx from 'clsx'

import { useDispatch } from '../../components/GeneralCtx'
import { LogoAuth, SmallLogo } from '../../components/icons'
import { Typography } from '../../components/Typography'
import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import style from '../../styles/pages/auth.module.scss'

import { store } from '../../lib/store/profile'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'


const resolveSchema = yup.object().shape({
	email: yup.string().required('Поле обязательно').email('Это должна быть исправная почта'),
	pass: yup.string().required('Поле обязательно').min(8, 'Минимум 8 символов')
})


const Reg = () => {
	const {handleSubmit, control} = useForm({
		defaultValues: {
			email: '',
			pass: ''
		},
		resolver: yupResolver(resolveSchema)
	})

	const {push} = useRouter()

	const dp = useDispatch()


	const registration = async data => {
		dp(store.actions.addProfileInfo(data))
		await push('/auth/reg_step_2')
	}

	return (
		<div className={'d-flex justify-content-between align-items-md-center vh-100 flex-column'}>
			<div className={'align-self-start w-100 m-0 flex-md-grow-0 d-none d-md-flex flex-md-fill px-5 pt-4'}>
				<div className={'d-flex justify-content-between w-100'}>
					<Typography type={'t1sb'}>
						<SmallLogo />
					</Typography>
					<Link href={'/auth'}>
						<a href='/auth' className={'d-flex justify-content-center align-items-center'}>
							<Typography type={'t1sb'} color={'gry'} classNames={'m-2'}>
								Уже есть аккаунт?
							</Typography>
							<Button variant={'orng'}>
								Войти в систему
							</Button>
						</a>
					</Link>
				</div>
			</div>
			<form className={clsx(style.title_block, 'px-3 flex-grow-md-1 flex-grow-0 py-4')} onSubmit={handleSubmit(registration)}>
				<div className={clsx('d-flex flex-column justify-content-center align-items-center d-md-none')}>
					<LogoAuth/>
					<Typography type={'t0'} classNames="mt-2">
					В первый раз?
					</Typography>
					<Typography
						type={'p2'}
						classNames="d-flex mt-1 align-items-center justify-content-center text-center">
					Для записи на мероприятия
						<br/>
					зарегистрируйтесь
					</Typography>
				</div>
				<div className='d-none d-md-flex flex-column justify-content-center align-items-center'>
					<Typography type={'p5sb'} color={'gry'}>
						В первый раз?
					</Typography>
					<Typography type='t0'>
						Войти в систему
					</Typography>
				</div>
				<Input
					control={control}
					name={'email'}
					placeholder={'Введите Email'}
				>
					Email
				</Input>
				<Input
					control={control}
					name={'pass'}
					placeholder={'Введите пароль'}
				>
				Пароль
				</Input>
				<Button variant={'orng'} htmlType={'submit'} classNames="d-flex w-100 mt-4">
				Далее
				</Button>
				<div className={'mt-3 d-flex justify-content-center w-100 d-none'}>
					<Typography type={'p4'} classNames={'d-flex'} color={'gry'}>
					Уже есть аккаунт?
						<Link href={'/auth'}>
							<a href={'/auth'}>
								<Typography type={'p3sb'} color={'orng'} classNames={'ms-1'}>
								Войти
								</Typography>
							</a>
						</Link>
					</Typography>
				</div>
			</form>
			<div className={'align-self-start w-100 m-0 flex-md-grow-0 d-none d-md-flex flex-md-fill px-5 pb-4'}>
				<div className={'d-flex justify-content-between w-100'}>
					<Typography type={'t1sb'}>
						© 2021 Название продукта
					</Typography>
					<Link href={'/privacy'}>
						<a href={'/privacy'}>
							<Typography type={'t1sb'} color={'orng'}>
								Политика конфиденциальности
							</Typography>
						</a>
					</Link>
				</div>
			</div>
		</div>
	)
}

export default Reg
