import {Select} from '../../components/Select'
import {AddFile, ArrowLeft, ArrowRight, CircleCheck, Cross} from '../../components/icons'
import {Typography} from '../../components/Typography'
import {Button} from '../../components/Button'

import {useForm} from 'react-hook-form'
import style from '../../styles/pages/tech.module.scss'
import clsx from 'clsx'
import {Header} from '../../components/Header'
import {useRouter} from 'next/router'
import {ApolloClient, InMemoryCache, useLazyQuery, useMutation, useQuery} from '@apollo/client'
import {actions} from '../../lib/store'
import {types} from '../../components/Modal'
import {useDispatch, useSelector} from '../../components/GeneralCtx'
import {Input} from '../../components/Input'
import React, {useEffect, useRef, useState} from 'react'
import {useCookie} from '../../lib/hooks/useCookie'
import {createUploadLink} from 'apollo-upload-client'

import CREATE_EVENT from '../../lib/apollo/schemas/create_event.graphql'
import GET_DATA_EVENT_BY_ID from '../../lib/apollo/schemas/get_data_event_by_id.graphql'
import GET_ROLE_LIST_BY_EVENT_ID from '../../lib/apollo/schemas/get_role_list_by_event_id.graphql'
import UPDATE_EVENT from '../../lib/apollo/schemas/update_event.graphql'
import UPLOAD_FILE from '../../lib/apollo/schemas/upload_file.graphql'
import moment from 'moment'
import {CardFile} from '../../components/CardFile'
import {SelectCardOrgByEvent} from '../../components/SelectCardOrgByEvent'
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import {admin_role, Protect} from '../../components/Protect'
import {store as main_store} from '../../lib/store/main'
import SEARCH_BY_USERS from '../../lib/apollo/schemas/search_by_users.graphql'
import {useOnClickOutside} from '../../lib/hooks/useOnClickOutside'
import fp from 'lodash/fp'

const dates = [
	'scheduledTo',
	'estimateTo',
]

const resolveSchema = yup.object().shape({
	title: yup.string().required('Поле обязательно').min(5, 'Минимум 5 символов'),
	description: yup.string().required('Поле обязательно').min(5, 'Минимум 5 символов'),
	scheduledTo: yup.date().required('Поле обязательно'),
	estimateTo: yup.date().required('Поле обязательно'),
	pincode: yup.string().length(6, 'Должно быть 6 символов').nullable()
	// contact Person
})

function arrayConcat(objValue, srcValue) {
	if (fp.isArray(objValue)) {
		return objValue.concat(srcValue)
	}
}



