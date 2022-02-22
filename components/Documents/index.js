import clsx from 'clsx'
import style from './style.module.scss'
import {Typography} from '../Typography'
import {Document} from '../Document'


export const Documents = ({
	nameParticipant,
	organization,
	file = [
		{
			title: 'Ем детей',
			size: '24 мб',
			extension: 'pdf',
			link: 'https://google.com'

		},
	],

}) => {
	return (
		<div>
			<div className={clsx(style.main, 'px-3 py-2 w-100 brdr-4 my-1')}>
				<div className='d-flex justify-content-between'>
					<Typography classNames="mb-2 mt-1" type={'p2sb'}>
						{nameParticipant}Никита Аникин
					</Typography>
					<Typography classNames="mb-2 mt-1" type={'p2sb'} color={'gry'}>
						{organization}Говноинком
					</Typography>
				</div>
				{file.map((contact, i) =>
					<Document key={String(i)} {...contact}/>
				)}
			</div>


		</div>
	)
}
