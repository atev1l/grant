import { create_action_namespace } from '../utils'

const event = create_action_namespace('event')

export const actions = {
	gavgav: event('setEvent'),
	setOrg: event('setOrganizres'),
	setRelativePathImage: event('setRelativePathImage'),
	setContactPerson: event('setContPerson'),
	uploadFile: event('uploadFile'),
	uploadDocs: event('uploadDocs'),
	editEvent: event('editEvent'),
	removeElementFromDocs: event('removeElementFromDocs'),
	removeElementFromOrganizers: event('removeElementFromOrganizers'),
	removeElementFromContactPerson: event('removeElementFromContactPerson'),
	clearAll: event('clearAll')
}






