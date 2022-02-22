import { useDispatch } from '../../GeneralCtx'
import { Header } from '../../Header'
import { store as main_store } from '../../../lib/store/main'
import { types } from '../../Modal'
import { Bell, Filter } from '../../icons'
import { Epic } from '../../Epic'
import { GroupButtons } from '../../GroupButtons'
import { Select } from '../../Select'
import { CalendarInput } from '../../CalendarInput'
import { statusEvent } from '../../../lib/consts'
import fp from 'lodash/fp'

export const PersonalEvents = ({children}) => {
	const dp = useDispatch()

	return (<>
		<Header
			title={'Мои события'}
			search
			right={
				<div className={'me-2'}>
					<>
						<Bell/>
					</>
				</div>
			}
			left={
				<div className={'d-flex'}>
					<div onClick={() => dp(main_store.actions.showModal({
						type: types.BottomFilter,
						addition: {
							filters: (control) => (
								<>
									<Select
										className={'my-3'}
										control={control}
										name="sort"
										label={'Сортировка'}
										list={new Map([['DESC', 'Сначала новые'], ['ASC', 'Сначала старые']])}
									/>
									<Select
										className={'my-3'}
										control={control}
										name="status"
										label={'Статус'}
										list={new Map([['all', 'Все'],
											...fp.keys(statusEvent).map((key) => [key, statusEvent[key]])
										])}
									/>
									<CalendarInput
										control={control}
										placeholders={['gte', 'lte']}
										names={['gte', 'lte']}
										openDirection={'up'}
									/>
								</>
							)
						}
					}))}>
						<Filter/>
					</div>
					<div className={'ms-4'}>

					</div>
				</div>}
		>
			<div className={'mx-3 mt-3'}>
				<GroupButtons className={'mb-3 d-md-none'} tabs={[
					{
						path: '/personal/events',
						name: 'Запись'
					}, {
						path: '/personal/moderation',
						name: 'Курируемые'
					},
				]}/>
				{children}
			</div>
			<Epic/>
		</Header>
	</>)
}
