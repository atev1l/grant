import clsx from 'clsx'
import style from './style.module.scss'
import { Typography } from '../Typography'
import { DownloadDownArrow } from '../icons'


export const Document = ({
	title,
	size,
	extension,
	link
}) => {
	return (
		<a
			className={clsx(style.outln, 'brdr-3 p-3 w-100 d-flex justify-content-between mb-2')}
			href={`${(new URL(process.env.NEXT_PUBLIC_BASE_API).origin)}/${link}`}
			download
			target='_blank'
			rel="noreferrer">

			<div>
				<div className='text-wrap'>
					<Typography type={'p2sb'}>
						{title}
					</Typography>
				</div>
				<Typography type={'p5'} color={'gry'}>
					{size}    &#183; {extension}
				</Typography>
			</div>

			<a>
				<DownloadDownArrow/>
			</a>

		</a>
	)
}
