import {actions} from './actions'
import fp from 'lodash/fp'

export const init_state = {
	coAuthors: []
}

export const reducer = {
	[`${actions.saveAll}`]: (state, payload) => {
		return fp.merge(state, payload)
	},
	[`${actions.setCoAuthor}`]: (state, payload) => {
		return fp.merge(
			state,
			{
				coAuthors: [...state.coAuthors, payload]
			}
		)
	},
	[`${actions.removeElementFromCoAuthors}`]: (state, payload) => {
		return {
			...state,
			coAuthors: fp.remove(function (n) {
				return payload === n
			}, state.coAuthors)
		}
	},
	[`${actions.clearAll}`]: () => {
		return init_state
	}

}
