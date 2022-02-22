import {Header} from '../../Header'
import {ArrowLeft, Invite, Pencil, ThreeDots, User} from '../../icons'
import {useRouter} from 'next/router'
import {Dropdown} from '../../Dropdown'
import { Loader } from '../../Loader'
import { useDispatch } from '../../GeneralCtx'
import { actions } from '../../../lib/store'

import styles from './s.module.scss'
import clsx from 'clsx'


export const SingleEvent = ({children, loading}) => {

	const {back, query: {id}, push} = useRouter()

	const dp = useDispatch()

	return (
		<Header
			title={'Событие'}
			right={(
				<div>
					<Dropdown
						icon={
							<>
								<ThreeDots/>
							</>
						}
						actions={[
							{
								icon: <Invite color={'orng'}/>,
								name: 'Заявки участников',
								callback: async () => await push(`/single/conf/approved_requests/${id}`),
							},
							{
								icon: <Pencil color={'orng'}/>,
								name: 'Редактировать',
								callback: async () => push(`/create_event/${id}`),
							},
							{
								icon: <User color={'orng'}/>,
								name: 'Участники и материалы',
								callback: async () => push(`/single/conf/statistic/${id}`),
							}
						]}/>

				</div>
			)}

			left={(
				<div onClick={() => {
					dp(actions.main.hideModal())
					back()
				}}>
					<ArrowLeft/>
				</div>
			)}>
			<div className="mx-1 mt-3 mb-5 pb-5">
				<div className={clsx('container-md', styles.containerPaddings)}>
					{!loading ? children : <Loader />}
				</div>
			</div>
		</Header>
	)
}
