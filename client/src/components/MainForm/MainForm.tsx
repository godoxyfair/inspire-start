import React, { useEffect, useState } from 'react'
import InputComponent from '../Input/InputComponent'
import { useForm } from 'react-hook-form'
import SelectComponent from '../Input/SelectComponent'
import { AuthRequestDtoValidationSchema } from './authValidation'
import { useGetHabitsQuery } from '@/api/habitsApi'

type Props = {}

type FormInputs = {
  firstName: string
  lastName: string
  email: string
  password: string
  country: string
  city: string
}

type Country = {
  name: {
    common: string
  }
}[]

const MainForm: React.FC<Props> = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
    getValues,
    clearErrors,
    watch,
  } = useForm<FormInputs, FormInputs>({
    reValidateMode: 'onSubmit',
    resolver: AuthRequestDtoValidationSchema,
  })

  const { data: habitsData, isLoading } = useGetHabitsQuery()

  const [optionsData, setoptionsData] = useState<Array<string>>([])
  const [cities, setCities] = useState<Array<string>>([])

  const onSubmit = (formData: FormInputs) => {
    console.log(formData)
  }

  return (
    <div className="grid place-content-center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-2">
          <InputComponent
            type="text"
            autoComplete="name"
            placeholder="First Name"
            id="first-name"
            label="First Name"
            {...register('firstName', {
              onChange: () => clearErrors('lastName'),
            })}
            error={errors.firstName}
          />
          <InputComponent
            type="text"
            autoComplete="name"
            placeholder="Last Name"
            id="last-name"
            label="Last Name"
            {...register('lastName', {
              onChange: () => clearErrors('lastName'),
            })}
            error={errors.lastName}
          />
          <InputComponent
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            id="email"
            label="Email"
            {...register('email', {
              onChange: () => clearErrors('email'),
            })}
            error={errors.email}
          />
          <InputComponent
            type="password"
            autoComplete="password"
            placeholder="Password"
            id="password"
            label="Password"
            {...register('password', {
              onChange: () => clearErrors('password'),
            })}
            error={errors.password}
          />
          <span className="col-span-2">
            <SelectComponent
              type="text"
              autoComplete="country"
              placeholder="Country"
              id="country"
              label="Country"
              defaultValue={''}
              {...register('country', {
                onChange: () => clearErrors('country'),
              })}
              error={errors.country}
              optionsData={optionsData.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            />
          </span>
          <span className="col-span-2">
            <SelectComponent
              label="City"
              id="city"
              type="text"
              defaultValue={''}
              placeholder="City"
              autoComplete="city"
              {...register('city', {
                onChange: () => clearErrors('city'),
              })}
              disabled={!watch('country') || !!errors.country}
              error={errors.city}
              optionsData={
                cities
                  ? cities.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))
                  : []
              }
            />
          </span>
          <button
            className="btn-custom variant-primary col-span-full"
            type="submit"
            title="Login"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  )
}

MainForm.displayName = 'MainForm'

export default MainForm
