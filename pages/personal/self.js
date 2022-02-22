import { useQuery } from '@apollo/client'
import Link from 'next/link'


import { Header } from '../../components/Header'
import { Epic } from '../../components/Epic'
import { Contacts } from '../../components/Сontacts'
import fp from 'lodash/fp'
import { Button } from '../../components/Button'
import { useCookie } from '../../lib/hooks/useCookie'
import { ArrowRight, Pencil } from '../../components/icons'

import GET_SELF from '../../lib/apollo/schemas/user/get_self.graphql'
import { Loader } from '../../components/Loader'
import { Typography } from '../../components/Typography'


const Self = () => {
	const {data, loading} = useQuery(GET_SELF)

	const info = fp.get('infoByCurrentAccount.value', data)

	const cookie = useCookie()

	const logout = async () => {
		await cookie.remove('access_token')
		window.location.href = '/'
	}

	return (<Header
		left={<div/>}
		title={'Профиль'}
		right={<Link href={'/personal/settings'}>
			<a>
				<Pencil/>
			</a>
		</Link>}
	>
		<div className={'mx-2 mt-3 mb-5'}>
			{!loading ?
				<>
					<Contacts
						contacts={[
							{
								label: 'ФИО',
								value: `${info.profile.lastName} ${info.profile.firstName} ${info.profile.patronymic}`
							},
							{
								label: 'Телефон',
								value: info.profile.phone
							},
							{
								label: 'Почта',
								value: info.email
							},
							{
								label: 'Город',
								value: info.profile.city
							},
							{
								label: 'Организация',
								value: info.profile.organization
							},
						]}
					/>

					<Button
						variant={'wht'} color={'rd'}
						typoClassNames={'d-flex justify-content-between w-100'}
						classNames={'sh-down w-100'} onClick={() => logout()}>
						<Typography type={'p2'} color={'rd'}>
							Выйти
						</Typography>
						<div className={'pointer'}>
							<ArrowRight color={'gry'}/>
						</div>
					</Button>
				</> : <Loader/>
			}
		</div>
		<Epic/>

	</Header>)
}

export default Self
