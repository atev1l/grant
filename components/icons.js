import React from 'react'
import { colors } from '../lib/consts'

export const Cross = (
	{color = 'blck'}
) => (
	<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M18 6L6 18" stroke={colors[color]} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
		<path d="M6 6L18 18" stroke={colors[color]} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
	</svg>
)


export const ArrowDown = (
	{color = 'blck'}
) => (
	<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M6 9L12 15L18 9" stroke={colors[color]} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
	</svg>
)

export const AddFile = () => (
	<svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M15.937 6.68C15.926 6.648 15.917 6.617 15.904 6.586C15.855 6.48 15.794 6.379 15.708 6.293L9.708 0.293C9.622 0.207 9.521 0.146 9.415 0.0969999C9.385 0.0829999 9.353 0.0749999 9.321 0.0639999C9.237 0.0359999 9.151 0.018 9.062 0.013C9.04 0.011 9.021 0 9 0H2C0.897 0 0 0.897 0 2V18C0 19.103 0.897 20 2 20H14C15.103 20 16 19.103 16 18V7C16 6.979 15.989 6.96 15.987 6.938C15.982 6.85 15.965 6.764 15.937 6.68ZM12.586 6H10V3.414L12.586 6ZM2 18V2H8V7C8 7.553 8.447 8 9 8H14L14.002 18H2Z" fill="#DADCDE"/>
	</svg>
)
export const Notification = () => (
	<svg width="18" height="25" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M16 11.586V8C16 4.783 13.815 2.073 10.855 1.258C10.562 0.52 9.846 0 9 0C8.154 0 7.438 0.52 7.145 1.258C4.185 2.074 2 4.783 2 8V11.586L0.293 13.293C0.105 13.48 0 13.734 0 14V16C0 16.553 0.447 17 1 17H17C17.553 17 18 16.553 18 16V14C18 13.734 17.895 13.48 17.707 13.293L16 11.586ZM16 15H2V14.414L3.707 12.707C3.895 12.52 4 12.266 4 12V8C4 5.243 6.243 3 9 3C11.757 3 14 5.243 14 8V12C14 12.266 14.105 12.52 14.293 12.707L16 14.414V15ZM9 20C10.311 20 11.407 19.166 11.818 18H6.182C6.593 19.166 7.689 20 9 20Z" fill="#212221"/>
	</svg>

)
export const CircleCross = () => (
	<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M6.99992 0.333496C3.32392 0.333496 0.333252 3.32416 0.333252 7.00016C0.333252 10.6762 3.32392 13.6668 6.99992 13.6668C10.6759 13.6668 13.6666 10.6762 13.6666 7.00016C13.6666 3.32416 10.6759 0.333496 6.99992 0.333496ZM9.80459 8.86216L8.86192 9.80483L6.99992 7.94283L5.13792 9.80483L4.19525 8.86216L6.05725 7.00016L4.19525 5.13816L5.13792 4.1955L6.99992 6.0575L8.86192 4.1955L9.80459 5.13816L7.94258 7.00016L9.80459 8.86216Z" fill="white"/>
	</svg>

)
export const CircleCrossBlack = () => (
	<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M6.99967 0.333496C3.32367 0.333496 0.333008 3.32416 0.333008 7.00016C0.333008 10.6762 3.32367 13.6668 6.99967 13.6668C10.6757 13.6668 13.6663 10.6762 13.6663 7.00016C13.6663 3.32416 10.6757 0.333496 6.99967 0.333496ZM9.80434 8.86216L8.86167 9.80483L6.99967 7.94283L5.13767 9.80483L4.19501 8.86216L6.05701 7.00016L4.19501 5.13816L5.13767 4.1955L6.99967 6.0575L8.86167 4.1955L9.80434 5.13816L7.94234 7.00016L9.80434 8.86216Z" fill="#1F1F1F"/>
	</svg>
)

export const ArrowLeft = (
	{color = 'blck'}
) => (
	<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M15 5L9 11L15 17" stroke={colors[color]} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
	</svg>
)

