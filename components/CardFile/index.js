import styles from './s.module.scss'
import clsx from 'clsx'
import {CircleCross} from '../icons'
import {actions} from '../../lib/store'
import {useDispatch} from '../GeneralCtx'
import {Typography} from '../Typography'


export const CardFile = ({
	name,
	idFile,
}) => {
	const dp = useDispatch()
	return (
		<div className={'d-inline-flex m-1'}>
			<div className={clsx(styles.card, 'px-2 text-white d-flex align-items-center')}>
				<Typography type={'p3sb'} color={'white'}>
					{name.substr(0,12) + '...'}
				</Typography>
				<div className={'ps-2 pb-1'} style={{cursor: 'pointer'}} onClick={() => {
					dp(actions.event.removeElementFromDocs(idFile))
				}}>
					<CircleCross />
				</div>
			</div>
		</div>
	)
}
