export const TransitionsModal = {
	initial: {
		opacity: 0,
		y: -30,
	},
	stable: {
		opacity: 1,
		y: 0,
	},
	transition: {
		duration: 0.5
	},
	exit: {
		opacity: 0,
		y: 30
	},
	rotate: {
		rotate: 180
	},
	initialRotate: {
		rotate: 0
	},
	hide: {
		opacity: 0
	},
	hideDescription: {
		opacity: 0,
		width: '0vw',
		height: '0vh',
	},
	openDescription: {
		opacity: 1,
		width: '100%',
		height: '100%',
	},
}
