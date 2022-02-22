import fp from 'lodash/fp'

import {actions} from './actions'


export const init_state = {
	modal: {
		type: null,
		callback: () => (''),
		message: null,
		background: null,
		icon: null,
		addition: {
			filters: () => (''),
			description: null,
			link: '/',
			btn_text: null
		}
	},
	filters: {
		search: '',
		sort: 'ASC',
		gte: '2000-01-01T00:00:00.000Z',
		lte: '2200-01-01T00:00:00.000Z'
	},
	users: [],
}

export const reducer = {
	[`${actions.ex}`]: (state) => {
		return {...state}
	},
	[`${actions.setFilters}`]: (state, payload) => {
		return fp.merge(
			state,
			{
				filters: {
					...payload
				}
			})
	},
	[`${actions.clearFilter}`]: (state) => {
		return {
			...state,
			...{
				filters: {
					...init_state.filters,
				}
			}
		}
	},
	[`${actions.setUsers}`]: (state, users) => {
		return {
			...state,
			users: fp.unionBy('node.id', users, state.users)
		}
	},
	[`${actions.showModal}`]: (state, payload) =>
		fp.merge(
			state,
			{
				modal: payload
			}
		),
	[`${actions.hideModal}`]: (state, callArgs) => {
		try {
			state.modal.callback(callArgs)
			return (fp.merge(
				state,
				{
					modal: init_state.modal
				}
			))
		} catch (e) {
			console.log(e)
			return state
		}
	},
}
