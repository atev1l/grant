import {Header} from '../../../../components/Header'


import {types} from '../../../../components/Modal'

import {useRouter} from 'next/router'
import {useDispatch} from '../../../../components/GeneralCtx'
import {ArrowLeft, Filter} from '../../../../components/icons'
import {store as main_store} from '../../../../lib/store/main'
import {GroupButtons} from '../../../../components/GroupButtons'

export const Id = () => {

	// const {push} = useRouter()

	const dp = useDispatch()

	const {back, query: {id}} = useRouter()


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
				</div>}

		>
			<div className={'mx-3 mt-3'}>
				<GroupButtons type={'asPath'} tabs={[{
					path: `/single/conf/members_search/${id}`,
					name: 'Участники'
				},
				{
					path: `/single/conf/documents/${id}`,
					name: 'Документы'
				}
				]}/>
			</div>

		</Header>


	</>)
}
export default Id
