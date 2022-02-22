import {Header} from '../../../components/Header'
import {useRouter} from 'next/router'
import {useDispatch, useSelector} from '../../../components/GeneralCtx'
import {ArrowLeft, ArrowRight} from '../../../components/icons'
import {Epic} from '../../../components/Epic'
import GET_ALL_USERS_INFO from '../../../lib/apollo/schemas/search_by_users.graphql'
import {useQuery} from '@apollo/client'
import React from 'react'
import {actions} from '../../../lib/store'
import {store as main_store} from '../../../lib/store/main'
import {types} from '../../../components/Modal'
import {Block} from '../../../components/Block'
import {Button} from '../../../components/Button'
import {Organizer} from '../../../components/Organizer'
import {OrganizerCardPc} from '../../../components/OrganizerCardPc'
import {Typography} from '../../../components/Typography'
import {GroupButtons} from '../../../components/GroupButtons'

export const setContactPerson = () => {

	const dp = useDispatch()

	const {back} = useRouter()
	const filters = useSelector('main.filters')

	const {data, loading: allUsers} = useQuery(GET_ALL_USERS_INFO, {
		variables:{
			...filters,
			search: filters?.search?.toLowerCase() ? filters.search?.toLowerCase() : ' ',
		}
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
				</div>}

		>
			<div className='d-none d-md-flex justify-content-center mt-3 mb-1'>
				<Typography type={'p1sb'} color={'gry'}>
					Не нашли контактное лицо? Воспользуйтесь поиском.
				</Typography>
			</div>
			<div className="px-3 container" style={{maxWidth: '960px'}}>
				<div className={'mt-3'}>
					<GroupButtons tabs={[
						{
							path: '/create_event/choice_contact_person',
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
										dp(actions.event.setContactPerson(node.id))
										dp(main_store.actions.hideModal())
										back()
									}
									}>
										Назначить контактным лицом
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
export default setContactPerson

