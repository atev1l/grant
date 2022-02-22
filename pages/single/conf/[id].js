import {SingleEvent} from '../../../components/Wrappers/SingleEvent'
import {Description} from '../../../components/Description'
import {Contacts} from '../../../components/Сontacts'
import QRCode from 'qrcode.react'
import {Button} from '../../../components/Button'
import {Typography} from '../../../components/Typography'
import {useRouter} from 'next/router'
import {useLazyQuery, useMutation, useQuery} from '@apollo/client'

import GET_SINGLE_EVENT from '../../../lib/apollo/schemas/events/get_single.graphql'
import fp from 'lodash/fp'
import {colors, statusEvent} from '../../../lib/consts'
import moment from 'moment'
import React, {useEffect} from 'react'
import CREATE_QR from '../../../lib/apollo/schemas/events/create_qr.graphql'
import {useDispatch} from '../../../components/GeneralCtx'
import {actions} from '../../../lib/store'
import {types} from '../../../components/Modal'
import {Info, Invite, Pencil, ThreeDots, User} from '../../../components/icons'

import GET_REQUEST_COMMENT from '../../../lib/apollo/schemas/personal/get_request_comment.graphql'
import {GroupButtons} from '../../../components/GroupButtons'
import {Document} from '../../../components/Document'
import {Dropdown} from '../../../components/Dropdown'
import {Protect} from '../../../components/Protect'

import * as yup from 'yup'

const typeCheck = yup.mixed().oneOf(['ARRIVED', 'COMPLETED'])


