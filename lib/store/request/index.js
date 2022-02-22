import { actions } from './actions'
import { reducer, init_state } from './reducer'


export const store = {
	namespace: 'request',
	reducer,
	init_state,
	actions
}
