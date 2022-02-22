import { ArrowLeft, CircleCheck } from '../../components/icons'
import { Epic } from '../../components/Epic'
import { Header } from '../../components/Header'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { Input } from '../../components/Input'
import { useMutation, useQuery } from '@apollo/client'
import {useEffect, useState} from 'react'
import { Button } from '../../components/Button'
import { Typography } from '../../components/Typography'

import GET_SELF from '../../lib/apollo/schemas/user/get_self.graphql'
import UPDATE_SELF from '../../lib/apollo/schemas/user/update_user.graphql'
import { useDispatch } from '../../components/GeneralCtx'
import { actions } from '../../lib/store'
import { types } from '../../components/Modal'
import styles from '../../styles/pages/tech.module.scss'
import clsx from 'clsx'
import {Select} from '../../components/Select'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

const rs =  yup.object().shape({
	country: yup.string().required('Обязятельное поле'),
	memberType: yup.string().test('selecting', 'Не выбрано', text => text !== 'ANOTHER').required('Обязятельное поле')
})

const Settings = () => {

	const dp = useDispatch()
	const [organization, setOrganization] = useState()

	const [role, setRole] = useState()
	const {data, loading} = useQuery(GET_SELF)

	useEffect(() => {
		if (organization) {
			console.log('curf')
			console.log(organization)
		}
	}, [organization])

	const {control, handleSubmit, setValue, getValues} = useForm({
		resolver: yupResolver(rs),
		defaultValue: {
			firstName: '',
			lastName: '',
			patronymic: '',
			organization: '',
			phone: '',
			city: '',
			anotherOrganization: organization
		}
	})

	const [update] = useMutation(UPDATE_SELF, {
		onCompleted: () => dp(actions.main.showModal({
			type: types.SuccessNotification,
			message: 'Информация успешно обновлена',
			background: 'grn',
			icon: <CircleCheck color={'wht'}/>
		}))
	})
	const {back} = useRouter()

	useEffect(() => {
		if (!loading) {
			Object.keys(data.infoByCurrentAccount.value.profile).forEach((key) => {
				setValue(key, data.infoByCurrentAccount.value.profile[key])
			})
			setValue('anotherOrganization', data.infoByCurrentAccount.value.profile['organization'])
			setValue('anotherRole', data.infoByCurrentAccount.value.profile['memberTypeCustom'])
			setOrganization(data.infoByCurrentAccount?.value?.profile?.organization)
			setRole(data.infoByCurrentAccount?.value?.profile?.memberType)
		}
	}, [data, setValue, loading])

	const handleUpdate = async (data) => {
		await update({
			variables: {
				...data,
				organization: organization,
				memberType: role,
				memberTypeCustom: (role === 'OTHER') ? getValues('anotherRole') : role
			}
		})
	}

	return (
		<Header
			left={<div onClick={() => back()}>
				<ArrowLeft color={'blck'}/>
			</div>}
			title={'Редактирование профиля'}
			right={<div/>}
		>
			<form
				onSubmit={handleSubmit(handleUpdate)}
				className={clsx('d-flex justify-content-center align-items-start')}
			>
				<div className={clsx(styles.main_form, '')}>
					<div className={clsx('mx-2 mt-3 mb-5 row container-md bg-white align-items-start', styles.bg)}>
						<Input
							containerClassname={'col-md-6 col-12'}
							control={control}
							name={'lastName'}
							placeholder={'Введите фамилию'}
						>
						Фамилия
						</Input>
						<Input
							containerClassname={'col-md-6 col-12'}
							control={control}
							name={'firstName'}
							placeholder={'Введите имя'}
						>
						Имя
						</Input>
						<Input
							containerClassname={'col-md-6 col-12'}
							control={control}
							name={'patronymic'}
							placeholder={'Введите отчество'}
						>
						Отчество
						</Input>
						<Input
							containerClassname={'col-md-6 col-12'}
							control={control}
							name={'phone'}
							placeholder={'Введите телефон'}
						>
						Телефон
						</Input>

						{(role === 'OTHER') ? (<>
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
						</>)}

						<Input
							containerClassname={'col-md-6 col-12'}
							control={control}
							name={'country'}
							placeholder={'Введите страну'}>
						Cтрана
						</Input>
						<Input
							containerClassname={'col-md-6 col-12'}
							control={control}
							name={'city'}
							placeholder={'Введите город'}>
						Город
						</Input>
						{(organization !== 'ПГУ') ? (<>
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
									list={new Map([['another', 'Другая'], ['ПГУ', 'ПГУ']])}/>
							</div>
							<div onChange={() => {
								setOrganization(getValues('anotherOrganization'))
							}}>
								<Input
									containerClassname='col'
									control={control} name={'anotherOrganization'}
									placeholder="Введите организацию">
									Название организации
								</Input>
							</div>
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
						<div className={'gradient-md w-100 bottom-0 p-2 container-md mb-3'}>
							<div className={'w-100 pt-5'}>
								<div className="d-flex bd-highlight">
									<Button
										classNames="w-100 bd-highlight"
										variant="orng"
										htmlType="submit"
									>
										<Typography type={'p1sb'} color={'white'}>
											Изменить
										</Typography>
									</Button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</form>
			<Epic/>

		</Header>)
}

export default Settings
