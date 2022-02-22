import {AddFile, ArrowLeft, ArrowRight, CircleCheck, Cross, Phone} from '../../../components/icons'
import {Typography} from '../../../components/Typography'
import {Button} from '../../../components/Button'
import {useForm} from 'react-hook-form'
import style from '../../../styles/pages/tech.module.scss'
import clsx from 'clsx'

import {Header} from '../../../components/Header'
import {useRouter} from 'next/router'
import {Select} from '../../../components/Select'
import {ApolloClient, InMemoryCache, useLazyQuery, useMutation, useQuery} from '@apollo/client'
import CREATE_REQUEST from '../../../lib/apollo/schemas/create_request.graphql'
import UPDATE_REQUEST from '../../../lib/apollo/schemas/update_request.graphql'
import GET_USER_INFO from '../../../lib/apollo/schemas/get_user_info.graphql'
import GET_SELF from '../../../lib/apollo/schemas/user/get_self.graphql'
import GET_DATA_REQUEST from '../../../lib/apollo/schemas/get_data_request_by_event_id.graphql'
import {Input} from '../../../components/Input'
import {actions} from '../../../lib/store'
import {types} from '../../../components/Modal'
import {useDispatch, useSelector} from '../../../components/GeneralCtx'
import {useEffect, useState} from 'react'
import {CardFile} from '../../../components/CardFile'
import UPLOAD_FILE from '../../../lib/apollo/schemas/upload_file.graphql'
import {createUploadLink} from 'apollo-upload-client/public'
import {useCookie} from '../../../lib/hooks/useCookie'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import {SelectCarForCoAuthorsRequest} from '../../../components/SelectCardForCoAthorsRequest'

const resolveSchema = yup.object().shape({
	firstName: yup.string().required('Поле обязательно').min(1, 'Минимум 1 символов').nullable(),
	country: yup.string().required('Это поле обязательно').nullable(),
	// profile: yup.object().shape({
	// }),
	email: yup.string().required('Поле обязательно').email('Это должен быть правильный email').nullable(),
	talkTitle: yup.string().when('control', {
		is: 'SPEAKER',
		then: yup.string().required('Поле обязательно').nullable(),
		otherwise: yup.string().notRequired(),
	})
})



