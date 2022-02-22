import clsx from 'clsx'
import {CircleCross} from '../icons'
import {actions} from '../../lib/store'
import { useDispatch, useSelector } from '../GeneralCtx'
import {Typography} from '../Typography'
import { useState } from 'react'
import fp from 'lodash/fp'


export const SelectCardOrgByEvent = ({
	name,
	color='blck',
	contactPerson = false
}) => {
	const user = useSelector('main.users')
	const [fullname] = useState(() => fp.find({node: { id: name }}, user))
	const dp = useDispatch()

	return (
		<div className={clsx('px-2 text-white d-flex align-items-center')}>
			<Typography type={'p3sb'} color={color}>
				{`${fp.get('node.profile.firstName', fullname)} ${fp.get('node.profile.lastName', fullname)}`}
			</Typography>
			<div className={'ps-2 pb-1'} style={{cursor: 'pointer'}} onClick={() => {
				{contactPerson ? dp(actions.event.removeElementFromContactPerson(name)) : dp(actions.event.removeElementFromOrganizers(name))}
			}}>
				{contactPerson ? '' : <CircleCross />}
			</div>
		</div>

	)
}
