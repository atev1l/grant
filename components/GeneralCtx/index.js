import React, { useContext, useReducer } from 'react'
import { reducer, init_state } from '../../lib/store'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../../lib/apollo'
import fp from 'lodash/fp'

const GenCtx = React.createContext(undefined, undefined)


export const useSelector = path => {
	return fp.get(path, useContext(GenCtx).state)
}

export const useDispatch = () => {
	return useContext(GenCtx).dp
}

export const useData = () => {
	return useContext(GenCtx)
}


export const Provider = ({children, props, ext}) => {

	const [state, dp] = useReducer(reducer, fp.merge(init_state, ext))

	const client = useApollo(props, ext.profile.token)

	return (
		<GenCtx.Provider value={{state, dp}}>
			<ApolloProvider client={client}>
				{children}
			</ApolloProvider>
		</GenCtx.Provider>
	)
}
