import fp from 'lodash/fp'

export const create_action = (type) => Object.assign(
	($payload) => {
		console.log(type, $payload)
		return ({type, $payload})
	},
	{
		toString: () => type,
	},
)

export const create_action_namespace = (namespace) => (type) => create_action(`${namespace}/${type}`)


const unfoldReducer = fp.pipe(
	fp.mapValues(s => fp.isFunction(s) ? s : unfoldReducer(s))
)

