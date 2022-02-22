import {actions} from './actions'
import fp from 'lodash/fp'
import moment from 'moment'

export const init_state = {
	title: '',
	description: '',
	status: 'RECEPTION',
	organizers: [],
	contactPerson: '',
	pincode: null,
	newOrganizers: [],
	coverImageId: null,
	setRelativePathImage: false,
	scheduledTo: moment().format('YYYY-MM-DDTHH:mm'),
	estimateTo: moment().format('YYYY-MM-DDTHH:mm'),
	documents: [],
	editEvent: false,
	userId: ''
}

export const reducer = {
	[`${actions.gavgav}`]: (state, payload) => {
		return fp.merge(state, payload)
	},
	[`${actions.setOrg}`]: (state, payload) => {
		return fp.merge(
			state,
			{
				organizers: [...state.organizers, payload]
			}
		)
	},
	[`${actions.uploadDocs}`]: (state, payload) => {
		return fp.merge(
			state,
			{
				documents: [...state.documents, payload]
			}
		)
	},

	[`${actions.removeElementFromDocs}`]: (state, payload) => {

		return {
			...state,
			documents: fp.remove(function (n) {
				return payload === n.id
			}, state.documents)
		}
	},

	[`${actions.removeElementFromOrganizers}`]: (state, payload) => {
		return {
			...state,
			organizers: fp.remove(function (n) {
				return payload === n
			}, state.organizers)
		}
	},

	[`${actions.removeElementFromContactPerson}`]: (state, payload) => {
		console.log(payload)
		return {
			...state,
			contactPerson: null
		}
	},

	[`${actions.setContactPerson}`]: (state, payload) => {
		return fp.merge(
			state,
			{
				contactPerson: payload
			}
		)
	},
	[`${actions.setRelativePathImage}`]: (state, payload) => {
		return fp.merge(
			state,
			{
				setRelativePathImage: payload
			}
		)
	},
	[`${actions.uploadFile}`]: (state, payload) => {
		return fp.merge(
			state,
			{
				coverImageId: payload
			}
		)
	},
	[`${actions.clearAll}`]: () => {
		return init_state
	},
	[`${actions.editEvent}`]: (state, payload) => {
		return fp.merge(
			state,
			{
				editEvent: payload
			}
		)
	}
}
