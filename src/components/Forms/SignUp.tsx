import React, { FC, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

import { SignUpFields } from '../../types'
import { userDTO } from '../../redux/reducers/user'
import Form from '../../pages/SignPage/Form'
import Interests from '../Interests'
import Input from '../Input'
import { ValidateEmail } from '../../services/ValidateEmail'
import { ValidateUserName } from '../../services/ValidateUserName'
import s from '../../pages/SignPage/Form.module.scss'
import { registerUser } from '../../services/registerUser'
import { RootState } from '../../redux/store'

const SignUp: FC = () => {
  const interests = useSelector((state: RootState) => state.userInterestReducer)
  const { control, handleSubmit, register, setError, clearErrors } =
    useForm<SignUpFields>({
      defaultValues: {
        email: '',
        password: '',
        firstname: '',
        lastname: '',
        age: '',
        city: '',
        username: '',
        aboutUser: ''
      }
    })
  const [serverValidate, setServerValidate] = useState(false)
  const [serverEmailValidate, setServerEmailValidate] = useState(false)
  const dispatch = useDispatch()

  const onSubmit: SubmitHandler<SignUpFields> = async (data) => {
    const user = {
      password: data.password,
      userDto: {
        id: 0,
        firstName: data.firstname,
        lastName: data.lastname,
        middleName: 'string',
        username: data.username,
        role: 'ROLE_USER',
        email: data.email,
        city: data.city,
        aboutUser: data.aboutUser,
        userInterests: interests
      }
    }
    registerUser(JSON.stringify(user)).then((user) => dispatch(userDTO(user)))
  }
  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      title="Создание пользователя"
      dontHasAccount="Уже есть пользователь ?"
      eyeCatching="Авторизуйся"
      imageName="new"
      submitText="Sign Up"
      redirectTo="/sign-in"
    >
      <div className={s.rowHalf}>
        <Controller
          control={control}
          name="lastname"
          rules={{
            required: true,
            pattern: {
              value: /[а-яa-z]/gi,
              message: 'Invalid lastname'
            }
          }}
          render={({ field: { ref, ...field }, fieldState: { error } }) => {
            return (
              <div>
                <Input {...field} placeholder="Фамилия" />
                {error && error.message}
              </div>
            )
          }}
        />

        <Controller
          control={control}
          name="firstname"
          rules={{
            required: true,
            pattern: {
              value: /[а-яa-z]/gi,
              message: 'Invalid firstname'
            }
          }}
          render={({ field: { ref, ...field }, fieldState: { error } }) => {
            return (
              <div>
                <Input {...field} placeholder="Имя" />
                {error && error.message}
              </div>
            )
          }}
        />
      </div>
      <Controller
        control={control}
        name="email"
        rules={{
          required: true,
          pattern: {
            value: /\w+@\w+\.\w+/gi,
            message: 'Your email should be valid'
          },
          onChange: () => clearErrors('email'),
          onBlur: (e: React.FocusEvent<HTMLInputElement>) => {
            console.log(e.target.value)
            if (ValidateEmail(e.target.value)) {
              setServerEmailValidate(true)
            } else {
              setServerEmailValidate(false)
              setError('email', {
                message: 'Данный email уже занят'
              })
            }
          }
        }}
        render={({ field: { ref, ...field }, fieldState: { error } }) => {
          return (
            <>
              <Input
                {...field}
                placeholder="Почта"
                serverValidate={serverEmailValidate}
              />
              {error && error.message}
            </>
          )
        }}
      />
      <Controller
        control={control}
        name="password"
        rules={{
          required: true
          // pattern: {
          //   value: /(\w|\d){3, 20}/,
          //   message: 'Invalid password'
          // }
        }}
        render={({ field: { ref, ...field }, fieldState: { error } }) => {
          return (
            <>
              <Input {...field} placeholder="Пароль" />
              {error && error.message}
            </>
          )
        }}
      />
      <Controller
        control={control}
        name="username"
        rules={{
          required: true,
          pattern: {
            value: /[а-яa-z]/gi,
            message: 'Invalid username'
          },
          onChange: () => clearErrors('username'),
          onBlur: (e: React.FocusEvent<HTMLInputElement>) => {
            if (ValidateUserName(e.target.value)) {
              setServerValidate(true)
            } else {
              setServerValidate(false)
              setError('username', {
                message: 'Данное имя уже занято'
              })
            }
          }
        }}
        render={({ field: { ref, ...field }, fieldState: { error } }) => {
          return (
            <>
              <Input
                {...field}
                placeholder="Username"
                serverValidate={serverValidate}
              />
              {error && error.message}
            </>
          )
        }}
      />
      <div className={s.rowHalf}>
        <Controller
          control={control}
          name="city"
          rules={{
            required: true
          }}
          render={({ field: { ref, ...field }, fieldState: { error } }) => {
            return (
              <>
                <Input {...field} placeholder="Город" />
                {error && error.message}
              </>
            )
          }}
        />
        <Controller
          control={control}
          name="age"
          rules={{
            required: true
          }}
          render={({ field: { ref, ...field }, fieldState: { error } }) => {
            return (
              <>
                <Input {...field} placeholder="Возраст" />
                {error && error.message}
              </>
            )
          }}
        />
      </div>
      <Controller
        control={control}
        name="aboutUser"
        render={({ field: { ref, ...field }, fieldState: { error } }) => {
          return (
            <>
              <label className={s.areaLabel}>
                <span className={s.dontHasAccount}>О себе</span>
                <textarea
                  className={s.area}
                  placeholder="Например: Увлекаюсь настольными играми и люблю активный отдых на природе"
                  {...register('aboutUser')}
                ></textarea>
              </label>
              {error && error.message}
            </>
          )
        }}
      />
      <Interests />
    </Form>
  )
}

export default SignUp
