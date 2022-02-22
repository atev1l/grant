import {useRouter} from 'next/router'
import {useDispatch, useSelector} from '../../../../components/GeneralCtx'
import {store as main_store} from '../../../../lib/store/main'
// import GET_ALL_USERS_INFO from '../../../../lib/apollo/schemas/get_all_users_info.graphql'
import {useQuery} from '@apollo/client'
import React, {useEffect, useRef, useState} from 'react'
import {useForm} from 'react-hook-form'
import {useOnClickOutside} from '../../../../lib/hooks/useOnClickOutside'
import {Events} from '../../../../components/Wrappers/Events'
import SEARCH_REQUESTS from '../../../../lib/apollo/schemas/events/searchByUsersRequestByEventId.graphql'
import KOSTblL_FOR_SEARCH_BY_DOCUMENTS from '../../../../lib/apollo/schemas/events/kostbllForSearchByDocuments.graphql'
import {Document} from '../../../../components/Document'
import {Contacts} from '../../../../components/Сontacts'
import fp from 'lodash/fp'


const unin = fp.unionBy('id')
const getter = fp.getOr([],'requests.nodes')

export const Statistic = () => {

	const dp = useDispatch()
	const [result, setResult] = useState([])

	const { query: {id}} = useRouter()

	// const {data, loading: allUsers} = useQuery(GET_ALL_USERS_INFO)

	const filters = useSelector('main.filters')
	const {data: dataSearch, refetch, loading: searchLoading} = useQuery(SEARCH_REQUESTS, {
		variables: {
			eventId: id,
			talkTitle: filters.search.toLowerCase(),
			searchByDocs: filters.search.toLowerCase()
		},
		onCompleted: data => {
			setResult({...fp.merge(data?.requests?.nodes, result)})
			console.log('опа бобпта бабенка с ребенком')
			console.log(result)
		}
	})
	const {data: kostblL, refetch: kosRefetch, loading: docsLoading} = useQuery(KOSTblL_FOR_SEARCH_BY_DOCUMENTS, {
		variables: {
			eventId: id,
			talkTitle: filters.search.toLowerCase()
		},
		onCompleted: data => {
			setResult({...fp.merge(data?.requests.nodes, result)})
			console.log('опа епта бабенка с ребенком')
			console.log(result)
		}
	})

	useEffect(() => {
		if (!(docsLoading || searchLoading)) {
			const remap = unin(getter(dataSearch), getter(kostblL))
			setResult(remap)
		}
	}, [docsLoading, searchLoading])
	useEffect(async () => {
		if (result){
			console.log('RFR :T Я ЗАЕБАЛСЯ')
			console.log(result)
		}

	}, [result])

	const headerRef = useRef(null)

	const [ setIsSearch] = useState(false)

	const { getValues, watch} = useForm({
		defaultValues: {
			search: ''
		}
	})

	const setSearch = data => {
		dp(main_store.actions.setFilters(data))
	}

	useEffect(() => setSearch(getValues()), [watch('search')])

	useOnClickOutside(headerRef, () => {
		setIsSearch(false)
	})

	useEffect(async () => {
		await refetch()
		await kosRefetch()
	}, [filters])

	return (<>
		<Events setSearch={true} title={'Участники и материалы'} hideFilters>
			<div className={'container-md'}>
				{result ? Object.values(result).map((key) => (
					<>
						<Contacts title={key.profileLight.firstName + ' ' + key.profileLight.lastName} organization={key.profileLight.organization}>
							{key.documents?.map(key => (
								// eslint-disable-next-line react/jsx-key
								<>
									<Document title={key.name} size={key.sizeString} extension={key.extension.substring(1,99)} link={key.relativePath}/>
								</>
							))}
						</Contacts>
					</>
				)) : ''}
			</div>
		</Events>

	</>)
}
export default Statistic