export const Calendar = (
	{color = 'blck'}
) => (
	<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path
			d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z"
			stroke={colors[color]} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
		<path d="M16 2V6" stroke={colors[color]} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
		<path d="M8 2V6" stroke={colors[color]} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
		<path d="M3 10H21" stroke={colors[color]} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
	</svg>
)

export const CalendarStar = (
	{color = 'blck'}
) => (
	<svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M10.481 14.811L10.014 17.537L12.463 16.25L14.912 17.537L14.444 14.811L16.426 12.879L13.688 12.481L12.463 10L11.238 12.481L8.5 12.879L10.481 14.811Z" fill={colors[color]} />
		<path
			d="M19.5 4H17.5V2H15.5V4H9.5V2H7.5V4H5.5C4.397 4 3.5 4.897 3.5 6V20C3.5 21.103 4.397 22 5.5 22H19.5C20.603 22 21.5 21.103 21.5 20V6C21.5 4.897 20.603 4 19.5 4ZM19.502 20H5.5V8H19.5L19.502 20Z"
			fill={colors[color]}/>
	</svg>
)

export const CalendarEdit = (
	{color = 'blck'}
) => (
	<svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path
			d="M19.5 4H16.5V2H14.5V4H10.5V2H8.5V4H5.5C4.397 4 3.5 4.897 3.5 6V20C3.5 21.103 4.397 22 5.5 22H19.5C20.603 22 21.5 21.103 21.5 20V6C21.5 4.897 20.603 4 19.5 4ZM5.5 20V7H19.5V6L19.502 20H5.5Z"
			fill={colors[color]}/>
		<path
			d="M16.1279 12.1827L14.3279 10.3837L15.6979 9.0127L17.4979 10.8117L16.1279 12.1827ZM8.50488 16.2007V17.9997H10.3039L15.2799 13.0297L13.4809 11.2307L8.50488 16.2007Z"
			fill={colors[color]} />
	</svg>
)



export const Lens = (
	{color = 'blck'}
) => (
	<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path
			d="M10.27 17.5392C11.9476 17.5392 13.4897 16.9622 14.7202 16.0053L18.715 20L20 18.7151L16.0051 14.7204C16.963 13.4891 17.54 11.9471 17.54 10.2696C17.54 6.26133 14.2785 3 10.27 3C6.26151 3 3 6.26133 3 10.2696C3 14.2779 6.26151 17.5392 10.27 17.5392ZM10.27 4.8174C13.2771 4.8174 15.7225 7.26272 15.7225 10.2696C15.7225 13.2765 13.2771 15.7218 10.27 15.7218C7.26295 15.7218 4.8175 13.2765 4.8175 10.2696C4.8175 7.26272 7.26295 4.8174 10.27 4.8174Z"
			fill={colors[color]}/>
	</svg>
)

export const House = (
	{color = 'blck'}
) => (
	<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path
			d="M5.00299 22H9.00299H15.003H19.003C20.106 22 21.003 21.103 21.003 20V11C21.003 10.735 20.898 10.48 20.71 10.293L12.71 2.29301C12.319 1.90201 11.687 1.90201 11.296 2.29301L3.29599 10.293C3.10799 10.48 3.00299 10.735 3.00299 11V20C3.00299 21.103 3.89999 22 5.00299 22ZM10.003 20V15H14.003V20H10.003ZM5.00299 11.414L12.003 4.41401L19.003 11.414L19.004 20H16.003V15C16.003 13.897 15.106 13 14.003 13H10.003C8.89999 13 8.00299 13.897 8.00299 15V20H5.00299V11.414Z"
			fill={colors[color]}/>
	</svg>
)

export const DownloadDownArrow = (
	{color = 'orng'}
) => (

	<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M12 5V19" stroke={colors[color]} strokeWidth="1.83333" strokeLinecap="round" strokeLinejoin="round"/>
		<path
			d="M19 12L12 19L5 12"
			stroke={colors[color]}
			strokeWidth="1.83333"
			strokeLinecap="round"
			strokeLinejoin="round"/>
	</svg>
)

