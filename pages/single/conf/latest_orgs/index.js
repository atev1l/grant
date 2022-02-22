import {Header} from '../../../../components/Header'

import {useRouter} from 'next/router'
import {ArrowLeft, Lens} from '../../../../components/icons'
import {GroupButtons} from '../../../../components/GroupButtons'
import {Epic} from '../../../../components/Epic'

export const SetLatestOrgs = () => {

	const {push} = useRouter()

	const {back} = useRouter()


	return (<>
		<Header
			title={'Участники'}
			right={
				<div onClick={() => push('/single/conf/members_search')}>
					<Lens/>
				</div>}
			left={
				<div className={'d-flex'}>

					<div onClick={() => back()}>
						<ArrowLeft/>
					</div>
				</div>}

		>
			<div className="mx-3 ms-auto me-auto" style={{maxWidth: '960px'}}>
				<div className={'mt-3'}>
					<GroupButtons tabs={[{
						path: '/single/conf/register_organizer',
						name: 'По алфавиту'
					},
					{
						path: '/single/conf/latest_orgs',
						name: 'Последнее'
					}
					]}/>
				</div>
			</div>
		</Header>

		<Epic/>
	</>)
}
export default SetLatestOrgs
