import { useRouter } from 'next/router'
import { AppsIcon, EpicCalendar, User } from '../icons'
import Link from 'next/link'
import { Protect } from '../Protect'
import { Typography } from '../Typography'
import fp from 'lodash/fp'


export const Epic = () => {

	const {asPath} = useRouter()


	return (
		<div className={'position-fixed w-100 bottom-0'}>
			<div className={'d-md-none d-flex bg-white justify-content-around sh-up w-100 pt-2 pb-4'}>
				<Link href={'/'}>
					<a className={'text-center'}>
						<AppsIcon color={asPath === '/' ? 'orng' : 'gry'}/>
						<Typography type={'p7sb'} color={asPath === '/' ? 'orng' : 'gry'}>
							События
						</Typography>
					</a>
				</Link>
				<Link href={'/personal/events'}>
					<a className={'text-center'}>
						<EpicCalendar color={fp.includes(asPath, ['/personal/events', '/personal/moderation']) ? 'orng' : 'gry'}/>
						<Typography type={'p7sb'} color={asPath === '/personal/events' ? 'orng' : 'gry'}>
							Мои события
						</Typography>
					</a>
				</Link>
				<Protect
					authorized
					fallback={
						<Link href={'/auth'}>
							<a className={'text-center'}>
								<User color={asPath === '/auth' ? 'orng' : 'gry'}/>
								<Typography type={'p7sb'} color={asPath === '/auth' ? 'orng' : 'gry'}>
									Войти
								</Typography>
							</a>
						</Link>
					}>
					<Link href={'/personal/self'}>
						<a className={'text-center'}>
							<User color={asPath === '/personal/self' ? 'orng' : 'gry'}/>
							<Typography type={'p7sb'} color={asPath === '/personal/self' ? 'orng' : 'gry'}>
								Профиль
							</Typography>
						</a>
					</Link>
				</Protect>
			</div>
		</div>
	)
}
