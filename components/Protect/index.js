import { useQuery } from '@apollo/client'
import GET_CURRENT_ROLES from '../../lib/apollo/schemas/user/current_roles.graphql'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from '../GeneralCtx'
import { actions } from '../../lib/store'
import fp from 'lodash/fp'


export const admin_role = {
	eventId: null,
	role: 'Admin',
	__typename: 'RoleModel'
}


export const Protect = ({children, authorized = false, min_role, fallback = null}) => {

	const dp = useDispatch()
	const {roles, token} = useSelector('profile')

	const [isBlocked, setIsBlocked] = useState(true)

	const {data, loading, called, error, refetch} = useQuery(GET_CURRENT_ROLES, {
		onError: () => token && refetch(),
		onCompleted: ({infoByCurrentAccount: {value}}) => {
			dp(actions.profile.addProfileInfo(value))
			dp(actions.profile.addProfileInfo(value?.profile))
		}
	})

	useEffect(() => {
		if (token && called && !loading && !error && roles?.length > 0 && fp.getOr(0, 'infoByCurrentAccount.value.roles.length', data) > 0) {
			setIsBlocked(() => {
				if (!authorized)
					return fp.isUndefined(fp.find(admin_role, roles)) && fp.isUndefined(fp.find(min_role, roles))
				return isBlocked
			})
		}
	}, [called, loading, data, roles, token, error])

	useEffect(() => {
		if (authorized){
			setIsBlocked(fp.isEmpty(token))
		}
	}, [authorized, token])

	return (isBlocked ? fallback : children)
}
