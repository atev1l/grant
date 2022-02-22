import { Typography } from '../../components/Typography'
import { Input } from '../../components/Input'
import { Button } from '../../components/Button'
import { LogoAuth, SmallLogo } from '../../components/icons'
import { useForm } from 'react-hook-form'
import style from '../../styles/pages/auth.module.scss'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { useMutation } from '@apollo/client'

import UPDATE_PASS from '../../lib/apollo/schemas/auth/update_pass.graphql'
import Link from 'next/link'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

const resolveSchema = yup.object().shape({
	pass: yup.string().required('Поле обязательно').min(8, 'Минимум 8 символов'),
	repeat: yup.string().required('Поле обязательно').oneOf([yup.ref('pass')], 'Пароли не совпадают')
})



const ForgPass = () => {

	const {query: {token}, push} = useRouter()

	const [changePass, {loading}] = useMutation(UPDATE_PASS)

	const {control, handleSubmit} = useForm({
		defaultValues: {
			pass: '',
			repeat: ''
		},
		resolver: yupResolver(resolveSchema)
	})

	const handleChange = async ({pass}) => {
		await changePass({variables: {pass, token}})
		await push('/auth')
	}

	return (
		<div className={'d-flex justify-content-between align-items-md-center vh-100 flex-column'}>
			<div className={'align-self-start w-100 m-0 flex-md-grow-0 d-none d-md-flex flex-md-fill px-5 pt-4'}>
				<div className={'d-flex justify-content-between w-100'}>
					<Typography type={'t1sb'}>
						<SmallLogo/>
					</Typography>
					<Link href={'/auth'}>
						<a href="/auth" className={'d-flex justify-content-center align-items-center'}>
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
			<form
				onSubmit={handleSubmit(handleChange)}
				className={clsx(style.title_block, 'px-3 flex-grow-md-1 flex-grow-0 py-4')}>
				<div className={clsx('d-flex flex-column justify-content-center align-items-center mt-3 mb-5')}>
					<div className={'d-md-none'}>
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
				<Input control={control} name={'pass'} placeholder="Введите пароль">
					Пароль
				</Input>

				<Input control={control} name={'repeat'} placeholder="Подтвердите пароль">
					Подтвердите пароль
				</Input>

				<div className="d-flex flex-column justify-content-center align-items-center mt-3">
					<Button variant="orng" htmlType={'submit'} disabled={loading} classNames="d-flex w-100 mt-3">
						Сменить пароль
					</Button>
				</div>
			</form>
			<div/>
		</div>
	)
}
export default ForgPass
