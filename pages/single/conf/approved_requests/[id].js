import { Header } from '../../../../components/Header'


import { types } from '../../../../components/Modal'

import { useRouter } from 'next/router'
import { Button } from '../../../../components/Button'
import { useDispatch, useSelector } from '../../../../components/GeneralCtx'
import { ArrowDown, ArrowLeft, Filter, Invite, Message, ThreeDots, User } from '../../../../components/icons'
import { store as main_store } from '../../../../lib/store/main'
import { GroupButtons } from '../../../../components/GroupButtons'
import clsx from 'clsx'
import { Typography } from '../../../../components/Typography'
import { Contacts, statuses } from '../../../../components/Сontacts'
import { Select } from '../../../../components/Select'
import { Dropdown } from '../../../../components/Dropdown'
import { useMutation, useQuery } from '@apollo/client'
import GET_EVENT_USERS from '../../../../lib/apollo/schemas/events/get_event_users.graphql'
import CHANGE_ROLE from '../../../../lib/apollo/schemas/personal/change_role.graphql'
import { useEffect } from 'react'
import fp from 'lodash/fp'
import { Input } from '../../../../components/Input'
import { useForm } from 'react-hook-form'
import { actions } from '../../../../lib/store'

import styles from '../../../../styles/pages/requests.module.scss'

export const ApprovedRequests = () => {

	const dp = useDispatch()

	const { search, role  } = useSelector('main.filters')

	const {push} = useRouter()

	const {back, query: {id}} = useRouter()

	const {data, loading, refetch} = useQuery(GET_EVENT_USERS, {
		variables: {
			search,
			eventId: id,
			status: [
				'COMPLETED',
				'ARRIVED',
			],
			roleSelected: {
				neq: 'NONE',
			},
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
					'COMPLETED',
					'ARRIVED',
				],
			})
		}
	}, [role_changing, called, refetch, search, id, role])


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
							addition: {
								filters: control => (<>
									<Select
										className={'my-3'}
										control={control}
										name="role"
										label={'Роль участника'}
										list={new Map([['all', 'Все'], ['PARTICIPANT', 'Участник'], ['SPEAKER', 'Докладчик']])}/>
								</>)
							}
						}))}>
							<Filter/>
						</div>
					</div>
				</div>}
		>
			<div className="mx-3">
				<div className={'mt-3 container-md'}>
					<GroupButtons type={'asPath'} tabs={[
						{
							path: `/single/conf/approved_requests/${id}`,
							name: 'Одобрено'
						},
						{
							path: `/single/conf/rejected_requests/${id}`,
							name: 'Не одобрено'
						}
					]}/>
				</div>
				<div className={clsx('container-xl mt-3 p-0 brdr-4', styles.border)}>
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
							{loading || fp.getOr([], 'requests.edges', data).map(({node}) => (
								<>
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
												onClick={() =>{
													dp(main_store.actions.showModal({
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
																		htmlType={'submit'} color={'orng'}
																		variant={'wht'}
																		classNames={'align-right'}>
																		Отправить
																	</Button>
																</form>
															},
														},
													}))}}
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
													onRightClick={async () => {
														await handle_role_change({
															variables: {
																id: node.id,
																eventId: id,
																status: 'DENIED'
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
											title={`${node.profileLight.lastName} 
						${node.profileLight.firstName} 
						${node.profileLight.patronymic}`}
											documents={node.documents}
											buttons="true"
											requestId={node.id}
											onRightClick={async () => {
												await handle_role_change({
													variables: {
														id: node.id,
														eventId: id,
														status: 'DENIED'
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
										/>
									</div>
								</>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</Header>

		<div
			className="d-flex flex-column justify-content-center align-items-center position-fixed bottom-0 w-100 p-3 gradient"
			onClick={() => dp(main_store.actions.showModal({
				type: types.Popup,
				addition: {
					description:
						<div className={'d-flex flex-column justify-content-start align-items-start'}>
							<div className="d-flex" onClick={async () => {
								dp(main_store.actions.hideModal())
								await push('/single/conf/register_organizer')
							}}>
								<User color={'orng'}/>
								<Typography type={'p1'} classNames="mb-3">
									Назначить из существующих
								</Typography>
							</div>
							<div className="d-flex" onClick={async () => {
								dp(main_store.actions.hideModal())
								await push('/single/conf/addtion_organizer')
							}}>
								<Invite color={'orng'}/>
								<Typography type={'p1'} classNames={''}>
									Назначить из новых
								</Typography>
							</div>
						</div>,
				},
			}))}
		>

		</div>
	</>)
}
export default ApprovedRequests