export const Phone = ({
	color = 'blck',
	withPlus = false
}) => (
	<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path
			d="M20.487 17.14L16.422 13.444C16.023 13.081 15.407 13.1 15.031 13.487L12.638 15.948C12.062 15.838 10.904 15.477 9.71204 14.288C8.52004 13.095 8.15904 11.934 8.05204 11.362L10.511 8.968C10.899 8.592 10.917 7.977 10.554 7.577L6.85904 3.513C6.49604 3.112 5.87904 3.074 5.46804 3.426L3.29804 5.287C3.12504 5.461 3.02204 5.691 3.00804 5.936C2.99304 6.186 2.70704 12.108 7.29904 16.702C11.305 20.707 16.323 21 17.705 21C17.907 21 18.031 20.994 18.064 20.992C18.309 20.978 18.539 20.875 18.712 20.701L20.572 18.53C20.926 18.119 20.887 17.503 20.487 17.14Z"
			fill={colors[color]}
		/>
		<path
			d="M18.2417 2.89499H16.2417V8.89499H18.2417V2.89499Z"
			fill={withPlus ? colors[color] : '#00000000'}
		/>
		<path
			d="M20.2417 6.89499L20.2417 4.89499L14.2417 4.89499L14.2417 6.89499L20.2417 6.89499Z"
			fill={withPlus ? colors[color] : '#00000000'}
		/>
	</svg>
)


export const SmallLogo = () => (
	<svg width="36" height="43" viewBox="0 0 36 43" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M2.86598 41.7808C-1.55196 31.5601 0.104768 18.0707 1.48537 12.6035L18.2252 35.2202C13.2205 35.2202 11.6673 35.5655 8.73356 38.5005C6.83523 40.3996 5.86757 42.644 4.59175 42.9893C4.24659 43.0469 3.41822 42.8857 2.86598 41.7808Z" fill="#F57301"/>
		<ellipse cx="18.3976" cy="17.61" rx="17.6027" ry="17.61" fill="#F57301"/>
		<ellipse cx="18.3976" cy="17.6105" rx="7.24817" ry="7.25116" fill="white"/>
	</svg>
)

export const LogoAuth = () => (

	<svg width="113" height="113" viewBox="0 0 113 113" fill="none" xmlns="http://www.w3.org/2000/svg">
		<g filter="url(#filter0_dd)">
			<circle cx="56.5" cy="56.5" r="52.5" fill="white"/>
		</g>
		<path
			d="M35.2989 87.1862C28.6721 71.9737 31.1571 51.896 33.228 43.7587L58.3374 77.4215C50.8305 77.4215 48.5008 77.9354 44.1002 82.3038C41.2527 85.1305 39.8012 88.4711 37.8875 88.985C37.3698 89.0707 36.1273 88.8308 35.2989 87.1862Z"
			fill="#F57301"/>
		<ellipse cx="58.5963" cy="51.2107" rx="26.4037" ry="26.2107" fill="#F57301"/>
		<ellipse cx="58.5962" cy="51.2106" rx="10.8721" ry="10.7926" fill="white"/>
		<defs>
			<filter
				id="filter0_dd" x="0" y="0" width="113" height="113" filterUnits="userSpaceOnUse"
				colorInterpolationFilters="sRGB">
				<feFlood floodOpacity="0" result="BackgroundImageFix"/>
				<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
				<feMorphology radius="4" operator="erode" in="SourceAlpha" result="effect1_dropShadow"/>
				<feOffset/>
				<feGaussianBlur stdDeviation="4"/>
				<feColorMatrix type="matrix" values="0 0 0 0 0.0941176 0 0 0 0 0.152941 0 0 0 0 0.294118 0 0 0 0.06 0"/>
				<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
				<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
				<feMorphology radius="4" operator="erode" in="SourceAlpha" result="effect2_dropShadow"/>
				<feOffset/>
				<feGaussianBlur stdDeviation="3"/>
				<feColorMatrix type="matrix" values="0 0 0 0 0.0941176 0 0 0 0 0.152941 0 0 0 0 0.294118 0 0 0 0.1 0"/>
				<feBlend mode="normal" in2="effect1_dropShadow" result="effect2_dropShadow"/>
				<feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow" result="shape"/>
			</filter>
		</defs>
	</svg>


)

