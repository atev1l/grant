import {Header} from '../../../../components/Header'
import {useRouter} from 'next/router'
import {useDispatch, useSelector} from '../../../../components/GeneralCtx'
import {ArrowLeft, ArrowRight} from '../../../../components/icons'
import {GroupButtons} from '../../../../components/GroupButtons'
import {Epic} from '../../../../components/Epic'
import {Organizer} from '../../../../components/Organizer'
import {store as main_store} from '../../../../lib/store/main'
import {types} from '../../../../components/Modal'
import {Block} from '../../../../components/Block'
import {Button} from '../../../../components/Button'
import GET_ALL_USERS_INFO from '../../../../lib/apollo/schemas/get_all_users_info.graphql'
import {useQuery} from '@apollo/client'
import React, {useEffect} from 'react'
import {actions} from '../../../../lib/store'
import {useViewportScroll} from 'framer-motion'
import SEARCH_BY_USERS from '../../../../lib/apollo/schemas/search_by_users.graphql'
import {OrganizerCardPc} from '../../../../components/OrganizerCardPc'
import {Typography} from '../../../../components/Typography'

export const SetOrgs = () => {

	const dp = useDispatch()

	const {scrollYProgress} = useViewportScroll()


	const {back} = useRouter()
	const filters = useSelector('main.filters')
	const {data, fetchMore, loading: allUsers} = useQuery(SEARCH_BY_USERS, {
		variables:{
			...filters,
			search: filters?.search?.toLowerCase() ? filters.search?.toLowerCase() : ' ',
		},
		onCompleted: (data) => dp(actions.main.setUsers(data.searchUserInfos.edges))
	})

	useEffect(() => {
		const unsubscribeScroll = scrollYProgress.onChange(async num => {
			if (!allUsers && data.searchUserInfos.pageInfo.hasNextPage && num > 0.5) {
				await fetchMore({
					query: GET_ALL_USERS_INFO,
					variables: {
						cursor: data.searchUserInfos.pageInfo.endCursor
					},
				})
			}
		})
		return () => {
			unsubscribeScroll()
		}
	}, [data])

	return (<>
		<Header
			title={'Участники'}
			search
			left={
				<div className={'d-flex'}>
					<div onClick={() => back()}>
						<ArrowLeft/>
					</div>
				</div>}

		>
			<div className='d-none d-md-flex justify-content-center mt-3 mb-1'>
				<Typography type={'p1sb'} color={'gry'}>
					Не нашли организатора? Воспользуйтесь поиском.
				</Typography>
			</div>
			<div className="px-3 container" style={{maxWidth: '960px'}}>
				<div className={'mt-3'}>
					<GroupButtons tabs={[
						{
							path: '/single/conf/register_organizer',
							name: 'Последнее'
						}
					]}/>
				</div>
			</div>
		</Header>
		<div className={'d-flex px-3 flex-column container'} style={{maxWidth: '960px'}}>

			{!allUsers && data?.searchUserInfos?.edges.map(({node}) =>
				<div key={node.id} onClick={() => dp(main_store.actions.showModal({
					type: types.Popup,
					addition: {
						description:
							<div>
								<Block label={'ФИО'} value={node.profile?.firstName + ' ' + node.profile?.lastName + ' ' + node.profile?.patronymic}/>
								<Block label={'Телефон'} value={node.profile?.phone}/>
								<Block label={'Почта'} value={node.email}/>
								<Block label={'Город'} value={node.profile?.city}/>
								<Block label={'Организация'} value={node.profile?.organization} line={false}/>
								<div className='d-flex flex-column justify-content-center align-items-center'>
									<Button variant="orng" classNames='d-flex w-100 mt-3' onClick={ async () => {
										dp(actions.event.setOrg(node.id))
										dp(actions.request.setCoAuthor(node.id))
										dp(main_store.actions.hideModal())
										back()
									}
									}>
										Назначить организатором
									</Button>
								</div>
							</div>,
					},
				}))}>
					<div className='d-md-none'>
						<Organizer key={node.id} label={node.profile?.firstName + ' ' + node.profile?.lastName + ' ' + node.profile?.patronymic} value={<ArrowRight/>}/>
					</div>
					<div className='d-none d-md-flex'>
						<OrganizerCardPc key={node.id} label={node.profile?.firstName + ' ' + node.profile?.lastName + ' ' + node.profile?.patronymic} value={<ArrowRight/>}/>
					</div>
				</div>
			)}
		</div>


		<Epic/>
	</>)
}
export default SetOrgs

