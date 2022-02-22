import { gql, useMutation, ApolloClient, InMemoryCache } from '@apollo/client'
import { createUploadLink } from 'apollo-upload-client'
import { useCookie } from '../lib/hooks/useCookie'

const MUTATION = gql`
    mutation ($file: Upload!) {
        uploadFile(input: {
            file: $file
        }) {
            value {
				id
                relativePath
			}
            errors {
            	message
            }
        }
    }
`

export default function UploadFile() {

	const cookie = useCookie()

	const client = new ApolloClient({
		link: createUploadLink({
			uri: process.env.NEXT_PUBLIC_BASE_API,
			headers: {
				authorization: `Bearer ${cookie.get('access_token')}`
			}
		}),
		cache: new InMemoryCache()
	})

	const [mutate] = useMutation(MUTATION, {
		client
	})

	function onChange({
		target: {
			validity,
			files: [file],
		},
	}) {
		if (validity.valid) mutate({variables: {file}})
	}

	return <input type="file" required onChange={onChange}/>
}