export const Filter = (
	{color = 'blck'}
) => (
	<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path
			d="M13 5H22V7H13V5ZM2 7H9V9H11V3H9V5H2V7ZM9 17H22V19H9V17ZM19 11H22V13H19V11ZM17 15V9.012H15V11H2V13H15V15H17ZM7 21V15H5V17H2V19H5V21H7Z"
			fill={colors[color]}/>
	</svg>
)


export const Plus = (
	{color = 'blck'}
) => (
	<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M19 11H13V5H11V11H5V13H11V19H13V13H19V11Z" fill={colors[color]}/>
	</svg>
)

export const User = (
	{color = 'blck'}
) => (
	<svg width="27" height="27" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path
			d="M15 2.5C11.5538 2.5 8.75 5.30375 8.75 8.75C8.75 12.1962 11.5538 15 15 15C18.4462 15 21.25 12.1962 21.25 8.75C21.25 5.30375 18.4462 2.5 15 2.5ZM15 12.5C12.9325 12.5 11.25 10.8175 11.25 8.75C11.25 6.6825 12.9325 5 15 5C17.0675 5 18.75 6.6825 18.75 8.75C18.75 10.8175 17.0675 12.5 15 12.5ZM26.25 26.25V25C26.25 20.1763 22.3237 16.25 17.5 16.25H12.5C7.675 16.25 3.75 20.1763 3.75 25V26.25H6.25V25C6.25 21.5537 9.05375 18.75 12.5 18.75H17.5C20.9463 18.75 23.75 21.5537 23.75 25V26.25H26.25Z"
			fill={colors[color]}/>
	</svg>

)

export const PlusFile = (
	{color = 'blck'}
) => (
	<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path
			d="M19.937 8.68C19.926 8.648 19.917 8.617 19.904 8.586C19.855 8.48 19.794 8.379 19.708 8.293L13.708 2.293C13.622 2.207 13.521 2.146 13.415 2.097C13.385 2.083 13.353 2.075 13.321 2.064C13.237 2.036 13.151 2.018 13.062 2.013C13.04 2.011 13.021 2 13 2H6C4.897 2 4 2.897 4 4V20C4 21.103 4.897 22 6 22H18C19.103 22 20 21.103 20 20V9C20 8.979 19.989 8.96 19.987 8.938C19.982 8.85 19.965 8.764 19.937 8.68ZM16.586 8H14V5.414L16.586 8ZM6 20V4H12V9C12 9.553 12.447 10 13 10H18L18.002 20H6Z"
			fill={colors[color]}/>
		<path d="M13 11.3108H11V17.3108H13V11.3108Z" fill={colors[color]}/>
		<path d="M15 15.3108L15 13.3108L9 13.3108L9 15.3108L15 15.3108Z" fill={colors[color]}/>
	</svg>
)


export const CircleCheck = ({
	color = 'blck'
}) => (
	<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path
			d="M12 2C6.486 2 2 6.486 2 12C2 17.514 6.486 22 12 22C17.514 22 22 17.514 22 12C22 6.486 17.514 2 12 2ZM10.3311 16.4098L6.61809 12.7048L8.03009 11.2888L10.3291 13.5838L15.6231 8.28976L17.0371 9.70375L10.3311 16.4098Z"
			fill={colors[color]}/>
	</svg>
)


