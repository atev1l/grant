// noinspection DuplicatedCode

import { Header } from '../../../../components/Header'
import React from 'react'

import { types } from '../../../../components/Modal'
import { useRouter } from 'next/router'
import { Button } from '../../../../components/Button'
import { useDispatch, useSelector } from '../../../../components/GeneralCtx'
import { ArrowDown, ArrowLeft, Filter, Message, ThreeDots } from '../../../../components/icons'
import { store as main_store } from '../../../../lib/store/main'
import { GroupButtons } from '../../../../components/GroupButtons'
import clsx from 'clsx'
import { useMutation, useQuery } from '@apollo/client'
import GET_EVENT_USERS from '../../../../lib/apollo/schemas/events/get_event_users.graphql'
import CHANGE_ROLE from '../../../../lib/apollo/schemas/personal/change_role.graphql'
import { useEffect } from 'react'
import { Contacts, statuses } from '../../../../components/Сontacts'
import { Dropdown } from '../../../../components/Dropdown'
import { requestType } from '../../../../lib/consts'
import fp from 'lodash/fp'
import { useForm } from 'react-hook-form'
import { actions } from '../../../../lib/store'
import { Select } from '../../../../components/Select'
import { Input } from '../../../../components/Input'

import styles from '../../../../styles/pages/requests.module.scss'

