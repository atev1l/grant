import { Typography } from '../../components/Typography'
import { Input } from '../../components/Input'
import { Button } from '../../components/Button'
import { CircleCheck, LogoAuth, SmallLogo } from '../../components/icons'
import { useForm } from 'react-hook-form'
import style from '../../styles/pages/auth.module.scss'
import clsx from 'clsx'
import { useMutation } from '@apollo/client'

import REQUEST_RESET from '../../lib/apollo/schemas/auth/request_reset.graphql'
import { actions } from '../../lib/store'
import { types } from '../../components/Modal'
import { useDispatch } from '../../components/GeneralCtx'
import Link from 'next/link'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

const resolveSchema = yup.object().shape({
	email: yup.string().required('Поле обязательно').email('Это должна быть исправная почта')
})


const ForgetPass = () => {

	const dp = useDispatch()

	const [request, {loading}] = useMutation(REQUEST_RESET, {
		onCompleted: () => dp(actions.main.showModal({
			type: types.SuccessNotification,
			message: 'Письмо с востановлением пароля отправлено на почту',
			background: 'orng',
			icon: <CircleCheck color={'wht'}/>
		}))
	})

	const {control, handleSubmit} = useForm({
		defaultValues: {
			email: ''
		},
		resolver: yupResolver(resolveSchema)
	})

	const handleRequest = async variables => await request({variables})

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
			<form onSubmit={handleSubmit(handleRequest)} className={clsx(style.title_block, 'mx-2 mt-5 px-3 flex-grow-md-1 flex-grow-0 py-4')}>
				<div className={clsx(' d-md-none d-flex flex-column justify-content-center align-items-center mt-3 mb-5')}>
					<div>
						<LogoAuth/>
					</div>
					<Typography type={'t0'} classNames="">
					Укажите email
					</Typography>

					<Typography type={'p2'} classNames="d-flex mt-1">
					Пожалуйста, укажите email, который вы
					</Typography>
					<Typography type={'p2'} classNames="d-flex">
					использовали для входа на сайт
					</Typography>
				</div>
				<div className='d-none d-md-flex flex-column justify-content-center align-items-center'>
					<Typography type={'p5sb'} color={'gry'}>
						Рады видеть снова!
					</Typography>
					<Typography type='t0'>
						Укажите email
					</Typography>
				</div>
				<Input control={control} name={'email'} placeholder="Введите email">
				Email
				</Input>

				<div className="d-flex flex-column justify-content-center align-items-center mt-3">
					<Button variant="orng" disabled={loading} classNames="d-flex w-100 mt-3" htmlType={'submit'}>
					Далее
					</Button>
				</div>
			</form>
			<div/>
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
export default ForgetPass
