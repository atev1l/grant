import {actions} from './actions'
import fp from 'lodash/fp'

export const init_state = {
	token: null,
	email: '',
	pass: '',
	firstName: '',
	lastName: '',
	patronymic: '',
	city: '',
	organization: '',
	phone: '',
	roles: [],
}

export const reducer = {
	[actions.auth]: (state, token) => {
		return {
			...state,
			token
		}
	},
	[actions.addProfileInfo]: (state, payload) => {
		return fp.merge(
			state,
			payload
		)
	}
}
