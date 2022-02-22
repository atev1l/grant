import { Typography } from '../Typography'
import Link from 'next/link'
import moment from 'moment'
import { statusRequest, statusRequestColor } from '../../lib/consts'


export const Card = ({
	id = '',
	title,
	coverImage = null,
	description,
	scheduledTo,
	estimateTo,
	requestStatus
}) => {

	const scheduledDate = moment(scheduledTo)
		.locale('ru')
		.format('DD MMM')

	const estimateDate = moment(estimateTo)
		.locale('ru')
		.format('DD MMM')

	const date = `${scheduledDate} ${scheduledDate !== estimateDate ? `- ${estimateDate}` : ''}`

	return (
		<Link href={`/single/conf/${id}`}>
			<a href={`/single/conf/${id}`}>
				<div className={'p-0 d-flex flex-column border my-3 brdr-4 bg-white overflow-hidden'}>
					{requestStatus && (
						<Typography
							color={'wht'}
							classNames={`position-absolute ms-3 btn btn-${statusRequestColor[requestStatus]} px-2 py-1 mt-3`}
							type={'p4sb'}>
							{statusRequest[requestStatus]}
						</Typography>)
					}
					{coverImage ? <img
						src={`${new URL(process.env.NEXT_PUBLIC_BASE_API).origin}/${coverImage}`}
						alt={'banner'}
						style={{ maxHeight: '25vh', width: 'auto', overflow: 'hidden', objectFit: 'cover'}}
						className={'w-100'}
					/> : requestStatus &&
						<div className={'mt-4'}/>}
					<div className={'m-3'}>
						<Typography type={'t2'}>
							{title}
						</Typography>
						<Typography type={'p3'} classNames={'my-1'}>
							{(description)?.substr(0, 70) || ''}
						</Typography>
						<Typography type={'p3sb'} color={'gry'}>
							{date}
						</Typography>
					</div>
				</div>
			</a>
		</Link>
	)
}
