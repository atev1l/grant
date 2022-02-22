import React, { useEffect } from 'react'
import fp from 'lodash/fp'
import { useViewportScroll } from 'framer-motion'
import { useQuery } from '@apollo/client'

import { PersonalEvents } from '../../components/Wrappers/PersonalEvents'
import { useDispatch, useSelector } from '../../components/GeneralCtx'
import { Card } from '../../components/Card'

import EVENTS_MODERATION from '../../lib/apollo/schemas/personal/events_moderation.graphql'
import { TabLeft } from '../index'
import { Filter } from '../../components/Filter'
import { actions } from '../../lib/store'


const Events = () => {
	const dp = useDispatch()
	useEffect(() => dp(actions.main.clearFilter({})), [])
	const {scrollYProgress} = useViewportScroll()

	const filters = useSelector('main.filters')

	const eventIds = useSelector('profile.roles')

	const remappedEventIds = fp.map(fp.get('eventId'), eventIds)
	const reprocessed = {
		status: {
			neq: null
		},
		event: fp.get('[0]', remappedEventIds) ? {
			in: remappedEventIds
		} : {
			in: ['00000000-0000-0000-0000-000000000000']
		}
	}

	const {data, loading, refetch, fetchMore} = useQuery(EVENTS_MODERATION, {
		variables: {
			...filters,
			...reprocessed
		}
	})

	useEffect(async () => {
		if (!loading)
			await refetch({
				...filters,
				...reprocessed
			})
	}, [filters, loading, eventIds])

	useEffect(() => {
		const unsubscribeScroll = scrollYProgress.onChange(async num => {
			if (!loading && data.events.pageInfo.hasNextPage && num > 0.75) {
				await fetchMore({
					query: EVENTS_MODERATION,
					variables: {
						...reprocessed,
						...filters,
						cursor: data.events.pageInfo.endCursor
					},
				})
			}
		})
		return () => {
			unsubscribeScroll()
		}
	}, [data, loading, fetchMore, filters])

	return (
		<PersonalEvents>
			<div className={'row'}>
				<div className={'col-md-3 d-none d-md-block'}>
					<div className={'border rounded bg-white p-3 mt-3'}>
						<TabLeft />
					</div>
				</div>
				<div className={'col-md-6 col-12'}>
					{loading || data.events.edges.map(({node}, key) => (
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
