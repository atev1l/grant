import {
	ArrowDown,
	ArrowDownload,
	ArrowLeft,
	ArrowRight,
	ArrowUp,
	Bell,
	Calendar,
	CircleCheck,
	Cross,
	DescDrag,
	DownloadDownArrow,
	Filter,
	House,
	Icon,
	Info,
	Invite,
	Lens,
	Login,
	LogoAuth,
	Mail,
	Pencil,
	Phone,
	Plus,
	PlusFile,
	ThreeDots,
	User
} from '../../components/icons'
import { Typography } from '../../components/Typography'
import { Epic } from '../../components/Epic'
import { GroupButtons } from '../../components/GroupButtons'
import { Button } from '../../components/Button'
import { Select } from '../../components/Select'
import { Description } from '../../components/Description'
import { Document } from '../../components/Document'
import { useForm } from 'react-hook-form'
import style from '../../styles/pages/tech.module.scss'
import clsx from 'clsx'


import QRCode from 'qrcode.react'
import { Block } from '../../components/Block'
import { Dropdown } from '../../components/Dropdown'
import { Header } from '../../components/Header'
import { useRouter } from 'next/router'
import { Card } from '../../components/Card'
import { Contacts } from '../../components/Сontacts'
import { useDispatch } from '../../components/GeneralCtx'
import { store as main_store } from '../../lib/store/main'
import { types } from '../../components/Modal'
import { Input } from '../../components/Input'
import { CalendarInput } from '../../components/CalendarInput'
import { colors, roles } from '../../lib/consts'
import { Protect } from '../../components/Protect'

const rer = () => console.log('epic')


const Tech = () => {
	const {handleSubmit, control} = useForm({
		mode: 'onChange'
	})

	const dp = useDispatch()
	const {back} = useRouter()

	return (
		<Header
			title={'Comps'}
			search
			left={(
				<div onClick={() => back()}>
					<ArrowLeft/>
				</div>
			)}
		>
			<form
				onSubmit={handleSubmit((set) => console.log(set))}
				className={clsx(style.container, 'position-relative')}
			>
				<div className="h2 mx-3 mt-2 mc">
					Comps & Colors
					<div className={'d-flex flex-column'}>
						<CalendarInput placeholders={['sd', 'fg']} control={control} names={['calendar', 'calendar2']}/>
						<br/>
						<Protect min_role={{
							eventId: 'undef',
							role: roles[2]
						}}>
							You are admin!!
						</Protect>
						{Object.keys(colors).map((type, index) => (
							<Button
								key={type}
								htmlType={'submit'}
								variant={type}
								outline={index % 2 > 0}
								color={type === 'blck' ? 'lght' : 'blck'}>
								{type}
							</Button>
						))}
						<Button
							variant={'orng'}
							outline={true}
							color={'orng'}>
							type
						</Button>
						<br/>
						<Input
							control={control}
							name={'name'}
							placeholder={'Дыа'}
						>
							d
						</Input>
						<button className={'btn btn-outline-orng my-2'} onClick={() => dp(main_store.actions.showModal({
							type: types.NotificationWithDesc,
						}))}>
							types.SuccessNotification
						</button>
						<Contacts title={'Контакты'}>
							<Document title="cardsize" size="cardsize" extension={'exe'} link={'google.com'}/>
						</Contacts>
						<Card
							thumb={'ex/banner.png'}
							title={'Научно-методические чтения «Университетские чтения – 2021»'}
							desc={'Научно-практическая' +
							' конференция для преподавателей' +
							' и аспирантов высших учебных заведений. Тематика' +
							' докладов...'}
							date={'3 апреля - 8 апреля'}
						/>

						<Card
							thumb={'ex/banner2.png'}
							title={'SECOCK 2021'}
							desc={'Научно-практическая' +
							' конференция для преподавателей' +
							' и аспирантов высших учебных заведений. Тематика' +
							' докладов...'}
							date={'3 апреля - 8 апреля'}
						/>
						<Document title="cardsize" size="cardsize" extension={'exe'} link={'google.com'}/>
						<Description
							title="Описание"
							text="Научно-практическая конференция для преподавателей и аспирантов высших учебных заведений. Тематика докладов..."
						/>
						<Cross/>
						<ArrowDown/>
						<ArrowLeft/>
						<Calendar/>
						<Lens/>
						<ArrowDownload/>
						<Bell/>
						<CircleCheck/>
						<PlusFile/>
						<User/>
						<Plus/>
						<Filter/>
						<LogoAuth/>
						<Phone/>
						<Phone withPlus/>
						<DownloadDownArrow/>
						<House/>
						<ThreeDots/>
						<Pencil/>
						<ArrowRight/>
						<Info/>
						<ArrowUp/>
						<Icon/>
						<DescDrag/>
						<Mail/>
						<Login/>
						<Invite/>
					</div>
					<Typography type={'t1'}>
						sd
					</Typography>
					<div>
					</div>
					<Button variant="orng" onClick={() => rer()}>
						tes
					</Button>
					<div>
						<GroupButtons tabs={[{
							path: '/',
							name: 'root'
						},
						{
							path: '/',
							name: 'new'
						},
						{
							path: '/tech',
							name: 'a'
						},]}/>
					</div>

					<div>
						<QRCode value={'http://192.168.31.167:3000/'} renderAs="svg" width={100} style={{
							width: '100%',
							height: '100%',
						}}/>
					</div>
					<div className={'mt-3'}>
						<Select
							list={new Map([['d', 's']])}
							name={'control'}
							control={control}
						/>
					</div>
					<Block label={'New Phone'} value={'65 yu'}/>
					<Block label={'a'} value={'in'}/>
					<Dropdown icon={<Filter/>} actions={[
						{
							icon: <Lens/>,
							name: 'lens',
							callback: () => window.alert('ABOBA'),
						}
					]}/>
					<Block label={'New Phone'} value={'65 00 65'} link="tel:88005553535"/>
					<Dropdown actions={[
						{
							icon: <ArrowLeft color={'lgr'}/>,
							name: 'Arrow',
							callback: () => window.alert('ARROW'),
						}
					]}>
						Name22
					</Dropdown>
					<Block label={'a'} value={'in'}/>
					<Block label={'a'} value={'in'}/>
					<Block label={'a'} value={'in'}/>

				</div>
				<Epic/>
			</form>

		</Header>
	)
}
export default Tech
