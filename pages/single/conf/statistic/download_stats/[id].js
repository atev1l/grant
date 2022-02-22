import {ArrowLeft, CircleCheck, Cross, LogoAuth} from '../../../../../components/icons'
import {useForm} from 'react-hook-form'
import style from '../.././../../../styles/pages/auth.module.scss'
import clsx from 'clsx'

import {Header} from '../../../../../components/Header'
import {useRouter} from 'next/router'
import {useLazyQuery} from '@apollo/client'
import {Typography} from '../../../../../components/Typography'
import {Button} from '../../../../../components/Button'
import GET_STATISTIC from '../../../../../lib/apollo/schemas/events/get_stats_by_event_id.graphql'
import {actions} from '../../../../../lib/store'
import {types} from '../../../../../components/Modal'
import React from 'react'
import {useDispatch} from '../../../../../components/GeneralCtx'


const DownloadStats = () => {
	const dp = useDispatch()
	const {back, query: {id}} = useRouter()

	const [GetStats, {data: dataStats}] = useLazyQuery(GET_STATISTIC,{
		onCompleted: async data => {
			window.location.href = `${new URL(process.env.NEXT_PUBLIC_BASE_API).origin}//${data?.statistics}`
			dp(actions.main.showModal({
				type: types.SuccessNotification,
				icon: <CircleCheck color={'wht'}/>,
				background: 'grn',
				message: 'Статистика получена!'
			}))
		},
		onError: async () => {
			dp(actions.main.showModal({
				type: types.SuccessNotification,
				icon: <Cross color={'wht'}/>,
				background: 'orng',
				message: ' У вас не достаточно прав!'
			}))
		}
	})

	const {handleSubmit} = useForm({
		defaultValues: {
			eventId: id
		}
	})

	const statsHandler = async () => {
		await GetStats({
			variables: {
				eventId: id,
			}
		})
		console.log(dataStats)

	}

	return (
		<Header
			title={'Статистика по мероприятиям'}
			right={<div/>}
			left={(
				<div onClick={() => back()}>
					<ArrowLeft/>
				</div>
			)}
		>

			<div className={'d-flex justify-content-between align-items-md-center vh-100 flex-column'}>
				<form
					className={clsx('mx-2 mt-5 px-3 flex-grow-md-1 flex-grow-0 py-4', style.title_block)} onSubmit={handleSubmit(statsHandler)}>
					<div className={clsx('d-flex flex-column justify-content-center align-items-md-center ps-2 mt-3 mb-4')}>
						<div className='w-100 mb-5 d-flex justify-content-center align-items-md-center d-md-none'>
							<LogoAuth/>
						</div>
						<div className=' justify-content-start align-items-md-start'>
							<Typography type={'t0'} classNames='mb-3 justify-content-start align-items-md-start'>
							Вы получите следующие данные
							</Typography>

							<ul>
								<li>количество участников мероприятия</li>
								<li>количество участников от Пензенского государственного университета(участники и докладчики)</li>
								<li>количество конференций с международным участием</li>
							</ul>
						</div>

					</div>
					<div className={'d-flex flex-column'}>


						<div className="d-flex flex-column justify-content-center align-items-center ">
							<Button variant="orng" htmlType={'submit'} classNames="d-flex w-100 ">
								Скачать
							</Button>
						</div>
					</div>
				</form>
				<div/>
				<div/>
				<div/>
			</div>


		</Header>
	)
}
export default DownloadStats
