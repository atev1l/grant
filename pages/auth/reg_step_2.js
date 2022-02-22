import {Typography} from '../../components/Typography'
import {Input} from '../../components/Input'
import {Button} from '../../components/Button'
import {Cross, LogoAuth, SmallLogo} from '../../components/icons'
import {useForm} from 'react-hook-form'
import clsx from 'clsx'
import REGISTRATION from '../../lib/apollo/schemas/registration.graphql'
import {useMutation} from '@apollo/client'
import {useCookie} from '../../lib/hooks/useCookie'
import {useDispatch, useSelector} from '../../components/GeneralCtx'
import {actions} from '../../lib/store'

import {types} from '../../components/Modal'
import Link from 'next/link'
import style from '../../styles/pages/auth.module.scss'
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import {Select} from '../../components/Select'
import {useState} from 'react'


const resolveSchema = yup.object().shape({
	country: yup.string().required('Обязятельное поле'),
	memberType: yup.string().test('selecting', 'Не выбрано', text => text !== 'ANOTHER').required('Обязятельное поле')
})


const RegStep2 = () => {
	const cookie = useCookie()

	const dp = useDispatch()

	const info = useSelector('profile')
	const [organization, setOrganization] = useState('ПГУ')
	const [role, setRole] = useState('OTHER')
	const {control, handleSubmit, getValues} = useForm({
		resolver: yupResolver(resolveSchema)
	})

	const [createAccount, {loading}] = useMutation(REGISTRATION, {
		onCompleted: async data => {
			if (!(data.createAccount.errors.length > 0)) {
				cookie.set('access_token', data.createAccount.value)
				dp(actions.profile.auth(data.createAccount.value))
				dp(actions.main.showModal({
					type: types.Popup,
					message: 'Подтвердите почту',
					callback: () => window.location.href = '/',
					addition: {
						description: 'На ваш адрес отправлено письмо с ссылкой для его подтверждения',
						btn_text: 'Хорошо',
						link: '/'
					}
				}))
			} else {
				dp(actions.main.showModal({
					type: types.SuccessNotification,
					icon: <Cross color={'wht'}/>,
					message: data.createAccount.errors[0].message
				}))
			}
		},
	})

	const handleCreate = async (data) => {
		await createAccount({
			variables: {
				...info,
				...data,
				userId: '00000000-0000-0000-0000-000000000000',
				organization: (organization === 'ПГУ') ? organization : getValues('anotherOrganization'),
				memberType: role,
				memberTypeCustom: (role === 'OTHER') ? getValues('anotherRole') : role
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
			<form
				className={clsx('mx-2 mt-5 px-3 flex-grow-md-1 flex-grow-0 py-4', style.title_block2)}
				onSubmit={handleSubmit(handleCreate)}
			>
				<div className={clsx('d-flex flex-column justify-content-center align-items-center mt-3 mb-5')}>
					<div className='d-md-none'>
						<LogoAuth/>
					</div>
					<Typography type={'t0'} classNames=''>
					Введите личные данные
					</Typography>

					<Typography type={'p2'} classNames="d-flex mt-1">
					Они необходимы для быстрой
					</Typography>
					<Typography type={'p2'} classNames="d-flex">
					регистрации на мероприятии
					</Typography>
				</div>
				<div className={'d-flex flex-column'}>
					<div className='row'>
						<Input
							containerClassname='col-12 col-md-6'
							type="text"
							className="form-control"
							id="lastName"
							name="lastName"
							control={control}
							placeholder="Введите фамилию"
						>
					Фамилия
						</Input>
						<Input
							containerClassname='col-12 col-md-6'
							type="text"
							className="form-control"
							id="firstName"
							name="firstName"
							control={control}
							placeholder="Введите имя"
						>
					Имя
						</Input>
					</div>

					<Input
						type="text"
						className="form-control"
						id="patronymic"
						name="patronymic"
						control={control}
						placeholder="Введите отчество"
					>
					Отчество
					</Input>

					<Input control={control} name={'phone'} placeholder="Введите телефон">
					Телефон
					</Input>
					<div className='row'>
						<Input
							control={control}
							name={'city'}
							containerClassname='col-md-6 col-12'
							placeholder="Введите город"
						>
					Город
						</Input>
						{(organization === 'another') ? (<>
							<div
								className={'col-md-6 col-12 my-auto'}
								onClick={()=>{
									setOrganization(getValues('organization'))
								}}
							>
								<Select
									control={control}
									name="organization"
									label={'Выберите организацию'}
									list={new Map([['ПГУ', 'ПГУ'], ['another', 'Другая']])}/>
							</div>
							<Input
								containerClassname='col'
								control={control} name={'anotherOrganization'}
								placeholder="Введите организацию">
								Название организации
							</Input>
						</>) : (<>
							<div
								className={'col-md-6 col-12 my-auto'}
								onClick={()=>{
									setOrganization(getValues('organization'))
								}}
							>
								<Select
									control={control}
									name="organization"
									label={'Выберите организацию'}
									list={new Map([['ПГУ', 'ПГУ'], ['another', 'Другая']])}/>
							</div>
						</>)}
					</div>
					<Input
						control={control}
						name={'country'}
						containerClassname='w-100'
						placeholder="Введите страну"
					>
						Страна
					</Input>





					{(role === 'OTHER') ? (<>
						<div
							className={'col my-auto'}
							onClick={()=>{
								setRole(getValues('memberType'))
							}}
						>
							<Select
								className={''}
								control={control}
								name="memberType"
								label={'Роль (преподаватель/студент)'}
								list={new Map([['ANOTHER', 'Выберите роль...'], ['STUDENT', 'Студент'], ['TEACHER', 'Преподаватель'], ['OTHER', 'Другое']])}/>
						</div>
						<Input
							containerClassname='col'
							control={control} name={'anotherRole'}
							placeholder="Введите роль">
							Роль
						</Input>
					</>) : (<>
						<div
							className={'col my-auto'}
							onClick={()=>{
								setRole(getValues('otherMemberType'))
							}}
						>
							<Select
								className={''}
								control={control}
								name="otherMemberType"
								label={'Роль (преподаватель/студент)'}
								list={new Map([['ANOTHER', 'Выберите роль...'], ['STUDENT', 'Студент'], ['TEACHER', 'Преподаватель'], ['OTHER', 'Другое']])}/>
						</div>
					</>)}



					<div className="d-flex flex-column justify-content-center align-items-center">
						<Typography type={'p1'} classNames="my-4 mb-2" color={'gry'}>
							Нажимая {'"Зарегистрироваться"'} Вы соглашаетесь на обработку персональных данных.
						</Typography>
						<Button variant="orng" htmlType={'submit'} disabled={loading} classNames="d-flex w-100 mt-3">
						Зарегистрироваться
						</Button>
					</div>
				</div>
			</form>
			<div/>
			<div/>
			<div/>
		</div>
	)
}
export default RegStep2