export const RejectedRequests = () => {

	const dp = useDispatch()

	const {search, role} = useSelector('main.filters')


	const {back, query: {id}} = useRouter()

	const {data, loading, refetch} = useQuery(GET_EVENT_USERS, {
		variables: {
			search,
			eventId: id,
			roleSelected: {
				neq: 'NONE',
			},
			status: [
				'AWAIT_VERIFY',
				'DENIED',
				'NEED_CORRECTION',
				'PAY_AWAIT'
			]
		}
	})

	// noinspection DuplicatedCode
	const [handle_role_change, {loading: role_changing, called}] = useMutation(CHANGE_ROLE)

	useEffect(async () => {
		if (!loading && !role_changing) {
			const roleSelected = fp.isUndefined(role) || role !== 'all' ? {
				neq: 'NONE'
			} : {
				eq: role
			}
			await refetch({
				search,
				roleSelected,
				eventId: id,
				status: [
					'AWAIT_VERIFY',
					'DENIED',
					'NEED_CORRECTION',
					'PAY_AWAIT'
				]
			})
		}
	}, [role_changing, called, refetch, search, id, role])


	// useEffect(async () => {
	// 	if (!role_changing && called) {
	// 		await refetch()
	// 	}
	// }, [role_changing, called, refetch])

	const [sendComment] = useMutation(CHANGE_ROLE, {
		onCompleted: () => dp(actions.main.hideModal())
	})

	return (<>
		<Header
			title={'Участники'}
			search
			left={
				<div className={'d-flex'}>

					<div onClick={() => back()}>
						<ArrowLeft/>
					</div>
					<div className={'ms-4'}>
						<div onClick={() => dp(main_store.actions.showModal({
							type: types.BottomFilter,
						}))}>
							<Filter/>
						</div>
					</div>
				</div>
			}
		>
			<div className={'mx-3 ms-auto me-auto'}>
				<div className={'my-3 container-xl'}>
					<GroupButtons type={'asPath'} tabs={[{
						path: `/single/conf/approved_requests/${id}`,
						name: 'Одобрено'
					}, {
						path: `/single/conf/rejected_requests/${id}`,
						name: 'Не одобрено'
					}]}/>
				</div>
				<div className={'container-xl'}>
					<table
						className="table table-borderless">
						<thead
							className={styles.invert}
						>
							<tr className={'table-secondary text-secondary'}>
								<th scope="col">
									<input className="form-check-input" type="checkbox" />
								</th>
								<th scope="col">ФИО</th>
								<th scope="col">Город</th>
								<th scope="col">Организация</th>
								<th scope="col" />
							</tr>
						</thead>
						<tbody>
							{loading || fp.getOr([], 'requests.edges', data).map(({ node }) => (
								<React.Fragment key={node.id}>
									<tr
										className={styles.invert}
									>
										<td>
											<input className="form-check-input" type="checkbox" />
										</td>
										<td>
											{`${node.profileLight.lastName}
											${node.profileLight.firstName}
											${node.profileLight.patronymic}`}
										</td>
										<td>
											{node.profileLight.city}
										</td>
										<td>
											{node.profileLight.organization}
										</td>
										<td className={'d-flex justify-content-end'}>
											<div
												onClick={() => dp(main_store.actions.showModal({
													type: types.Popup,
													message: 'Комментарий',
													addition: {
														description: () => {
															const {control, handleSubmit} = useForm()
															return <form
																className={'m-0 p-0'}
																onSubmit={handleSubmit(variables => sendComment({
																	variables: {
																		...variables,
																		eventId: id,
																		id: node.id
																	}
																}))}>
																<Select
																	control={control}
																	name={'status'}
																	label={'Статус заявки'}
																	list={statuses}
																/>
																<Input
																	control={control} name={'comment'}
																	placeholder={'Введите комментарий'}
																>
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
												}))}
												className={'p-1 bg-lgr rounded-2'}>
												<Message color={'gry'} />
											</div>
											<Dropdown
												custom={<Contacts
													className={clsx('m-0 bg-danger p-0', styles.dropdown)}
													key={node.id}
													title={`${node.profileLight.lastName} 
						${node.profileLight.firstName} 
						${node.profileLight.patronymic}`}
													documents={node.documents}
													buttons="true"
													requestId={node.id}
													reject
													onRightClick={async () => {
														await handle_role_change({
															variables: {
																id: node.id,
																eventId: id,
																status: 'COMPLETED'
															}
														})
													}}
													contacts={[
														{
															label: 'Роль',
															value: <Dropdown
																icon={
																	<>
																		{node.type}
																		<ArrowDown color={'orng'}/>
																	</>
																}
																actions={[
																	{
																		name: 'Участник',
																		callback: async () => await handle_role_change({
																			variables: {
																				id: node.id,
																				eventId: id,
																				type: 'PARTICIPANT'
																			}
																		}),
																	},
																	{
																		name: 'Докладчик',
																		callback: async () => await handle_role_change({
																			variables: {
																				id: node.id,
																				eventId: id,
																				type: 'SPEAKER'
																			}
																		}),
																	}
																]}/>
														},
														{
															label: 'Телефон',
															value: node.profileLight.phone
														},
														{
															label: 'Город',
															value: node.profileLight.city
														},
														{
															label: 'Организация',
															value: node.profileLight.organization
														},
														{
															label: 'Публикация',
															value: node.talkTitle
														},
														{
															label: 'Документы',
														}
													]}
												/>}
												icon={
													<div
														className={'p-1 bg-lgr ms-1 rounded-2'}
													>
														<ThreeDots
															color={'gry'}
														/>
													</div>
												}
											/>
										</td>
									</tr>
									<div className={'d-lg-none'}>

										<Contacts
											key={node.id}
											reject
											{...node}
											id={node.id}
											requestId={node.id}
											title={`${node.profileLight.lastName} 
						${node.profileLight.firstName} 
						${node.profileLight.patronymic}`}
											documents={node.documents}
											buttons="true"
											onRightClick={() => handle_role_change({
												variables: {
													eventId: id,
													id: node.id,
													status: 'COMPLETED'
												}
											})}
											contacts={[
												{
													label: 'Роль',
													value: <Dropdown
														icon={
															<>
																{requestType[node.type]}
																<ArrowDown color={'orng'}/>
															</>
														}
														actions={[
															{
																name: 'Участник',
																callback: async () => await handle_role_change({
																	variables: {
																		id: node.id,
																		type: 'PARTICIPANT',
																		eventId: id
																	}
																}),
															},
															{
																name: 'Докладчик',
																callback: async () => await handle_role_change({
																	variables: {
																		id: node.id,
																		type: 'SPEAKER',
																		eventId: id
																	}
																}),
															}
														]}/>
												},
												{
													label: 'Телефон',
													value: node.profileLight.phone
												},
												{
													label: 'Город',
													value: node.profileLight.city
												},
												{
													label: 'Организация',
													value: node.profileLight.organization
												},
												{
													label: 'Публикация',
													value: node.talkTitle
												},
												{
													label: 'Документы',
												}
											]}
										/>
									</div>
								</React.Fragment>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</Header>
	</>)
}
export default RejectedRequests
