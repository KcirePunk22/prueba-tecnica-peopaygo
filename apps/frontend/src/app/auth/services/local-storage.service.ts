export const SetToken = (token: string) => {
	localStorage.setItem('token', token)
}

export const VerifyToken = () => {
	return localStorage.getItem('token')
}