export const Bell = ({
	color = 'blck',
	active = false
}) => (
	<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path
			d="M19 13.586V10C19 6.783 16.815 4.073 13.855 3.258C13.562 2.52 12.846 2 12 2C11.154 2 10.438 2.52 10.145 3.258C7.185 4.074 5 6.783 5 10V13.586L3.293 15.293C3.105 15.48 3 15.734 3 16V18C3 18.553 3.447 19 4 19H20C20.553 19 21 18.553 21 18V16C21 15.734 20.895 15.48 20.707 15.293L19 13.586ZM19 17H5V16.414L6.707 14.707C6.895 14.52 7 14.266 7 14V10C7 7.243 9.243 5 12 5C14.757 5 17 7.243 17 10V14C17 14.266 17.105 14.52 17.293 14.707L19 16.414V17ZM12 22C13.311 22 14.407 21.166 14.818 20H9.182C9.593 21.166 10.689 22 12 22Z"
			fill={colors[color]}/>
		<circle cx="19.5" cy="4.5" r="4.5" fill={active ? '#EB5757' : '#00000000'}/>
	</svg>
)

export const ArrowDownload = ({
	color = 'blck',
}) => (
	<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M12 5V19" stroke={colors[color]} strokeWidth="1.83333" strokeLinecap="round" strokeLinejoin="round"/>
		<path
			d="M19 12L12 19L5 12"
			stroke={colors[color]}
			strokeWidth="1.83333"
			strokeLinecap="round"
			strokeLinejoin="round"/>
	</svg>
)


export const ThreeDots = ({
	color = 'blck',
}) => (
	<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path
			d="M12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10ZM12 4C10.9 4 10 4.9 10 6C10 7.1 10.9 8 12 8C13.1 8 14 7.1 14 6C14 4.9 13.1 4 12 4ZM12 16C10.9 16 10 16.9 10 18C10 19.1 10.9 20 12 20C13.1 20 14 19.1 14 18C14 16.9 13.1 16 12 16Z"
			fill={colors[color]}
		/>
	</svg>
)

export const Pencil = ({
	color = 'blck'
}) => (
	<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path
			d="M4.003 21C4.084 21 4.165 20.99 4.245 20.97L8.245 19.97C8.421 19.926 8.582 19.835 8.71 19.707L21.003 7.414C21.381 7.036 21.589 6.534 21.589 6C21.589 5.466 21.381 4.964 21.003 4.586L19.417 3C18.661 2.244 17.345 2.244 16.589 3L4.296 15.293C4.168 15.421 4.077 15.582 4.033 15.757L3.033 19.757C2.947 20.098 3.048 20.458 3.296 20.707C3.485 20.897 3.741 21 4.003 21ZM18.003 4.414L19.589 6L18.003 7.586L16.417 6L18.003 4.414ZM5.906 16.511L15.003 7.414L16.589 9L7.491 18.097L5.377 18.625L5.906 16.511Z"
			fill={colors[color]}/>
	</svg>
)

export const ArrowRight = ({
	color = 'blck'
}) => (
	<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path
			d="M9 18L15 12L9 6"
			stroke={colors[color]}
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"/>
	</svg>
)


export const Info = ({
	color = 'blck'
}) => (
	<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path
			d="M12 2.00001C6.486 2.00001 2 6.48601 2 12C2 17.514 6.486 22 12 22C17.514 22 22 17.514 22 12C22 6.48601 17.514 2.00001 12 2.00001ZM13 17H11V11H13V17ZM13 9.00001H11V7.00001H13V9.00001Z"
			fill={colors[color]}/>
	</svg>
)

export const ArrowUp = ({
	color = 'blck'
}) => (
	<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path
			d="M18 15L12 9L6 15"
			stroke={colors[color]}
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
)


export const Icon = ({
	color = 'blck'
}) => (
	<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path
			d="M19 3H5C3.897 3 3 3.897 3 5V19C3 20.103 3.897 21 5 21H19C20.103 21 21 20.103 21 19V5C21 3.897 20.103 3 19 3ZM5 19V5H19L19.002 19H5Z"
			fill={colors[color]}/>
		<path
			d="M10 13.9999L9 12.9999L6 16.9999H18L13 9.99995L10 13.9999Z"
			fill={colors[color]}/>
	</svg>
)


