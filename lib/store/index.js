import { store as main_store } from './main/index'
import { store as profile } from './profile/index'
import { store as event } from './event/index'
import { store as request } from './request/index'

export const actions = {
	[`${main_store.namespace}`]: main_store.actions,
	[`${profile.namespace}`]: profile.actions,
	[`${event.namespace}`]: event.actions,
	[`${request.namespace}`]: request.actions,
}

export const init_state = {
	[`${main_store.namespace}`]: main_store.init_state,
	[`${profile.namespace}`]: profile.init_state,
	[`${event.namespace}`]: event.init_state,
	[`${request.namespace}`]: request.init_state,
}

export const reducer = (state, action) => {
	const namespace = action.type.split('/')[0]
	const r = {
		...main_store.reducer,
		...profile.reducer,
		...event.reducer,
		...request.reducer,
	}
	// debugger
	return {
		...state,
		[`${namespace}`]: r[action.type](state[namespace], action.$payload),
	}
}
