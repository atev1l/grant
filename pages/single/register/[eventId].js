import { Header } from '../../../components/Header'
import { Input } from '../../../components/Input'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { Button } from '../../../components/Button'
import { useMutation } from '@apollo/client'

import REGISTER_ON_QR_EVENT from '../../../lib/apollo/schemas/events/register_on_qr_event.graphql'
import { useDispatch } from '../../../components/GeneralCtx'
import { actions } from '../../../lib/store'
import { types } from '../../../components/Modal'
import { Info } from '../../../components/icons'
import fp from 'lodash/fp'

const RegisterUserOnEvent = () => {

	const {query} = useRouter()

	const dp = useDispatch()

	const {control, handleSubmit} = useForm({
		defaultValues: {
			pincode: ''
		}
	})

	const [register, {loading}] = useMutation(REGISTER_ON_QR_EVENT, {
		onCompleted: data => {
			const errors = fp.get('requestMarkArrived.errors', data)
			dp(actions.main.showModal({
				type: types.SuccessNotification,
				background: errors.length < 1 ? 'grn' : 'rd',
				icon: <Info color={'wht'}/>,
				message: errors.length < 1 ? 'Участник успешно зарегистрирован' : errors[0].message,
			}))
		},
		onError: error => {
			// const errors = fp.get('requestMarkArrived.errors', data)
			dp(actions.main.showModal({
				type: types.SuccessNotification,
				background: 'rd',
				icon: <Info color={'wht'}/>,
				message: error.message,
			}))
		}
	})

	const handleRegister = async data => {
		await register({
			variables: {...data, ...query}
		})
	}

	return (
		<Header
			left={<div/>}
			right={<div/>}
			title={'Введите пин-код'}
		>
			<form
				className={'m-3'}
				onSubmit={handleSubmit(handleRegister)}>
				<Input
					control={control}
					name={'pincode'}
					placeholder={'Введите пинкод'}
				/>
				<Button htmlType={'submit'} variant={'orng'} disabled={loading} classNames={'d-flex w-100'}>
					Ввести код
				</Button>
			</form>
		</Header>
	)
}

export default RegisterUserOnEvent