export const DescDrag = ({
	color = 'blck'
}) => (
	<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path
			d="M13.6364 18L18 13.6364" stroke={colors[color]}
			strokeWidth="2"
			strokeLinecap="round"/>
		<path
			d="M6 18L18 6" stroke={colors[color]}
			strokeWidth="2"
			strokeLinecap="round"/>
	</svg>
)


export const Mail = ({
	color = 'blck'
}) => (
	<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path
			d="M20 4H4C2.897 4 2 4.897 2 6V18C2 19.103 2.897 20 4 20H20C21.103 20 22 19.103 22 18V6C22 4.897 21.103 4 20 4ZM20 6V6.511L12 12.734L4 6.512V6H20ZM4 18V9.044L11.386 14.789C11.566 14.93 11.783 15 12 15C12.217 15 12.434 14.93 12.614 14.789L20 9.044L20.002 18H4Z"
			fill={colors[color]}/>
	</svg>
)

export const Login = ({
	color = 'blck'
}) => (
	<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path
			d="M10.998 16L15.998 12L10.998 8V11H1.99799V13H10.998V16Z"
			fill={colors[color]}/>
		<path
			d="M12.999 2.999C10.594 2.999 8.33401 3.936 6.63501 5.636L8.04901 7.05C9.37101 5.728 11.129 4.999 12.999 4.999C14.869 4.999 16.627 5.728 17.949 7.05C19.271 8.372 20 10.13 20 12C20 13.87 19.271 15.628 17.949 16.95C16.627 18.272 14.869 19.001 12.999 19.001C11.129 19.001 9.37101 18.272 8.04901 16.95L6.63501 18.364C8.33401 20.064 10.594 21.001 12.999 21.001C15.404 21.001 17.664 20.064 19.363 18.364C21.063 16.665 22 14.405 22 12C22 9.595 21.063 7.335 19.363 5.636C17.664 3.936 15.404 2.999 12.999 2.999Z"
			fill={colors[color]}/>
	</svg>
)

export const Invite = ({
	color = 'blck'
}) => (
	<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path
			d="M19 8H17V11H14V13H17V16H19V13H22V11H19V8ZM4 8C4 10.28 5.72 12 8 12C10.28 12 12 10.28 12 8C12 5.72 10.28 4 8 4C5.72 4 4 5.72 4 8ZM10 8C10 9.178 9.178 10 8 10C6.822 10 6 9.178 6 8C6 6.822 6.822 6 8 6C9.178 6 10 6.822 10 8ZM4 18C4 16.346 5.346 15 7 15H9C10.654 15 12 16.346 12 18V19H14V18C14 15.243 11.757 13 9 13H7C4.243 13 2 15.243 2 18V19H4V18Z"
			fill={colors[color]}/>
	</svg>
)


export const ArrowRightDownload = ({
	color = 'blck'
}) => (
	<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path
			d="M2.49997 9.16668L14.655 9.16668L10.2441 4.75585L11.4225 3.57751L17.845 10L11.4225 16.4225L10.2441 15.2442L14.655 10.8333L2.49997 10.8333L2.49997 9.16668Z"
			fill={colors[color]}/>
	</svg>
)


