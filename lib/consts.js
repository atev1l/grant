export const roles = [
	'None',
	'Organizer',
	'Admin'
]

export const colors = {
	blck: '#212221',
	orng: '#F57301',
	rd: '#FA9FA8',
	wht: '#fff',
	lght: '#F6F6F6',
	lgr: '#DADCDE',
	gry: '#B4B6B8',
	grn: '#27AE60',
	drd: '#EB5757'
}

export const fontWeights = {
	bold: 'PXB',
	normal: 'PXR',
	semib: 'PXS',
}

export const statusEvent = {
	COMPLETED: 'Завершена',
	ONGOING: 'Идёт',
	OPENING: 'Открытие мероприятия',
	RECEPTION: 'Регистрация заявок',
}

export const statusRequest = {
	AWAIT_VERIFY: 'Ожидает подтвеждения',
	NEED_CORRECTION: 'Требуются корректировки',
	PAY_AWAIT: 'Ожидает оплаты',
	COMPLETED: 'Подтверждена',
	ARRIVED: 'Посетил',
	DENIED: 'Отклонена',
}

export const statusRequestColor = {
	AWAIT_VERIFY: 'drd',
	NEED_CORRECTION: 'drd',
	PAY_AWAIT: 'orng',
	COMPLETED: 'grn',
	ARRIVED: 'grn',
	DENIED: 'drd',
}

export const requestType = {
	PARTICIPANT: 'Участник',
	SPEAKER: 'Докладчик'
}

export const profileMemberType = {
	STUDENT: 'Студент',
	TEACHER: 'Преподаватель',
	OTHER: 'Другое',
}