const CreateRequest = () => {

	const {back, query: {id, reqId}} = useRouter()

	const dp = useDispatch()
	const {push} = useRouter()
	const {data} = useQuery(GET_USER_INFO)
	const cookie = useCookie()
	const [documents] = [useSelector('event.documents')]
	const documentsId = useSelector('event.documents')
	const coAuthors = useSelector('request.coAuthors')
	const {data: dataUser} = useQuery(GET_SELF)
	const {handleSubmit, control, setValue, getValues} = useForm({
		defaultValues: {
			type: 'PARTICIPANT',
			talkTitle: '',
			email: '',
			firstName: '',
			lastName: '',
			patronymic: '',
			phone: '',
			city: '',
			organization: '',
			documents: [],
			userId: data?.infoByCurrentAccount?.value.id,
		},
		resolver: yupResolver(resolveSchema)
	})
	const [role, setRole] = useState(getValues('role'))

	const client = new ApolloClient({
		link: createUploadLink({
			uri: process.env.NEXT_PUBLIC_BASE_API,
			headers: {
				authorization: `Bearer ${cookie.get('access_token')}`
			}
		}),
		cache: new InMemoryCache()
	})

	const [mutateDocs, {data: fileDataDocs, loading: loadingFileDocs, called: calledUploadDocs}] = useMutation(UPLOAD_FILE, {
		client
	})

	const [loadDataRequest, {data: dataRequest, loading: loadingDataRequest, called: calledDataRequest}] = useLazyQuery(GET_DATA_REQUEST)

	useEffect(async () => {
		if (!loadingDataRequest && !calledDataRequest && id && !coAuthors[0]) {
			await loadDataRequest({
				variables: {
					eventId: id,
					id: reqId
				}
			})
			// await dp(actions.event.uploadDocs(dataRequest?.requests?.nodes[0].documents[0].id))
		}
	},[id, reqId, dataRequest,loadDataRequest,loadingDataRequest, calledDataRequest])

	useEffect(async () => {
		if (dataRequest) {
			await dataRequest?.requests?.nodes[0].documents.map((key) =>{
				dp(actions.event.uploadDocs({id: key.id, name: key.name}))
			})
			setValue('talkTitle', dataRequest?.requests?.nodes[0].talkTitle)
			dataRequest?.requests?.nodes[0].coAuthors?.map((key)=>{
				dp(actions.request.setCoAuthor(key))
			})
		}
	},[dataRequest,loadDataRequest])

	const [createRequest] = useMutation(CREATE_REQUEST, {
		variables:{
			...data,
			userId: data?.infoByCurrentAccount?.value.id,
			eventId: id,
			membersType: data?.infoByCurrentAccount?.value.profile.memberType,
			coAuthors: coAuthors ? coAuthors : []
		},
		onCompleted: async data => {
			if (!(data.createRequest.errors.length > 0)) {
				dp(actions.main.showModal({
					type: types.SuccessNotification,
					icon: <CircleCheck color={'wht'}/>,
					background: 'grn',
					message: 'Заявка успешно отправлена!'
				}))
				await push(`/single/conf/${id}`)
			} else {
				dp(actions.main.showModal({
					type: types.SuccessNotification,
					icon: <Cross color={'wht'}/>,
					background: 'orng',
					message: data.authorization.errors[0].message
				}))
			}
		}
	})


	const [updateRequest] = useMutation(UPDATE_REQUEST, {
		variables:{
			userId: data?.infoByCurrentAccount?.value.id,
			coAuthors: coAuthors ? coAuthors : []
		},
		onCompleted: async data => {
			if (!(data.editRequest.errors.length > 0)) {
				dp(actions.main.showModal({
					type: types.SuccessNotification,
					icon: <CircleCheck color={'wht'}/>,
					background: 'grn',
					message: 'Заявка успешно изменена!'
				}))
				await push(`/single/conf/${id}`)
			} else {
				dp(actions.main.showModal({
					type: types.SuccessNotification,
					icon: <Cross color={'wht'}/>,
					background: 'orng',
					message: data.authorization.errors[0].message
				}))
			}
		}
	})

	useEffect(() => {
		if (data !== undefined ) {
			Object.keys(data.infoByCurrentAccount.value.profile).forEach((key) => {
				setValue(key, data.infoByCurrentAccount.value.profile[key])
			})
			setValue('email', data.infoByCurrentAccount.value.email)
		}
	}, [data])

	const requestHandler = async data => {
		const variables = {
			...data,
			eventId: id,
			userId: dataUser ? dataUser.infoByCurrentAccount.value.id : '00000000-0000-0000-0000-000000000000',
			documents: documentsId ? [...documentsId.map(x => x.id)] : [],

		}
		await createRequest({variables})
		await dp(actions.request.clearAll())
	}

	const updateRequestHandler = async (data) => {
		await updateRequest({
			variables: {
				talkTitle: '',
				...data,
				requestId: reqId,
				documents: documentsId ? [...documentsId.map(x => x.id)] : [],
				type: role,
				coAuthors: coAuthors ? coAuthors : []
			}
		},
		await dp(actions.request.clearAll()))
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
		if (!loadingFileDocs && calledUploadDocs)
			dp(actions.event.uploadDocs({id: fileDataDocs.uploadFile.value.id, name: fileDataDocs.uploadFile.value.name}))
	}, [loadingFileDocs, fileDataDocs])

	return (
		<Header
			title={reqId ?  'Редактирование заявки' : 'Заявка на событие'}
			right={<div/>}
			left={(
				<div onClick={() => back()}>
					<ArrowLeft/>
				</div>

			)}
		>

			<form className={clsx(style.container, 'position-relative')} onSubmit={handleSubmit(reqId ? updateRequestHandler : requestHandler)}>
				<div className={clsx('container-md bg-white', style.bg)}>
					<div className="h2 mx-3 mt-2 mc">
						<div className={'d-flex flex-column'}>
							<div className={'row'}>
								<Input
									containerClassname={'col-12 col-md-6'}
									type="text"
									name="lastName"
									control={control}
									placeholder="Введите вашу фамилию"
								>
									Фамилия
								</Input>


								<Input
									containerClassname={'col-12 col-md-6'}
									type="text"
									name="firstName"
									control={control}
									placeholder="Введите ваше имя"
								>
									Имя
								</Input>
							</div>

							<div className={'row'}>
								<Input
									containerClassname={'col-12 col-md-6'}
									type="text"
									name="patronymic"
									control={control}
									placeholder="Введите ваше отчество"
								>
							Отчество
								</Input>
								<Input
									containerClassname={'col-12 col-md-6'}
									type="text"
									name="phone"
									control={control}
									placeholder="Введите номер телефона"
								>
							Телефон
								</Input>
							</div>
							<div className={'row'}>

								<Input
									containerClassname={'col-12 col-md-6'}
									type="text"
									name="email"
									control={control}
									placeholder="Введите почту"
								>
							Почта
								</Input>

								<Input
									containerClassname={'col-12 col-md-6'}
									type="text"
									name="country"
									control={control}
									placeholder="Введите страну"
								>
									Страна
								</Input>

								<Input
									containerClassname={'w-100'}
									type="text"
									name="city"
									control={control}
									placeholder="Введите ваш город"
								>
							Город
								</Input>
							</div>

							<div className={'d-flex row'}>
								<Input
									containerClassname={'col-12 col-md-6'}
									type="text"
									name="organization"
									control={control}
									placeholder="Введите ворганизацию"
								>
							Организация
								</Input>
								<div className={'d-flex col align-items-center w-100'} onClick={()=>{
									setRole(getValues('role'))
								}}>
									<Select
										className={'w-100'}
										label={'Роль'}
										list={new Map([['PARTICIPANT', 'Участник'], ['SPEAKER', 'Докладчик']])}
										name='role'
										id='role'
										control={control}
									/>
								</div>
							</div>

							{(role === 'SPEAKER' || coAuthors[0]) ? (<>
								<Input
									type="text"
									name="talkTitle"
									control={control}
									placeholder="Введите название публикации"
								>
									Публикация
								</Input>

								<div className="form-group col-md" onChange={onChangeDocuments}>
									<Typography classNames={'mb-1 mt-2'} type={'p4'} color={'gry'}>
										Соавторы публикации
									</Typography>
									<div className={clsx(style.card_documents, 'd-flex justify-content-between ')}>
										<div className={'d-flex'}>
											{coAuthors[0] ?
												coAuthors.map((key) => (
													// eslint-disable-next-line react/jsx-key
													<div className='d-inline-flex m-2'>
														<div className='d-inline-flex' style={{backgroundColor: '#27AE60', borderRadius: '4px'}}>
															<SelectCarForCoAuthorsRequest userId={key} key={key} color='white'/>
														</div>
													</div>
												)) : ''
											}
										</div>
										<div className={'border-start my-2 d-flex align-items-center'}>
											<div className={'me-1 ms-1'} onClick={async () => {
												// dp(actions.request.saveAll(getValues()))
												await push('/single/create_request/coauthors')
											}}>
												<ArrowRight/>
											</div>
										</div>
									</div>
								</div>
							</>) : ''}


							<div className="form-group col-md" onChange={onChangeDocuments}>
								<Typography classNames={'mb-1 mt-3'} type={'p4'} color={'gry'}>
								Документы
								</Typography>
								<div className={clsx(style.card_documents, 'd-flex justify-content-between align-items-center')}>
									<div className={'d-lg-flex'}>
										{documents[0] ?
											documents?.map((key) => (
											// eslint-disable-next-line react/jsx-key
												<CardFile name={key.name} key={key.id} idFile={key.id}/>
											))
											:
											dataRequest?.requests?.nodes[0].documents.map((key) => (
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
						</div>
					</div>
				</div>
				<div className={'position-fixed bg-white w-100 bottom-0'}>
					<div className={'sh-up py-3 px-3'}>
						<div className="d-flex bd-highlight">
							<Button classNames="container-md bd-highlight" variant="orng" htmlType="submit">
								<Typography type={'p1sb'} color={'white'}>
									Отправить
								</Typography>
							</Button>

							<Button classNames="d-md-none p-2 flex-shrink-1 bd-highlight" variant="orng">
								<Phone/>
							</Button>
						</div>
					</div>
				</div>
			</form>
		</Header>
	)
}
export default CreateRequest
