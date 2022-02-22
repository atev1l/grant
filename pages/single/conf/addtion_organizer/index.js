import {Header} from '../../../../components/Header'
import REGISTRATION from '../../../../lib/apollo/schemas/registration.graphql'

import {useRouter} from 'next/router'
import {Button} from '../../../../components/Button'
import {ArrowLeft, CircleCheck, Cross, Phone} from '../../../../components/icons'
import clsx from 'clsx'
import {Typography} from '../../../../components/Typography'
import style from '../../../../styles/pages/tech.module.scss'
import {useForm} from 'react-hook-form'
import React, {useState} from 'react'
import {useDispatch} from '../../../../components/GeneralCtx'
import {useMutation} from '@apollo/client'

import {actions} from '../../../../lib/store'
import {types} from '../../../../components/Modal'
import {Input} from '../../../../components/Input'

export const AdditionOrganizer = () => {


	const {back} = useRouter()

	const dp = useDispatch()
	const {push} = useRouter()

	const {handleSubmit, control} = useForm({
		defaultValues: {
			email: '',
			pass: 'eboba',
			city: '',
			firstName: '',
			lastName: '',
			organization: '',
			patronymic: '',
			phone: ''
		}
	})


	const [createAccount, {loading}] = useMutation(REGISTRATION, {
		onCompleted: async data => {
			if (!(data.createAccount.errors.length > 0)) {
				dp(actions.main.showModal({
					type: types.SuccessNotification,
					icon: <CircleCheck color={'wht'}/>,
					background: 'grn',
					message: 'Организатор создан успешно!'
				}))
				await push('/')
			} else {
				dp(actions.main.showModal({
					type: types.SuccessNotification,
					icon: <Cross color={'wht'}/>,
					background: 'orng',
					message: data.authorization.errors[0].message
				}))
			}
		}
	})


	const handleCreate = async (data) => {
		await createAccount({
			variables: {
				...data
			}
		})
	}


	const [telephone, setTelephone] = useState([
		<>
			<div className="form-group col-md">
				<Typography classNames={'mb-1 mt-3'} type={'p4'} color={'gry'}>
					Телефон
				</Typography>
				<Input
					type="text"
					className="form-control"
					id="phone"
					name="phone"
					control={control}
					placeholder="Введите телефон"/>
			</div>
		</>
	])



	return (<>
		<Header
			title={'Добавление организатора'}
			right={<div />}
			left={
				<div className={'d-flex'}>

					<div onClick={() => back()}>
						<ArrowLeft/>
					</div>
				</div>}

		>
		</Header>


		<form
			onSubmit={handleSubmit(handleCreate)}
			className={clsx(style.container, 'position-relative')}
		>
			<div className="h2 mx-3 mt-2 mc">
				<div className={'d-flex flex-column mt-3'}>
					<div className="form-group col-md">
						<Typography classNames={'mb-1'} type={'p4'} color={'gry'}>
							Имя
						</Typography>
						<Input
							type="text"
							className="form-control"
							id="firstName"
							name="firstName"
							control={control}
							placeholder="Введите имя"/>
					</div>

					<div className="form-group col-md">
						<Typography classNames={'mb-1 mt-3'} type={'p4'} color={'gry'}>
							Фамилия
						</Typography>
						<Input
							type="text"
							className="form-control"
							id="lastName"
							name="lastName"
							control={control}
							placeholder="Введите фамилию"/>
					</div>

					<div className="form-group col-md">
						<Typography classNames={'mb-1 mt-3'} type={'p4'} color={'gry'}>
							Отчество
						</Typography>
						<Input
							type="text"
							className="form-control"
							id="patronymic"
							name="patronymic"
							control={control}
							placeholder="Введите отчество"/>
					</div>

					<div className="form-group col-md">
						<Typography classNames={'mb-1 mt-3'} type={'p4'} color={'gry'}>
							Почта
						</Typography>
						<Input
							type="text"
							className="form-control"
							id="email"
							name="email"
							control={control}
							placeholder="Введите почту"/>
					</div>

					<div className="form-group col-md">
						<Typography classNames={'mb-1 mt-3'} type={'p4'} color={'gry'}>
							Город
						</Typography>
						<Input
							type="text"
							className="form-control"
							id="city"
							name="city"
							control={control}
							placeholder="Введите город"/>
					</div>

					<div className="form-group col-md">
						<Typography classNames={'mb-1 mt-3'} type={'p4'} color={'gry'}>
							Организация
						</Typography>
						<Input
							type="text"
							className="form-control"
							id="organization"
							name="organization"
							control={control}
							placeholder="Введите организацию"/>
					</div>

					{telephone.map((e, k) => (<React.Fragment key={String(k)}>
						{e}
					</React.Fragment>))}

				</div>
			</div>
			<div className={'position-fixed bg-white w-100 bottom-0'}>
				<div className={'sh-up w-100 py-3 px-3'}>

					<div className="d-flex bd-highlight">
						<Button classNames=' w-100 bd-highlight me-2' variant="orng" htmlType={'submit'}>
							<Typography  type={'p1sb'} color={'white'}>
								Добавить участника
							</Typography>
						</Button>

						<Button classNames='p-2 flex-shrink-1 bd-highlight' variant="orng" onClick={() => {
							setTelephone(s => [...s, telephone[0]])
						}}>
							<Phone/>
						</Button>
					</div>
				</div>
			</div>

		</form>
	</>)
}
export default AdditionOrganizer

