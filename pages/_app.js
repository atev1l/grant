import { Provider } from '../components/GeneralCtx'
import '../styles/global.scss'
import { Modal } from '../components/Modal'
import Head from 'next/head'
import App from 'next/app'
import { useCookie } from '../lib/hooks/useCookie'
import moment from 'moment'
// import { setLocale } from 'yup'
// import { useEffect } from 'react'

moment.locale('ru')

const MyApp = ({Component, pageProps, cookie, host}) => {

	const cookies = useCookie(cookie, host)

	// useEffect(() => {
	//
	// }, [])

	return (
		<>
			<Head>
				<title>
					Conva
				</title>
				<meta name="viewport" content="width=device-width, initial-scale=1"/>
				<meta name="theme-color" content={'#fff'}/>
			</Head>
			<Provider props={pageProps} ext={{profile: {token: cookies.get('access_token')}}}>
				<Modal/>
				<Component {...pageProps} />
			</Provider>
		</>
	)
}

MyApp.getInitialProps = async (appContext) => {

	const appProps = await App.getInitialProps(appContext)

	return {
		...appProps,
		cookie: appContext?.ctx?.req?.headers?.cookie,
		host: appContext?.ctx?.req?.headers?.host?.split(':')[0]
	}
}


export default MyApp
