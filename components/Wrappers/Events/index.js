import { Header } from '../../Header'
import {Filter, Notification, Plus} from '../../icons'
import { useDispatch } from '../../GeneralCtx'
import { store as main_store } from '../../../lib/store/main'
import { types } from '../../Modal'
import { Epic } from '../../Epic'
import { Button } from '../../Button'
import { useRouter } from 'next/router'
import { Select } from '../../Select'
import { admin_role, Protect } from '../../Protect'
import { CalendarInput } from '../../CalendarInput'

export const Events = ({children, addEvent = true, setSearch= false, title='События', hideFilters=false, notifications=true}) => {

	const dp = useDispatch()

	const {push} = useRouter()

	return (<>
		<Header
			title={title}
			search
			openSearch = {setSearch}
			right={<div onClick={async ()=> {
				await push('/notifications')
			}}><Notification /></div>}
			left={!hideFilters ? <div onClick={() => dp(main_store.actions.showModal({
				type: types.BottomFilter,
				addition: {
					filters: control => (<>
						<Select
							className={'my-3'}
							control={control}
							name="sort"
							label={'Сортировка'}
							list={new Map([['DESC', 'Сначала новые'], ['ASC', 'Сначала старые']])}/>
						<CalendarInput
							control={control}
							placeholders={['gte', 'lte']}
							names={['gte', 'lte']}
							openDirection={'up'}
						/>
					</>)
				}
			}))}>
				<Filter/>
			</div> : <div>ᅠ</div>}
		>
			<div className={'mx-3 mt-3 mb-5 pb-5'}>
				{children}
			</div>
			{addEvent &&
			<div className={'position-fixed bottom-0 mb-5 pb-4 end-0 me-3 d-md-none d-block '}>
				<Protect min_role={admin_role}>
					<Button htmlType={'button'} variant={'orng'} classNames={'px-2'} onClick={() => push('/create_event')}>
						<Plus color={'wht'}/>
					</Button>
				</Protect>
			</div>
			}
			<Epic/>
		</Header>
	</>)
}
