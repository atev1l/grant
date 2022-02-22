import clsx from 'clsx'
import style from './style.module.scss'
import { Typography } from '../Typography'
import { Block } from '../Block'
import { ArrowDownload } from '../icons'
import { Document } from '../Document'
import { Button } from '../Button'
import { store as main_store } from '../../lib/store/main'
import { types } from '../Modal'
import { useDispatch } from '../GeneralCtx'
import { Input } from '../Input'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { useMutation } from '@apollo/client'

import CHANGE_ROLE from '../../lib/apollo/schemas/personal/change_role.graphql'
import { Select } from '../Select'
import fp from 'lodash/fp'
import { statusRequest } from '../../lib/consts'
import { actions } from '../../lib/store'



export const statuses =  new Map(fp.keys(statusRequest).map(key => [key, statusRequest[key]]))


export const Contacts = ({
	title,
	children,
	contacts = [],
	arrow = false,
	documents = false,
	buttons = false,
	requestId = null,
	onRightClick = null,
	reject = false,
	organization,
	className = '',
	...props
}) => {

	const dp = useDispatch()

	const {query: {id}} = useRouter()

	// console.log(requestId, id)

	const [sendComment] = useMutation(CHANGE_ROLE, {
		onCompleted: () => dp(actions.main.hideModal())
	})

	return (
		<div>
			<div className={clsx(style.main, 'px-3 pb-1 pt-2 w-100 brdr-4 my-1 bg-white', className)}>
				{title && <div className={'d-flex justify-content-between align-content-center w-100 mb-2'}>
					<div>
						<Typography type={'t1'} classNames={'mt-1 mb-1'}>
							{title}
						</Typography>
					</div>
					<div>
						<Typography type={'p2sb'} classNames={'mt-1 mb-1'} color={'gry'}>
							{organization}
						</Typography>
						<div>
							{arrow && <ArrowDownload color={'orng'}/>}
						</div>
					</div>
				</div>}
				{contacts.map((contact, i) =>
					<Block key={String(i)} {...contact} line={contacts.length - 1 !== i}/>
				)}
				{children}

				{documents &&
				<div className="mb-3">
					{documents.map(({relativePath, name, sizeString, extension}, id) => (
						<Document key={String(id)} title={name} extension={extension.substring(1)} size={sizeString} link={relativePath}/>
					))}
				</div>
				}
				{buttons &&
				<div className="d-flex w-100 mb-3">
					<Button
						classNames={'w-100 me-1 py-3'}
						variant="orng"
						outline="true"
						color="orng"
						textType="p2sb"
						onClick={() => dp(main_store.actions.showModal({
							type: types.Popup,
							message: 'Комментарий',
							addition: {
								description: () => {
									const {control, handleSubmit} = useForm({
										defaultValues: {
											...props
										}
									})
									return <form
										className={'m-0 p-0'}
										onSubmit={handleSubmit(variables => sendComment({
											variables: {
												...variables,
												eventId: id,
												id: requestId
											}
										}))}>
										<Select
											control={control}
											name={'status'}
											label={'Статус заявки'}
											list={statuses}
										/>
										<Input control={control} name={'comment'} placeholder={'Введите комментарий'}>
											Комментарий
										</Input>
										<Button
											htmlType={'submit'} color={'orng'} variant={'wht'}
											classNames={'align-right'}>
											Отправить
										</Button>
									</form>
								},
							},
						}))}>
						Комментарий
					</Button>
					<Button
						onClick={onRightClick}
						classNames={clsx(style.padding_btns, 'w-100 ms-1 py-3')} variant="orng" color="white"
						textType="p2sb">
						{reject ? 'Принять' : 'Отклонить'}
					</Button>
				</div>
				}
			</div>
		</div>
	)
}
