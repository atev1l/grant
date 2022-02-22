import { create_action_namespace } from '../utils'

const profile = create_action_namespace('profile')

export const actions = {
	auth: profile('AUTH'),
	addProfileInfo: profile('ADD_INFO'),
}
