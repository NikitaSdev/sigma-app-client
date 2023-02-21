import { useMutation } from '@tanstack/react-query'
import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { useAuth } from '../../../hooks/useAuth'

import AuthService from '../../../services/auth.service'

export const useAuthPage = () => {
	const [type, setType] = useState('login')
	const [nameShow, setNameShow] = useState(false)
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset
	} = useForm({
		mode: 'onChange'
	})

	const { isAuth, setIsAuth } = useAuth()
	const navigate = useNavigate()

	useEffect(() => {
		if (isAuth) {
			navigate('/')
		}
	}, [isAuth])

	const { mutate, isLoading } = useMutation(
		['auth'],
		({ email, password, name }) => AuthService.main( name, password,  email, type),
		{
			onSuccess: () => {
				setIsAuth(true)
				reset()
			}
		}
	)

	const onSubmit = data => {
		mutate(data)
	}

	return useMemo(
		() => ({
			nameShow,
			setNameShow,
			type,
			setType,
			register,
			handleSubmit,
			errors,
			isLoading,
			onSubmit
		}),
		[errors, isLoading]
	)
}
