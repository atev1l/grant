import { create_action_namespace } from '../utils'


const main = create_action_namespace('main')


export const actions = {
	ex: main('EX'),
	setFilters: main('SET_SEARCH'),
	clearFilter: main('CLEAR_FILTER'),
	showModal: main('SHOW_MODAL'),
	hideModal: main('HIDE_MODAL'),
	setUsers: main('SET_FUCKING_USERS')
}
