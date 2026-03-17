import axios from 'axios'
import {
	USER_REGISTER_REQUEST,
	USER_REGISTER_SUCCESS,
	USER_REGISTER_FAIL,
	USER_REGISTER_RESET,
} from '../constants/userRegisterConstants'

export const register = (userData) => async (dispatch) => {
	try {
		dispatch({ type: USER_REGISTER_REQUEST })

		// Ensure username is set if empty (backend allows null/blank)
		const payload = {
			...userData,
			username: userData.username || userData.email.split('@')[0],
		}

		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		}

		console.log('[REGISTER REQUEST]', payload)

		const { data } = await axios.post('http://127.0.0.1:8000/api/register/', payload, config)

		console.log('[REGISTER SUCCESS]', data)
		dispatch({ type: USER_REGISTER_SUCCESS, payload: data })
	} catch (error) {
		console.error('[REGISTER ERROR]', error.response?.data || error.message)
		const errorData = error.response?.data

		let errorMessage = 'Registration failed. Please try again.'

		if (typeof errorData === 'string') {
			errorMessage = errorData
		} else if (errorData && typeof errorData === 'object') {
			const firstError = Object.values(errorData)[0]
			if (Array.isArray(firstError) && firstError.length > 0) {
				errorMessage = firstError[0]
			} else if (typeof firstError === 'string') {
				errorMessage = firstError
			}
		}

		dispatch({
			type: USER_REGISTER_FAIL,
			payload: errorMessage,
		})
	}
}

export const resetRegister = () => (dispatch) => {
	dispatch({ type: USER_REGISTER_RESET })
}
