import {Header} from '../../components/Header'
import moment from 'moment'
import {useRouter} from 'next/router'
import {ArrowLeft} from '../../components/icons'
import {useLazyQuery, useQuery} from '@apollo/client'
import GET_NOTIFICATIONS_BY_USERID from '../../lib/apollo/schemas/notifications/get_notification_by_userId.graphql'
import {useEffect} from 'react'
import {Epic} from '../../components/Epic'
import {NotificationCard} from '../../components/NotificationCard'
import GET_SELF from '../../lib/apollo/schemas/user/get_self.graphql'
import {Typography} from '../../components/Typography'

export const Notifications = () => {

	const {back} = useRouter()
	const {data: dataUser, loading: loadingUser} = useQuery(GET_SELF)
	const [LoadLookNotificatinos,{data: dataLookNotifications}] = useLazyQuery(GET_NOTIFICATIONS_BY_USERID)
	const [LoadUnlookNotificatinos,{data: dataUnlookNotifications}] = useLazyQuery(GET_NOTIFICATIONS_BY_USERID)


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

	return (<>
		<Header
			title={'Уведомления'}
			right={<div />}
			left={
				<div className={'d-flex'}>
					<div onClick={() => back()}>
						<ArrowLeft/>
					</div>
				</div>
			}
		>
			<div className={'mx-3 ms-auto me-auto'} style={{maxWidth: '700px'}}>
				<div className={'container-md'}>

					{dataUnlookNotifications?.notification?.edges[0] ?
						<Typography type={'p2sb'} color={'gry'}>
							{dataUnlookNotifications?.notification?.edges.length} новых
						</Typography> : ''
					}

					{dataUnlookNotifications?.notification?.edges[0] ? dataUnlookNotifications.notification.edges.map(key => (
						<div key={key.id}>
							<NotificationCard title={key.node.header} date={moment(key.node.date).format('MM-DD-YYYY')} text={key.node.body} link={`${new URL(process.env.NEXT_PUBLIC_BASE_API).origin}${key.node.link}`}/>
						</div>
					)) : ''
					}

					{dataLookNotifications ?
						<Typography type={'p2sb'} color={'gry'}>
							Прочитанные
						</Typography> : ''
					}

					{dataLookNotifications ? dataLookNotifications.notification.edges.map(key => (
						<div key={key.id}>
							<NotificationCard title={key.node.header} date={moment(key.node.date).format('MM-DD-YYYY')} text={key.node.body} link={`${new URL(process.env.NEXT_PUBLIC_BASE_API).origin}${key.node.link}`}/>
						</div>
					)) : ''
					}

					{dataLookNotifications ? dataLookNotifications.notification.edges.map(key => (
						<div key={key.id}>
							<NotificationCard title={key.node.header} date={moment(key.node.date).format('MM-DD-YYYY')} text={key.node.body} link={`${new URL(process.env.NEXT_PUBLIC_BASE_API).origin}${key.node.link}`}/>
						</div>
					)) : ''
					}

				</div>
			</div>
			<Epic/>
		</Header>
	</>)
}
export default Notifications
