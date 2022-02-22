import {Header} from '../../../../components/Header'
import {useRouter} from 'next/router'
import {useDispatch, useSelector} from '../../../../components/GeneralCtx'
import {ArrowLeft, ArrowRight, Lens} from '../../../../components/icons'
import {GroupButtons} from '../../../../components/GroupButtons'
import {Epic} from '../../../../components/Epic'
import {Organizer} from '../../../../components/Organizer'
import {store as main_store} from '../../../../lib/store/main'
import {types} from '../../../../components/Modal'
import {Block} from '../../../../components/Block'
import {Button} from '../../../../components/Button'
import GET_ALL_USERS_INFO from '../../../../lib/apollo/schemas/search_by_users.graphql'
import {useQuery} from '@apollo/client'
import React, {useEffect} from 'react'
import {actions} from '../../../../lib/store'
import {useViewportScroll} from 'framer-motion'
import {OrganizerCardPc} from '../../../../components/OrganizerCardPc'

export const Coauthors = () => {

	const dp = useDispatch()

	const {scrollYProgress} = useViewportScroll()

	const {push} = useRouter()

	const {back, query: {id}} = useRouter()

	const filters = useSelector('main.filters')

	const {data, fetchMore, loading: allUsers} = useQuery(GET_ALL_USERS_INFO, {
		variables:{
			...filters,
			search: filters?.search?.toLowerCase() ? filters.search?.toLowerCase() : ' ',
		}
	})

	useEffect(() => {
		const unsubscribeScroll = scrollYProgress.onChange(async num => {
			if (!allUsers && data.searchUserInfos.pageInfo.hasNextPage && num > 0.5) {
				await fetchMore({
					query: GET_ALL_USERS_INFO,
					variables: {
						cursor: data.usersInfo.pageInfo.endCursor
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
			right={
				<div onClick={() => push(`/single/conf/members_search/${id}`)}>
					<Lens/>
				</div>}
			left={
				<div className={'d-flex'}>
					<div onClick={() => back()}>
						<ArrowLeft/>
					</div>
				</div>}

		>
			<div className="mx-3 ms-auto me-auto	" style={{maxWidth: '700px'}}>
				<div className={'mt-3'}>
					<GroupButtons tabs={[
						{
							path: '/single/create_request/coauthors',
							name: 'Последнее'
						}
					]}/>
				</div>
			</div>
		</Header>
		<div className={'mt-3 d-flex me-auto ms-auto flex-column'} style={{height: '101vh', maxWidth: '700px'}}>

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
										dp(actions.request.setCoAuthor(node.id))
										dp(main_store.actions.hideModal())
										back()
									}
									}>
										Добавить соавтора
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
export default Coauthors
