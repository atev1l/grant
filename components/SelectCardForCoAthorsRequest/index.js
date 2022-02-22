import clsx from 'clsx'
import {useQuery} from '@apollo/client'
import GET_USER_BY_USER_ID from '../../lib/apollo/schemas/user/get_user_by_userId.graphql'
import {Typography} from '../Typography'
import {actions} from '../../lib/store'
import {CircleCross} from '../icons'
import {useDispatch} from '../GeneralCtx'


export const SelectCarForCoAuthorsRequest = ({
	userId,
	color='blck',
}) => {
	const dp = useDispatch()
	const {data: dataUser, loading: User} = useQuery(GET_USER_BY_USER_ID, {
		fetchPolicy: 'network-only',
		variables:{
			id: userId
		}
	})

	return (
		<div className={clsx('px-2 text-white d-flex align-items-center')}>
			<Typography type={'p3sb'} color={color}>
				{!User && dataUser ? dataUser?.usersInfo?.edges[0]?.node?.profile?.firstName + ' ' + dataUser.usersInfo.edges[0]?.node?.profile?.lastName  : ''}
			</Typography>
			<div className={'ps-2 pb-1'} style={{cursor: 'pointer'}} onClick={() => {
				{dp(actions.request.removeElementFromCoAuthors(userId))}
			}}>
				<CircleCross />
			</div>
		</div>

	)
}