const CreateEvent = ({
	openSearch = true,
}) => {

	const dp = useDispatch()
	const formData = useSelector('event')
	const token = useSelector('profile.token')
	const [documents] = [useSelector('event.documents')]
	const relPath = [useSelector('event.setRelativePathImage')]
	const coverImageId = [useSelector('event.coverImageId')]
	const cookie = useCookie()
	const documentsId = useSelector('event.documents')
	const editEvent = useSelector('event.editEvent')

	const {push, back, query: {id}} = useRouter()
	const headerRef = useRef(null)
	const [, setIsSearch] = useState(openSearch)
	const filters = useSelector('main.filters')

	const {refetch} = useQuery(SEARCH_BY_USERS, {
		variables:{
			...filters,
			search: filters.search?.toLowerCase() ? filters.search?.toLowerCase() : '',
		}
	})
	//tes
	useEffect(async () => {
		await refetch()
	}, [filters])

	const {watch} = useForm({
		defaultValues: {
			search: ''
		}
	})

	const setSearch = data => {
		dp(main_store.actions.setFilters(data))
	}

	useEffect(() => {
		const ss = watch((s, v) => (setSearch({search: s[v.name]})))
		return () => ss.unsubscribe()
	}, [watch])

	useOnClickOutside(headerRef, () => {
		setIsSearch(false)
	})


	const {handleSubmit, control, setValue, getValues} = useForm({
		defaultValues: {
			pincode: 0,
			...formData
		},
		resolver: yupResolver(resolveSchema),
	})

	const client = new ApolloClient({
		link: createUploadLink({
			uri: process.env.NEXT_PUBLIC_BASE_API,
			headers: {
				authorization: `Bearer ${cookie.get('access_token')}`
			}
		}),
		cache: new InMemoryCache()
	})

	const [mutate, {data: fileData, loading: loadingFile, called: calledUpload}] = useMutation(UPLOAD_FILE, {
		client
	})
	const [mutateDocs, {data: fileDataDocs, loading: loadingFileDocs, called: calledUploadDocs}] = useMutation(UPLOAD_FILE, {
		client
	})

	async function onChange({
		target: {
			validity,
			files: [file],
		},
	}) {
		if (validity.valid) await mutate({variables: {file}})
	}
	async function onChangeDocuments({
		target: {
			validity,
			files: [file],
		},
	}) {
		if (validity.valid) await mutateDocs({variables: {file}})
	}

	useEffect(() => {
		if (!loadingFile && calledUpload){
			dp(actions.event.setRelativePathImage(fileData.uploadFile.value.relativePath))
			dp(actions.event.uploadFile(fileData.uploadFile.value.id))
		}
	}, [loadingFile, fileData])

	useEffect(() => {
		if (!loadingFileDocs && calledUploadDocs && documents)
			dp(actions.event.uploadDocs({id: fileDataDocs.uploadFile.value.id, name: fileDataDocs.uploadFile.value.name}))
	}, [loadingFileDocs, fileDataDocs])


	const [createEvent] = useMutation(CREATE_EVENT, {
		onCompleted: async data => {
			if (!(data.createEvent.errors.length > 0)) {
				dp(actions.main.showModal({
					type: types.SuccessNotification,
					icon: <CircleCheck color={'wht'}/>,
					background: 'grn',
					message: 'Событие успешно создано!'
				}))
				await push(`single/conf/${data.createEvent.value}`)
			} else {
				dp(actions.main.showModal({
					type: types.SuccessNotification,
					icon: <Cross color={'wht'} />,
					background: 'orng',
					message: data.authorization.errors[0].message
				}))
			}
		}
	})

	const [updateEvent] = useMutation(UPDATE_EVENT)


	const [loadEvent, {data, loading: qq, called: calledEvent}] = useLazyQuery(GET_DATA_EVENT_BY_ID)

	useEffect(async() => {
		if (!qq && !calledEvent && id && !documents[0]) {
			await loadEvent({
				variables: {
					id
				}
			})
			await data?.events?.edges[0].node.documents.forEach((key)=>{
				dp(actions.event.uploadDocs({id: key.id, name: key.name}))
			})
			data?.events?.edges[0]?.node?.coverImage ? dp(actions.event.setRelativePathImage(data?.events?.edges[0]?.node?.coverImage)) : ''
		}
	},[id])

	useEffect(async() => {
		if (data && id){
			data?.events?.edges[0]?.node?.coverImage ? dp(actions.event.setRelativePathImage(data?.events?.edges[0]?.node?.coverImage)) : ''
			await data?.events?.edges[0]?.node?.documents?.forEach((key)=>{
				dp(actions.event.uploadDocs({id: key.id, name: key.name}))
			})
		}
	},[data, id])

	useEffect(() => {
		if (data !== undefined) {
			Object.keys(data.events.edges[0].node).forEach((key) => {
				if (key === 'estimateTo' || key === 'scheduledTo') {
					const val = moment(data.events.edges[0].node[key]).format('YYYY-MM-DDTHH:mm')
					setValue(key, val, { shouldDirty: true })
				} else {
					setValue(key, data.events.edges[0].node[key], { shouldDirty: true })
				}
			})
		}
		if (dataOrgsBeEvent && !formData.organizers[0] && id && !editEvent){
			dataOrgsBeEvent.usersInfo.edges.map(key => {
				dp(actions.event.setOrg(key.node.id))
				dp(actions.event.editEvent(true))
			})
		}
	}
	)

	const [loadRoles, {data: dataOrgsBeEvent}] = useLazyQuery(GET_ROLE_LIST_BY_EVENT_ID, {
		variables:{
			eventId: id
		},
		onCompleted: (data) => {
			dp(actions.main.setUsers(data.usersInfo.edges))
		}
	})

	useEffect(() => {
		if (token && id) {
			loadRoles({
				role: 'Organizer',
				eventId: id
			})
		}
	}, [token, loadRoles])


	const requestHandler = async (data) => {
		const req = {}
		dates.forEach((value) => {
			req[value] = moment(data[value]).toISOString()
		})

		const res = await yup.string().length(32).isValid(formData?.contactPerson)
		// const res2 = await yup.string().uuid().isValid('a770f8a99d394c93a10128a886c1bc23')
		// debugger
		if (res) {
			await createEvent({
				variables: {
					...formData,
					...data,
					...req,
					coverImageId: coverImageId ? coverImageId[0] : '',
					pincode: parseInt(getValues('pincode')),
					documents: documentsId ? [...documentsId.map(x => x.id)] : [],
				}
			})
		} else {
			dp(actions.main.showModal({
				type: types.SuccessNotification,
				background: 'danger',
				message: 'Не указано контактное лицо!'
			}))
		}
		dp(actions.event.clearAll())
	}

	const updateHandler = async (data) => {
		const req = {}
		dates.forEach((value) => {
			console.log(req[value] = moment(data[value]).toISOString())
		})

		const newPin = fp.clamp(0, 999999, parseInt(getValues('pincode')))

		const variables = fp.mergeAllWith(arrayConcat, [
			{eventId: id},
			formData,
			data,
			req,
			{
				contactPerson: data?.contactPerson.userId,
				coverImageId: coverImageId ? coverImageId[0] : null,
				documents: fp.isArray(documentsId) ? [...documentsId.map(x => x.id)] : [],
				pincode: fp.isNaN(newPin) ? undefined : newPin,
			}])
		variables.documents = fp.filter(fp.isString, fp.map((value) => fp.isObject(value) && fp.getOr(value, 'id', value), variables.documents))
		// eslint-disable-next-line no-debugger
		debugger
		await updateEvent({
			variables,
		})
		await dp(actions.event.clearAll())
		await push('/')
	}

	return (
		<Header
			title={id ? 'Редактирование события' : 'Создание события'}
			right={<div/>}
			left={(
				<div onClick={() => back()}>
					<ArrowLeft/>
				</div>
			)}
		>

			<form
				onSubmit={handleSubmit( id ? updateHandler : requestHandler)}
				className={'w-100 d-flex align-items-center justify-content-center'}
			>
				<div className={clsx(style.container, 'container-md position-relative h2 mt-2')}>
					<div className={clsx('d-flex flex-column', style.insideContainer)}>
						<div
							className={clsx('w-100 form-control-file mt-3 mb-4 d-flex justify-content-center align-items-center')}>
							{relPath[0] ? (
								<label htmlFor="file-input" className={`${relPath[0] ? 'w-100 h-100' : 'h-100'}`}  style={{ maxHeight: '40vh', overflow: 'hidden', objectFit: 'cover'}}>
									<div className={'d-flex w-100 ms-auto me-auto brdr-3'} style={{
										height: '6em', maxHeight: '40vh', overflow: 'hidden', objectFit: 'contain',
										backgroundImage: relPath[0] ? `url(${new URL(process.env.NEXT_PUBLIC_BASE_API).origin}/${relPath})` : 'url(/ex/inputDownloadFile.png)',
										backgroundRepeat: 'no-repeat',
										backgroundPosition: 'center',
									}}/>
								</label>
							) : (
								<label htmlFor="file-input" className={`${relPath[0] ? 'w-100' : ''}`}  style={{ maxHeight: '40vh', overflow: 'hidden', objectFit: 'cover'}}>
									<img src={relPath[0] ? `${new URL(process.env.NEXT_PUBLIC_BASE_API).origin}/${relPath}` : '/ex/inputDownloadFile.png'} className={'w-100 brdr-3'}  alt={'upload_img'}/>
								</label>
							)}
							<input name={'coverImageId'} type="file" id="file-input" style={{display: 'none'}} onChange={onChange}/>
						</div>


						<Input
							type="text"
							className="form-control"
							id="title"
							name="title"
							control={control}
							placeholder="Введите название конференции"
						>
							Название конференции
						</Input>
						<Input
							type="description"
							name="description"
							control={control}
							placeholder="Введите описание конференции"
							rows={7}
						>
							Описание
						</Input>
						<div className={'row d-flex flex-column flex-lg-row'}>
							<Input
								containerClassname={'col'}
								type="datetime-local"
								className="form-control"
								name="scheduledTo"
								control={control}
								placeholder="Введите дату начала события"
								min={'2010-01-01T00:00'}
								max={'2077-01-01T00:00'}
							>
								Дата начала
							</Input>
							<Input
								containerClassname={'col'}
								type="datetime-local"
								className="form-control"
								name="estimateTo"
								control={control}
								placeholder="Введите дату завершения события"
								min={'2010-01-01T00:00'}
								max={'2077-01-01T00:00'}
							>
								Дата завершения
							</Input>
							<Protect min_role={admin_role}>
								<Input
									type="number"
									containerClassname="col"
									id="pincode"
									name="pincode"
									control={control}
									placeholder="Введите пинкод"
								>
									Пинкод
								</Input>
							</Protect>
						</div>
						<div className="form-group col-md" onChange={onChangeDocuments}>
							<Typography classNames={'mb-1 mt-2'} type={'p4'} color={'gry'}>
								Организаторы конференции
							</Typography>
							<div className={clsx(style.card_documents, 'd-flex justify-content-between  mb-3')}>
								<div className={'d-flex overflow-auto'}>
									{formData.organizers[0] ?
										formData.organizers?.map((key) => (
											// eslint-disable-next-line react/jsx-key
											<div className='d-inline-flex m-2'>
												<div className='d-inline-flex' style={{backgroundColor: '#27AE60', borderRadius: '4px'}}>
													<SelectCardOrgByEvent name={key} key={key} color='white'/>
												</div>
											</div>
										))
										: ''	}
								</div>
								<div className={'border-start my-2 d-flex align-items-center'}>
									<div className={'me-1 ms-1'} onClick={async () => {
										dp(actions.event.gavgav(getValues()))
										fileData ? dp(actions.event.setRelativePathImage(fileData.uploadFile.value.relativePath)) : (data?.events?.edges[0]?.node?.coverImage ? dp(actions.event.setRelativePathImage(data?.events?.edges[0]?.node?.coverImage)) : '')
										fileData ? dp(actions.event.uploadFile(fileData.uploadFile.value.id)) : ''
										dp(actions.event.editEvent(true))
										await push('/single/conf/register_organizer')
									}}>
										<ArrowRight/>
									</div>
								</div>
							</div>
						</div>

						<div className="form-group col-md">
							<Typography classNames={'mb-1 mt-2'} type={'p4'} color={'gry'}>
								Контактное лицо
							</Typography>
							<div className={clsx(style.card_documents, 'd-flex justify-content-between align-items-center mb-3')}>
								<div className={'d-flex flex-column'}>
									{!formData.contactPerson ?
										data?.events?.edges[0].node.contactPerson.userId ?
											<SelectCardOrgByEvent contactPerson  name={data?.events?.edges[0].node.contactPerson.userId} key={data?.events?.edges[0].node.contactPerson.userId} color='blck'/> : ''
										:
										formData.contactPerson ? <SelectCardOrgByEvent contactPerson name={formData.contactPerson} key={formData.contactPerson}/> : ''
									}
								</div>
								<div className={'border-start my-2'}>
									<div className={'me-1 ms-1'} onClick={async () => {
										dp(actions.event.gavgav(getValues()))
										dp(actions.event.editEvent(true))
										fileData ? dp(actions.event.setRelativePathImage(fileData.uploadFile.value.relativePath)) : (data?.events?.edges[0]?.node?.coverImage ? dp(actions.event.setRelativePathImage(data?.events?.edges[0]?.node?.coverImage)) : '')
										fileData ? dp(actions.event.uploadFile(fileData.uploadFile.value.id)) : ''
										await push('/create_event/choice_contact_person')
									}}>
										<ArrowRight/>
									</div>
								</div>
							</div>
						</div>

						<div className={'row align-items-start'}>
							<div className="col-md-6 col-12" onChange={onChangeDocuments}>
								<Typography classNames={'mb-1'} type={'p4'} color={'gry'}>
									Документы
								</Typography>
								<div className={clsx(style.card_documents, 'd-flex justify-content-between align-items-center')}>
									<div className="d-flex flex-row flex-wrap">
										{documents[0] ?
											documents?.map((key) => (
												// eslint-disable-next-line react/jsx-key
												<CardFile name={key.name} key={key.id} idFile={key.id}/>
											))
											:
											data?.events?.edges[0].node.documents.map((key) => (
												// eslint-disable-next-line react/jsx-key
												<CardFile name={key.name} key={key.id} idFile={key.id}/>
											))
										}
									</div>
									<div
										className={clsx('form-control-file m-3 me-3 ms-2 d-flex justify-content-center align-items-center')}>
										<label htmlFor="file-sd">
											<AddFile />
										</label>
										<input type="file" id="file-sd" style={{display: 'none'}}/>
									</div>
								</div>
							</div>
							<Select
								label={'Статус конференции'}
								list={new Map([['RECEPTION', 'Регистрация заявок'], ['OPENING', 'Открытие мероприятия'], ['ONGOING', 'Идёт'], ['COMPLETED', 'Завершена']])}
								name={'status'}
								control={control}
								className={'col-md-6 col-12 h-100'}
							/>

						</div>

					</div>
				</div>
				<div className={'position-fixed gradient bottom-0 w-100'}>
					<div className={'py-3 px-3 container-md'}>
						<div className="d-flex">
							<Button classNames=" w-100" variant="orng" htmlType="submit">
								<Typography type={'p1sb'} color={'white'}>
									{id ? 'Редактировать событие' : 'Создать событие'}
								</Typography>
							</Button>
						</div>
					</div>
				</div>
			</form>
		</Header>
	)
}

export default CreateEvent
