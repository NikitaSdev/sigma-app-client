import React, { useEffect, useMemo } from 'react'

import { useAuthPage } from './useAuthPage'

import Layout from '../../layout/Layout.jsx'
import Button from '../../ui/button/Button.jsx'
import Field from '../../ui/field/Field.jsx'


import styles from './Auth.module.scss'
import Loader from "../../ui/Loader.jsx";

const Auth = () => {
	const {
		setNameShow,
		errors,
		handleSubmit,
		isLoading,
		onSubmit,
		setType,
		register,
		nameShow
	} = useAuthPage()

	return (
		<>
			<Layout heading={'Log in'} bgImage={'/images/auth.jpg'} />
			<div className={'wrapper-inner-page'}>
				{isLoading && <Loader />}
				<form onSubmit={handleSubmit(onSubmit)}>
					<Field
						error={errors?.email?.message}
						name={'email'}
						type='text'
						register={register}
						placeholder={'Enter email'}
						options={{ required: 'Email is required' }}
					/>
					<Field
						error={errors?.password?.message}
						name={'password'}
						type='password'
						register={register}
						placeholder={'Enter password'}
						options={{
							required: 'Password is required'
						}}
					/>
					{nameShow ? (
						<Field
							error={errors?.name?.message}
							name={'name'}
							type='name'
							register={register}
							placeholder={'Enter your name'}
							options={{ required: 'Name is required' }}
						/>
					) : null}
					<div className={styles.wrapperButtons}>
						<Button clickHandler={() => setType('login')}>Log in</Button>
						<Button
							clickHandler={() => {
								setType('register')
								setNameShow(true)
							}}
						>
							Register
						</Button>
					</div>
				</form>
			</div>
		</>
	)
}

export default Auth
