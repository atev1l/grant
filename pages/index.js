import { useViewportScroll } from 'framer-motion'
import { useMutation, useQuery } from '@apollo/client'
import React, { useEffect } from 'react'
import Link from 'next/link'

import { Events } from '../components/Wrappers/Events'
import { Card } from '../components/Card'

import GET_EVENTS from '../lib/apollo/schemas/get_events.graphql'
import CONFIRM_ACCOUNT from '../lib/apollo/schemas/auth/confirmAccount.graphql'
import { Loader } from '../components/Loader'
import { useDispatch, useSelector } from '../components/GeneralCtx'
import { useRouter } from 'next/router'
import fp from 'lodash/fp'
import { Calendar, CalendarEdit, CalendarStar } from '../components/icons'
import clsx from 'clsx'
import { Protect } from '../components/Protect'
import { Filter } from '../components/Filter'
import { actions } from '../lib/store/main/actions'


export const tabs = [
	{
		name: 'Все события',
		icon: color => <Calendar color={color} />,
		route: '/',
	},
	{
		name: 'Мои события',
		icon: color => <CalendarStar color={color} />,
		route: '/personal/events',
	},
	{
		name: 'Курируемые события',
		icon: color => <CalendarEdit color={color} />,
		route: '/personal/moderation',
	},
]


export const TabLeft = () => {
	const {asPath} = useRouter()
	return (
		<>
			{tabs.map((tab, key) => (
				<Protect authorized key={key} fallback={ key === 0 &&
					<>
						<Link href={tab.route}>
							<a
								href={tab.route}
								className={clsx('py-2 d-flex', `text-${tab.route === asPath ? 'orng' : 'gry'}`)}
							>
								<div>
									{tab.icon(tab.route === asPath ? 'orng' : 'gry')}
								</div>
								<div className={'mx-1'}>
									{tab.name}
								</div>
							</a>
						</Link>
					</>}>
					<Link href={tab.route}>
						<a
							href={tab.route}
							className={clsx('py-2 d-flex', `text-${tab.route === asPath ? 'orng' : 'gry'}`)}
						>
							<div>
								{tab.icon(tab.route === asPath ? 'orng' : 'gry')}
							</div>
							<div className={'mx-1'}>
								{tab.name}
							</div>
						</a>
					</Link>
				</Protect>
			))}
		</>
	)
}


const Home = () => {
	const dp = useDispatch()
	useEffect(() => dp(actions.clearFilter({})), [])
	const {scrollYProgress} = useViewportScroll()

	const {query} = useRouter()

	const [sendConfirm] = useMutation(CONFIRM_ACCOUNT, {
		errorPolicy: 'ignore'
	})


	useEffect(async () => {
		if (fp.get('token', query)) {
			await sendConfirm({
				variables: {...query}
			})
		}
	}, [])

	const filters = useSelector('main.filters')

	const {data, loading, fetchMore, error, refetch} = useQuery(GET_EVENTS, {
		variables: {
			...filters,
			search: filters.search.toLowerCase(),
		}
	})

	useEffect(async () => {
		await refetch()
	}, [filters])

	useEffect(() => {
		const unsubscribeScroll = scrollYProgress.onChange(async num => {
			if (!loading && data.events.pageInfo.hasNextPage && num > 0.75) {
				await fetchMore({
					query: GET_EVENTS,
					variables: {
						...filters,
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
		<Events>
			<div className={'row'}>
				<div className={'col-md-3 d-none d-md-block'}>
					<div className={'border rounded bg-white p-3 mt-3'}>
						<TabLeft />
					</div>
				</div>
				<div className={'col-md-6 col-12'}>
					{(!loading && !error && data) ? data.events.edges.map(({node}) =>
						<Card key={node.id} {...node} />
					) : !error ? (
						<Loader />
					) : JSON.stringify(error)}
				</div>
				<div className={'col-md-3 d-none d-md-block mt-3'}>
					<Filter />
				</div>
			</div>
		</Events>
	)
}

export default Home
