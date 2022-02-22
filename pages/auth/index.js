import { useMutation } from '@apollo/client'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import clsx from 'clsx'

import { useDispatch } from '../../components/GeneralCtx'
import { Typography } from '../../components/Typography'
import { Cross, LogoAuth, SmallLogo } from '../../components/icons'
import { Button } from '../../components/Button'
import { types } from '../../components/Modal'
import { Input } from '../../components/Input'
import { actions } from '../../lib/store'

import AUTH from '../../lib/apollo/schemas/auth.graphql'
import style from '../../styles/pages/auth.module.scss'
import { useCookie } from '../../lib/hooks/useCookie'
import { authLink } from '../../lib/apollo'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'


const resolveSchema = yup.object().shape({
	email: yup.string().required('Поле обязательно').email('Это должна быть исправная почта'),
	pass: yup.string().required('Поле обязательно')
})


const Auth = () => {
	const {handleSubmit, control} = useForm({
		defaultValues: {
			email: '',
			pass: ''
		},
		resolver: yupResolver(resolveSchema)
	})
	const dp = useDispatch()

	const cookie = useCookie()

	const [auth, {loading, client}] = useMutation(AUTH, {
		onCompleted: async data => {
			if (!(data.authorization.errors.length > 0)) {
				dp(actions.profile.auth(data.authorization.value))
				cookie.set('access_token', data.authorization.value)
				client.setLink(authLink(data.authorization.value))
				window.location.href = '/'
			} else {
				dp(actions.main.showModal({
					type: types.SuccessNotification,
					icon: <Cross color={'wht'}/>,
					background: 'orng',
					message: data.authorization.errors[0].message
				}))
			}
		},
	})

	const authHandler = async (data) => {
		await auth({
			variables: {
				...data
			}
		})
	}

	return (
		<div className={'d-flex justify-content-between align-items-md-center vh-100 flex-column'}>
			<div className={'align-self-start w-100 m-0 flex-md-grow-0 d-none d-md-flex flex-md-fill px-5 pt-4'}>
				<div className={'d-flex justify-content-between w-100'}>
					<Typography type={'t1sb'}>
						<SmallLogo />
					</Typography>
					<Link href={'/auth/reg'}>
						<a href={'/auth/reg'} className={'d-flex justify-content-center align-items-center'}>
							<Typography type={'t1sb'} color={'gry'} classNames={'m-2'}>
								В первый раз?
							</Typography>
							<Button variant={'orng'}>
								Зарегистрироваться
							</Button>
						</a>
					</Link>
				</div>
			</div>
			<form onSubmit={handleSubmit(authHandler)} className={clsx(style.title_block, 'flex-grow-md-1 flex-grow-0 m-0 px-4 py-4')}>
				<div className={clsx('d-flex flex-column justify-content-center align-items-center mt-3 mb-5 d-md-none')}>
					<LogoAuth/>
					<Typography type={'t0'} classNames="mt-2">
					Рады видеть снова!
					</Typography>
					<Typography type={'p2'} classNames="d-flex mt-1">
					Для записи на мероприятия войдите
					</Typography>
					<Typography type={'p2'} classNames="d-flex">
					с помощью логина и пароля
					</Typography>
				</div>
				<div className='d-none d-md-flex flex-column justify-content-center align-items-center'>
					<Typography type={'p5sb'} color={'gry'}>
						Рады видеть снова!
					</Typography>
					<Typography type='t0'>
						Войдите в аккаунт
					</Typography>
				</div>
				<Input
					control={control}
					name={'email'}
					disabled={loading}
					placeholder={'Введите Email'}>
				Email
				</Input>
				<Input
					control={control}
					name={'pass'}
					disabled={loading}
					type={'password'}
					placeholder={'Введите пароль'}>
				Пароль
				</Input>

				<Link href={'/auth/forg_pass'}>
					<a href={'/auth/forg_pass'} className="d-flex flex-column justify-content-end align-items-end mt-2">
						<Typography type={'p4'} color={'orng'}>
						Забыли пароль?
						</Typography>
					</a>
				</Link>


				<Button variant={'orng'} htmlType={'submit'} disabled={loading} classNames="d-flex w-100 my-3">
				Войти
				</Button>
				<div className={'my-3 d-flex justify-content-center w-100 d-md-none'}>
					<Typography type={'p4'} classNames={'d-flex'} color={'gry'}>
					Новый пользователь?
						<Link href={'/auth/reg'}>
							<a href={'/auth/reg'}>
								<Typography type={'p3sb'} color={'orng'} classNames={'ms-1'}>
								Зарегистрируйтесь
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

export default Auth