export const AppsIcon = ({
	color = 'blck'
}) => (
	<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path
			d="M12.5 3.75H5C4.30875 3.75 3.75 4.30875 3.75 5V12.5C3.75 13.1912 4.30875 13.75 5 13.75H12.5C13.1912 13.75 13.75 13.1912 13.75 12.5V5C13.75 4.30875 13.1912 3.75 12.5 3.75ZM11.25 11.25H6.25V6.25H11.25V11.25ZM25 3.75H17.5C16.8088 3.75 16.25 4.30875 16.25 5V12.5C16.25 13.1912 16.8088 13.75 17.5 13.75H25C25.6912 13.75 26.25 13.1912 26.25 12.5V5C26.25 4.30875 25.6912 3.75 25 3.75ZM23.75 11.25H18.75V6.25H23.75V11.25ZM12.5 16.25H5C4.30875 16.25 3.75 16.8088 3.75 17.5V25C3.75 25.6912 4.30875 26.25 5 26.25H12.5C13.1912 26.25 13.75 25.6912 13.75 25V17.5C13.75 16.8088 13.1912 16.25 12.5 16.25ZM11.25 23.75H6.25V18.75H11.25V23.75ZM21.25 16.25C18.4925 16.25 16.25 18.4925 16.25 21.25C16.25 24.0075 18.4925 26.25 21.25 26.25C24.0075 26.25 26.25 24.0075 26.25 21.25C26.25 18.4925 24.0075 16.25 21.25 16.25ZM21.25 23.75C19.8713 23.75 18.75 22.6287 18.75 21.25C18.75 19.8713 19.8713 18.75 21.25 18.75C22.6287 18.75 23.75 19.8713 23.75 21.25C23.75 22.6287 22.6287 23.75 21.25 23.75Z"
			fill={colors[color]}/>
	</svg>
)


export const EpicCalendar = ({
	color = 'blck'
}) => (
	<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path
			d="M3.74878 7.5V10V25C3.74878 26.3787 4.87003 27.5 6.24878 27.5H23.7488C25.1275 27.5 26.2488 26.3787 26.2488 25V10V7.5C26.2488 6.12125 25.1275 5 23.7488 5H21.2488V2.5H18.7488V5H11.2488V2.5H8.74878V5H6.24878C4.87003 5 3.74878 6.12125 3.74878 7.5ZM23.7513 25H6.24878V10H23.7488L23.7513 25Z"
			fill={colors[color]}/>
	</svg>
)



export const ExitIcon = ({
	color = 'blck'
}) => (
	<>
		<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M10.998 11.5H11.498V11V9.04031L15.1977 12L11.498 14.9597V13V12.5H10.998H2.49805V11.5H10.998Z"
				fill={colors[color]} stroke={colors[color]} />
			<path
				d="M19.0093 18.0104L19.0091 18.0106C17.4039 19.6168 15.2711 20.501 12.9988 20.501C10.894 20.501 8.9089 19.7423 7.35191 18.354L8.0603 17.6456C9.42724 18.8446 11.1636 19.501 12.9988 19.501C15.0015 19.501 16.8866 18.7193 18.3023 17.3036C19.718 15.8879 20.4998 14.0028 20.4998 12C20.4998 9.99728 19.718 8.11214 18.3023 6.69647C16.8866 5.2808 15.0015 4.49902 12.9988 4.49902C11.1636 4.49902 9.42724 5.15542 8.0603 6.35445L7.35191 5.64606C8.9089 4.25771 10.894 3.49902 12.9988 3.49902C15.2711 3.49902 17.4039 4.38329 19.0091 5.98947L19.0093 5.98968C20.6155 7.59492 21.4998 9.72771 21.4998 12C21.4998 14.2723 20.6155 16.4051 19.0093 18.0104Z"
				fill="#212221"
				stroke={colors[color]} />
		</svg>
	</>
)


export const Message = ({
	color = 'blck',
}) => (
	<svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path
			d="M13.8327 2.16699H7.16602C4.40852 2.16699 2.16602 4.40949 2.16602 7.16699V17.167C2.16602 17.388 2.25381 17.6 2.41009 17.7562C2.56637 17.9125 2.77834 18.0003 2.99935 18.0003H13.8327C16.5902 18.0003 18.8327 15.7578 18.8327 13.0003V7.16699C18.8327 4.40949 16.5902 2.16699 13.8327 2.16699ZM17.166 13.0003C17.166 14.8387 15.671 16.3337 13.8327 16.3337H3.83268V7.16699C3.83268 5.32866 5.32768 3.83366 7.16602 3.83366H13.8327C15.671 3.83366 17.166 5.32866 17.166 7.16699V13.0003Z"
			fill={colors[color]}/>
	</svg>
)