const SingleConference = () => {

	const {push, pathname} = useRouter()
	// const [isBlocked, setIsBlocked]  = useState(false)
	// const {} = useRouter()
	useEffect(() => {
		console.log(pathname)
	}, [pathname])

	const dp = useDispatch()
	const {query: {id}} = useRouter()

	const {data, loading} = useQuery(GET_SINGLE_EVENT, {
		variables: {
			id
		}
	})

	const info = fp.get('events.edges[0].node', data)

	const [getComment, {loading: requestLoading, called: requestCalled}] = useLazyQuery(GET_REQUEST_COMMENT, {
		onCompleted: (comment) => {
			if (comment.myRequests.edges[0].node.comment && typeCheck.isValid(comment.myRequests.edges[0].node.type) ) {
				dp(actions.main.showModal({
					type: types.NotificationWithDesc,
					background: 'rd',
					icon: <Info color={'wht'}/>,
					message: 'Требуются корректировки',
					addition: {
						description: <>
							{comment.myRequests.edges[0].node.comment}
							<Button variant={'orng'} color={'wht'} classNames={'mt-2'} onClick={async () => {
								await push(`/single/create_request/${id}?reqId=${info?.requestId}`)
							}
							}>
								Редактировать заявку
							</Button>
						</>
					}
				}))
			}
		}
	})

	const [getQR, {loading: qRLoading, data: dataQr, error}] = useMutation(CREATE_QR, {
		onCompleted: qr => {
			if (!fp.get('createQRToken.errors[0]', qr)) {
				const qrString = `${new URL(process.env.NEXT_PUBLIC_BASE_API).origin}/single/register/${id}?token=${qr?.createQRToken?.value?.token}`
				dp(actions.main.showModal({
					type: types.NotificationWithDesc,
					background: 'grn',
					icon: <Info color={'wht'}/>,
					message: 'Доступен QR код',
					addition: {
						description: () => {
							const {pathname} = useRouter()
							useEffect(() => {
								console.log(pathname)
								if (pathname !== '/single/conf/[id]')
									dp(actions.main.hideModal())
							}, [pathname, dp])
							return (
								<>
									QR код необходим для регистрации на мероприятии, предъявите его организаторам
									<div className={'my-2'}>
										<QRCode
											value={qrString}
											renderAs="svg"
											style={{
												width: '100%',
												maxWidth: '400px',
												maxHeight: '400px',
												height: '100%',
											}}/>
									</div>
								</>)
						}
					}
				}))
			}
		},
		onError: (resp) => {
			// console.log(fp.get(resp, 'networkError.result.errors[0]'))
			console.log(resp.networkError.result.errors[0].message)
			// console.log(error)
		}
		// errorPolicy: 'ignore',
	})

	useEffect(async () => {
		if (!error && !loading && !qRLoading && !requestLoading && !requestCalled && !fp.get('createQRToken.value.token', dataQr)) {
			await getQR({
				variables: {
					requestId: info?.requestId
				}
			})
		}
	}, [loading, qRLoading, id, requestCalled, requestLoading, dataQr])

	useEffect(async () => {
		if (!requestCalled && !requestLoading && !loading && info?.requestId && info?.status !== 'COMPLETED') {
			await getComment({
				variables: {
					requestId: info?.requestId,
					eventId: id
				}
			})
		}
	}, [loading, id, requestCalled, requestLoading])

	return (
		<>
			<SingleEvent loading={loading}>
				<div className={'mt-3 mb-3 d-md-none'} onClick={ async () => {
					await dp(actions.event.clearAll())
				}}>
					<GroupButtons type={'asPath'} tabs={[
						{
							path: `/single/conf/${id}`,
							name: 'Мероприятие'
						},
						{
							path: `/single/create_request/${id}?reqId=${info?.requestId}`,
							name: 'Моя заявка'
						}
					]}/>
				</div>
				<div className={'d-flex flex-column'}>
					<div className={'d-none d-md-flex mb-3 justify-content-between align-items-center'}>
						<div className={'d-flex'}>
							<Typography type={'p2sb'} color={'gry'}>
								{`${fp.getOr('', 'contactPerson.firstName', info)}
							${fp.getOr('', 'contactPerson.lastName', info)}`}
							</Typography>
							<Typography
								classNames={'mx-4'}
								type={'p2sb'}
								color={'gry'}
							>
								{moment(info?.scheduledTo).format('DD MMM в HH:m')}
							</Typography>
						</div>
						<div>
							<Protect min_role={{ eventId: id, role: 'Organizer'}} fallback={<>
								<Dropdown
									icon={
										<div className={'rotate-2'}>
											<ThreeDots/>
										</div>
									}
									actions={(info?.requestId === null) ? [
										{
											icon: <User color={'orng'}/>,
											name: 'Участники и материалы',
											callback: async () => push(`/single/conf/statistic/${id}`),
										}
									] : [
										{
											icon: <User color={'orng'}/>,
											name: 'Моя заявка',
											callback: async () => {
												await push(`/single/create_request/${id}?reqId=${info?.requestId}`)
												await dp(actions.event.clearAll())
												await dp(actions.request.clearAll())
											}
										},
										{
											icon: <User color={'orng'}/>,
											name: 'Участники и материалы',
											callback: async () => push(`/single/conf/statistic/${id}`),
										}
									]}/>
							</>}>
								<Dropdown
									icon={
										<div className={'rotate-2'}>
											<ThreeDots/>
										</div>
									}
									actions={(info?.requestId !== null) ? [
										{
											icon: <Invite color={'orng'}/>,
											name: 'Заявки участников',
											callback: async () => await push(`/single/conf/approved_requests/${id}`),
										},
										{
											icon: <Pencil color={'orng'}/>,
											name: 'Редактировать',
											callback: async () => {
												await dp(actions.event.clearAll())
												await push(`/create_event/${id}`)
											},
										},
										{
											icon: <User color={'orng'}/>,
											name: 'Моя заявка',
											callback: async () => {
												await push(`/single/create_request/${id}?reqId=${info?.requestId}`)
												await dp(actions.event.clearAll())
												await dp(actions.request.clearAll())
											}
										},
										{
											icon: <User color={'orng'}/>,
											name: 'Участники и материалы',
											callback: async () => push(`/single/conf/statistic/${id}`),
										},
										{
											icon: <User color={'orng'}/>,
											name: 'Скачать статистику',
											callback: async () => push(`/single/conf/statistic/download_stats/${id}`),
										}
									] : [
										{
											icon: <Invite color={'orng'}/>,
											name: 'Заявки участников',
											callback: async () => await push(`/single/conf/approved_requests/${id}`),
										},
										{
											icon: <Pencil color={'orng'}/>,
											name: 'Редактировать',
											callback: async () => {
												await dp(actions.event.clearAll())
												await push(`/create_event/${id}`)
											},
										},
										{
											icon: <User color={'orng'}/>,
											name: 'Участники и материалы',
											callback: async () => push(`/single/conf/statistic/${id}`),
										},
										{
											icon: <User color={'orng'}/>,
											name: 'Скачать статистику',
											callback: async () => push(`/single/conf/statistic/download_stats/${id}`),
										}
									]}/>
							</Protect>
						</div>
					</div>
					<Typography type={'t0'} classNames={'mb-3'}>
						{info?.title}
					</Typography>
					{info?.coverImage && <img
						src={`${new URL(process.env.NEXT_PUBLIC_BASE_API).origin}/${info?.coverImage}`}
						alt={'banner'}
						style={{ maxHeight: '25vh', width: 'auto', overflow: 'hidden', objectFit: 'cover'}}
						className={'w-100'}
					/>}
					<div className={'d-none d-md-block mt-5'}>
						<Typography type={'t1sb'}>
							<div dangerouslySetInnerHTML={{__html: info?.description}}/>
						</Typography>
						<hr color={colors.lgr}/>

						<div className={'d-none d-md-block mt-4 mb-3'}>
							<Typography type={'t0'} classNames={'mb-3'}>
								Описание
							</Typography>
							<Typography type={'t1sb'} color={'gry'} classNames={'d-flex my-3'}>
								Организатор
								<Typography type={'t1sb'} color={'blck'} classNames={'mx-2'}>
									{fp.getOr('', 'contactPerson.firstName', info)}
									{' '}
									{fp.getOr('', 'contactPerson.lastName', info)}
								</Typography>
							</Typography>
							<Typography type={'t1sb'} color={'gry'} classNames={'d-flex my-3'}>
								Дата:
								<Typography type={'t1sb'} color={'blck'} classNames={'mx-2'}>
									{moment(info?.scheduledTo).format('DD.MM.YY')}
								</Typography>
							</Typography>
							<Typography type={'t1sb'} color={'gry'} classNames={'d-flex my-3'}>
								Статус:
								<Typography type={'t1sb'} color={'blck'} classNames={'mx-2'}>
									{fp.getOr('Неизвестно', `${info?.status}`, statusEvent)}
								</Typography>
							</Typography>
						</div>
						<hr color={colors.lgr}/>
						<Typography type={'t0'} classNames={'mt-4 mb-3'}>
							Контакты
						</Typography>
						<Typography type={'t1sb'} color={'gry'} classNames={'d-flex my-3'}>
							Телефон:
							<Typography type={'t1sb'} color={'blck'} classNames={'mx-2'}>
								{info?.contactPerson?.phone}
							</Typography>
						</Typography>
						<Typography type={'t1sb'} color={'gry'} classNames={'d-flex my-3'}>
							Почта:
							<Typography type={'t1sb'} color={'blck'} classNames={'mx-2'}>
								{info?.contactPerson?.phone}
							</Typography>
						</Typography>
						{info?.documents[0] ? <div className={'mb-5'}>

							<hr color={colors.lgr}/>
							<Typography type={'t0'} classNames={'mt-4 mb-3'}>
									Приложение
							</Typography>
							<div className={'mt-3'}>
								{info?.documents?.map(key => (
									// eslint-disable-next-line react/jsx-key
									<Document
										title={key.name} link={key.relativePath}
										size={key.sizeString}
										extension={key.extension.substring(1, 99)}
									/>
								))}
							</div>
						</div>
							: ''}
					</div>
					<div className={'d-md-none mb-3'}>
						<Description
							title="Описание"
							text={info?.description}
						/>

						<Contacts
							title={'Информация'}
							contacts={[
								{
									label: 'Дата',
									value: moment(info?.scheduledTo).format('DD.MM.YY')
								},
								{
									label: 'Организатор',
									value: `${fp.getOr('', 'contactPerson.firstName', info)}
									${fp.getOr('', 'contactPerson.lastName', info)}`
								},
								{
									label: 'Статус',
									value: fp.getOr('Неизвестно', `${info?.status}`, statusEvent)
								},
							]}
						/>
						{info?.documents[0] ? <div className={'mb-2'}>
							<Description
								title="Приложение"
								hideLabelAll
							>
								<div className={'mt-3'}>
									{info?.documents?.map(key => (
									// eslint-disable-next-line react/jsx-key
										<Document
											title={key.name} link={key.relativePath}
											size={key.sizeString}
											extension={key.extension.substring(1, 99)}
										/>
									))}
								</div>
							</Description>
						</div>
							: ''}

						{info?.contactPerson?.phone ?
							<div className={'mb-5 mt-2'}>
								<Contacts
									title={'Контакты'}
									contacts={[
										// {
										// 	label: 'Почта',
										// 	value: 'sh@rdds.u',
										// link: `mailto:${info?.contactPerson?.ema}`
										// },
										{
											label: 'Телефон',
											value: info?.contactPerson?.phone,
										},
									]}
								/></div> : ''}
					</div>
					{/*<Contacts title={*/}
					{/*	'QR код'*/}
					{/*} arrow>*/}
					{/*	 EXAMPLE PROTECT */}
					{/*	<Protect authorized min_role={{*/}
					{/*		role: roles[1],*/}
					{/*		eventId: id*/}
					{/*	}}>*/}

					{/*</Protect>*/}
					{/*</Contacts>*/}

				</div>

			</SingleEvent>
			{!info?.requestId && info?.status !== 'COMPLETED' ?
				<div className={'position-fixed gradient w-100 bottom-0'}>
					<div className={'w-100 py-3 px-3'}>
						<div className="d-flex bd-highlight container-md">
							<Button
								classNames="w-100 bd-highlight"
								variant="orng"
								htmlType="submit"
								onClick={async () => {
									await push(`/single/create_request/${id}`)
									await dp(actions.event.clearAll())
								}}
							>
								<Typography type={'p1sb'} color={'white'}>
									Записаться на событие
								</Typography>
							</Button>
						</div>
					</div>
				</div> : ''}
		</>
	)
}

export default SingleConference
