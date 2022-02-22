import Document, { Head, Html, Main, NextScript } from 'next/document'

class AppDocument extends Document {

	componentDidMount() {
		if ('serviceWorker' in navigator) {
			window.addEventListener('load', function() {
				navigator.serviceWorker
					.register('/sw.js', {scope: '/'})
					.then(function(registration) {
						console.log('SW registered: ', registration)
					})
					.catch(function(registrationError) {
						console.log('SW registration failed: ', registrationError)
					})
			})
		}
	}

	render() {
		return (
			<Html>
				<Head title={''}>
					<link rel="apple-touch-icon" href={'/logo-512.png'}/>
					<link rel="manifest" href={'/manifest.json'}/>
				</Head>
				<body>
					<Main/>
					<NextScript/>
				</body>
			</Html>
		)
	}
}

export default AppDocument
