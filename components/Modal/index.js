import { BottomFilter } from './BottomFilter'
import { create_action_namespace } from '../../lib/store/utils'
import { useDispatch, useSelector } from '../GeneralCtx'
import { store as main_store } from '../../lib/store/main'
import { AnimateSharedLayout } from 'framer-motion'
import { Notification } from './Notification'
import { ErrorDescription } from './Additional/ErrorDescription'
import { Popup } from './Popup'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { actions } from '../../lib/store'

const modal = create_action_namespace('modal')
const notification = create_action_namespace('notification')

export const types = {
	BottomFilter: modal('BottomFilter').toString(),
	SuccessNotification: notification('SuccessNotification').toString(),
	NotificationWithDesc: notification('NotificationWithDesc').toString(),
	Popup: notification('Popup').toString()
}

const comps = {
	[`${types.BottomFilter}`]: <BottomFilter/>,
	[`${types.SuccessNotification}`]: <Notification/>,
	[`${types.NotificationWithDesc}`]: <Notification><ErrorDescription/></Notification>,
	[`${types.Popup}`]: <Popup />
}

export const Modal = () => {
	const om = useSelector(`${main_store.namespace}.modal.type`)
	const dp = useDispatch()

	const {pathname} = useRouter()
	const [prevPath, setPP] = useState(pathname)

	useEffect(() => {
		if (prevPath !== pathname) {
			dp(actions.main.hideModal())
			setPP(prevPath)
		}
	}, [pathname, prevPath])


	return (
		<AnimateSharedLayout>
			{om && comps[om]}
		</AnimateSharedLayout>
	)
}
