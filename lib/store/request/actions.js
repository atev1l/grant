import { create_action_namespace } from '../utils'

const request = create_action_namespace('request')

export const actions = {
	saveAll: request('saveAll'),
	clearAll: request('clearAll'),
	setCoAuthor: request('setCoAuthor'),
	removeElementFromCoAuthors: request('removeElementFromCoAuthors'),

}






