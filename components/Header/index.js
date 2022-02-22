import { ArrowDown, ArrowLeft, Bell, Cross, ExitIcon, Lens, SmallLogo, User } from '../icons'
import styles from './s.module.scss'
import { Typography } from '../Typography'
import { useEffect, useRef, useState } from 'react'
import { useOnClickOutside } from '../../lib/hooks/useOnClickOutside'
import { Button } from '../Button'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from '../GeneralCtx'
import { store as main_store } from '../../lib/store/main'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { Dropdown } from '../Dropdown'
import {admin_role, Protect} from '../Protect'
import Link from 'next/link'
import { useCookie } from '../../lib/hooks/useCookie'
import {useLazyQuery, useQuery} from '@apollo/client'
import GET_SELF from '../../lib/apollo/schemas/user/get_self.graphql'
import GET_NOTIFICATIONS_BY_USERID from '../../lib/apollo/schemas/notifications/get_notification_by_userId.graphql'
import {NotificationCard} from '../NotificationCard'
import moment from 'moment'
import {DropdownNotifications} from '../DropdownNotifications'
import {actions} from '../../lib/store'

export const Header = ({
	children,
	className = '',
	search = false,
	title = null,
	left = null,
	right = null,
	openSearch = false,
	filters = false,
}) => {

	const dp = useDispatch()

	const {firstName, lastName} = useSelector('profile')

	const headerRef = useRef(null)

	const {push} = useRouter()
	const cookie = useCookie()

	const [isSearch, setIsSearch] = useState(openSearch)

	const {register, handleSubmit, getValues, watch} = useForm({
		defaultValues: {
			search: ''
		}
	})

	const {data: dataUser, loading: loadingUser} = useQuery(GET_SELF)
	const [LoadLookNotificatinos,{data: dataLookNotifications}] = useLazyQuery(GET_NOTIFICATIONS_BY_USERID, {
		errorPolicy: 'ignore'
	})
	const [LoadUnlookNotificatinos,{data: dataUnlookNotifications}] = useLazyQuery(GET_NOTIFICATIONS_BY_USERID, {
		errorPolicy: 'ignore'
	})


	useEffect(async() => {
		if (dataUser && !loadingUser) {
			await LoadLookNotificatinos({
				variables:{
					userId: dataUser.infoByCurrentAccount.value.id,
					status: 'LOOK',
					type: 'YOUR',
				}
			})
		}
	},[dataUser, loadingUser])
	useEffect(async() => {
		if (dataUser && !loadingUser) {
			await LoadUnlookNotificatinos({
				variables:{
					userId: dataUser.infoByCurrentAccount.value.id,
					status: 'UNLOOK',
					type: 'YOUR',
				}
			})
		}
	},[dataUser, loadingUser])

	const setSearch = data => {
		dp(main_store.actions.setFilters(data))
	}

	useEffect(() => {
		const ss = watch((s, v) => (setSearch({search: s[v.name]})))
		return () => ss.unsubscribe()
	}, [watch])

	useOnClickOutside(headerRef, () => {
		setIsSearch(false)
	})

	return (
		<>
			<form
				onSubmit={handleSubmit(setSearch)}
				ref={headerRef}
				className={clsx('d-md-none d-flex justify-content-between mx-3 my-2 align-items-center', className)}>
				{isSearch ? (
					<>
						<div onClick={() => setIsSearch(false)}>
							<ArrowLeft/>
						</div>
						<div className={'w-100 px-1'}>
							<input
								className={styles.input}
								placeholder={'Поиск'}
								{...register('search')}
							/>
						</div>

						{filters ? '' : (
							<Button
								htmlType={'reset'}
								onClick={() => setIsSearch(getValues('search').length || getValues('search').length > 0)}
								classNames={'m-0 p-0'}>
								<Cross/>
							</Button>
						)}
					</>
				) : (
					<>
						{left}
						<Typography type={'t1'} classNames={'my-2'}>
							{title}
						</Typography>
						{search ? (
							<div className={'d-flex align-content-around'}>
								<div className={'me-2'}>{right}</div>
								<div onClick={() => setIsSearch(true)}>
									<Lens/>
								</div>
							</div>
						) : right}
					</>
				)}
			</form>
			<div className={'d-none d-md-flex justify-content-between px-5 bg-white py-2 align-items-center'}>
				<div className={'d-flex align-items-center my-2'}>
					<div onClick={() => push('/')} style={{cursor: 'pointer'}}>
						<SmallLogo/>
					</div>
					<div className={'mx-4 rounded border border-1 px-2 py-1 bg-lght d-flex align-items-center'}>
						<Lens color={'gry'}/>
						<input className={styles.input} placeholder={'Поиск'} {...register('search_desktop')}/>
					</div>
					<Protect min_role={admin_role}>
						<Button variant={'orng'} onClick={async () => {
							await dp(actions.event.clearAll())
							await push('/create_event')
						}}>
							Добавить событие
						</Button>
					</Protect>
				</div>
				<div className={'d-flex align-items-center justify-content-between'}>
					<Protect
						authorized
						fallback={
							<Link href={'/auth'}>
								<a href={'/auth'} className={'d-flex justify-content-center align-items-center'}>
									<Button variant={'orng'}>
										Войти в систему
									</Button>
								</a>
							</Link>
						}>
						<DropdownNotifications
							color={'blck'}
							variant={'wht'}
							actions={[
								{
									name: <div>
										<div className={'container-md'}>

											{dataUnlookNotifications?.notification?.edges[0] ?
												<Typography type={'p2sb'} color={'gry'}>
													{dataUnlookNotifications?.notification?.edges.length} новых
												</Typography> : ''
											}

											{dataUnlookNotifications?.notification?.edges[0] ? dataUnlookNotifications.notification.edges.map((key, index) => (
												<div key={String(index)}>
													<NotificationCard title={key.node.header} date={moment(key.node.date).format('MM-DD-YYYY')} text={key.node.body} link={`${new URL(process.env.NEXT_PUBLIC_BASE_API).origin}${key.node.link}`}/>
												</div>
											)) : ''
											}

											{dataLookNotifications ?
												<Typography type={'p2sb'} color={'gry'}>
													Прочитанные
												</Typography> : ''
											}

											{dataLookNotifications ? dataLookNotifications.notification.edges.map((key, index) => (
												<div key={String(index)}>
													<NotificationCard title={key.node.header} date={moment(key.node.date).format('MM-DD-YYYY')} text={key.node.body} link={`${new URL(process.env.NEXT_PUBLIC_BASE_API).origin}${key.node.link}`}/>
												</div>
											)) : ''
											}

											{dataLookNotifications ? dataLookNotifications.notification.edges.map((key, index) => (
												<div key={String(index)}>
													<NotificationCard title={key.node.header} date={moment(key.node.date).format('MM-DD-YYYY')} text={key.node.body} link={`${new URL(process.env.NEXT_PUBLIC_BASE_API).origin}${key.node.link}`}/>
												</div>
											)) : ''
											}

										</div>
									</div>,
								}
							]}
						>
							<div className={'pb-1'}>
								<Bell/>
							</div>
						</DropdownNotifications>

						<Dropdown
							color={'blck'}
							variant={'wht'}
							actions={[
								{
									icon: <User color={'orng'}/>,
									name: 'Профиль',
									callback: async () => await push('/personal/settings'),
								},
								{
									icon: <ExitIcon color={'orng'}/>,
									name: 'Выйти',
									callback: async () => {
										await cookie.remove('access_token')
										window.location.href = '/'
									},
								},
							]}
						>
							{`${firstName} ${lastName}`}
							<ArrowDown color={'orng'}/>
						</Dropdown>
					</Protect>
				</div>
			</div>
			<div className='ms-auto me-auto' style={{ maxWidth: '1920px'}}>
				{children}
			</div>
		</>
	)
}
