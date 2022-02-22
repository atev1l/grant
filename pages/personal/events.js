import { useViewportScroll } from 'framer-motion'
import { useQuery } from '@apollo/client'
import React, { useEffect } from 'react'

import { PersonalEvents } from '../../components/Wrappers/PersonalEvents'
import { useDispatch, useSelector } from '../../components/GeneralCtx'
import { Card } from '../../components/Card'

import GET_MY_EVENTS from '../../lib/apollo/schemas/events/get_my_events.graphql'
import fp from 'lodash/fp'
import { TabLeft } from '../index'
import { Filter } from '../../components/Filter'
import { actions } from '../../lib/store'


const Events = () => {

	const dp = useDispatch()
	useEffect(() => dp(actions.main.clearFilter()), [])

	const {scrollYProgress} = useViewportScroll()

	const filters = useSelector('main.filters')

	const {data, loading, refetch, fetchMore, error} = useQuery(GET_MY_EVENTS, {
		variables: {
			...filters,
		}
	})

	useEffect(async () => {
		await refetch({
			...filters,
		})
	}, [filters])

	useEffect(() => {

		const unsubscribeScroll = scrollYProgress.onChange(async num => {
			if (!loading && data.events.pageInfo.hasNextPage && num > 0.75) {
				await fetchMore({
					query: GET_MY_EVENTS,
					variables: {
						...filters,
						status: fp.get('status', filters) === 'all' ? undefined : fp.get('status', filters),
						cursor: data.events.pageInfo.endCursor
					},
				})
			}
		})
		return () => {
			unsubscribeScroll()
		}
	}, [data, loading, fetchMore])

	return (
		<PersonalEvents>
			<div className={'row'}>
				<div className={'col-md-3 d-none d-md-block'}>
					<div className={'border rounded bg-white p-3 mt-3'}>
						<TabLeft/>
					</div>
				</div>
				<div className={'col-md-6 col-12'}>
					{loading || error || data.events.edges.map(({node}, key) => (
						<Card {...node} key={String(key)}/>
					))}
				</div>
				<div className={'col-md-3 d-none d-md-block'}>
					<Filter/>
				</div>
			</div>
		</PersonalEvents>
	)

}

export default Events
