/* eslint-disable @typescript-eslint/no-var-requires */
const withPWA = require('next-pwa')
const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

const composer = plugins => ({
	webpack(config, options) {
		return plugins.reduce((config, plugin) => {
			if (plugin instanceof Array) {
				const [_plugin, ...args] = plugin
				plugin = _plugin(...args)
			}
			if (plugin instanceof Function) {
				plugin = plugin()
			}
			if (plugin && plugin.webpack instanceof Function) {
				return plugin.webpack(config, options)
			}
			return config
		}, config)
	},

	webpackDevMiddleware(config) {
		return plugins.reduce((config, plugin) => {
			if (plugin instanceof Array) {
				const [_plugin, ...args] = plugin
				plugin = _plugin(...args)
			}
			if (plugin instanceof Function) {
				plugin = plugin()
			}
			if (plugin && plugin.webpackDevMiddleware instanceof Function) {
				return plugin.webpackDevMiddleware(config)
			}
			return config
		}, config)
	}
})


const pc = {
	pwa: {
		dest: './public',
		register: true,
		skipWaiting: true,
	}
}

const withGQL = (nextConfig = {}) => {
	return Object.assign({}, nextConfig, {
		webpack(config, options) {
			if (!options.defaultLoaders) {
				throw new Error(
					'This plugin is not compatible with Next.js versions below 5.0.0 https://err.sh/next-plugins/upgrade'
				)
			}

			const { dir } = options

			config.module.rules.push({
				test: /\.(graphql|gql)$/,
				include: [dir],
				exclude: /node_modules/,
				use: [
					{
						loader: 'graphql-tag/loader'
					}
				]
			})

			if (typeof nextConfig.webpack === 'function') {
				return nextConfig.webpack(config, options)
			}

			return config
		}
	})
}

module.exports = (phase) => {
	const plugins = [
		withGQL
	]
	if (phase === PHASE_DEVELOPMENT_SERVER)
		return composer(plugins)
	return composer([
		[withPWA, pc],
		withGQL
	])
}
