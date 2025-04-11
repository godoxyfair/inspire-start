import {
  useGetHabitsQuery,
  useDeleteHabitMutation,
  habitsApi,
  useCreateHabitMutation,
} from '@/api/habitsApi'
import { HabitStatus } from '@/api/types'
import { Checkbox } from '@/ui-kit/Checkbox/Checkbox'
import { Player } from '@lottiefiles/react-lottie-player'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import animationData from './Animation - 1744053915834.json'
import animationHertz from './Animation - hertz.json'
import animationHertz2 from './Animation - hertz2.json'
import InputComponent from '@/ui-kit/Input/InputComponent'
import { useForm } from 'react-hook-form'
import type { Player as LottiePlayer } from '@lottiefiles/react-lottie-player'
import ReactPaginate from 'react-paginate'

type FormInputs = {
  title: string
}

export const TaskPage: React.FC = () => {
  const dispatch = useDispatch()
  const [currentPage, setCurrentPage] = useState(0)
  const { data: habitsData, isLoading } = useGetHabitsQuery({
    page: currentPage + 1,
    limit: 6,
  })
  const [deleteHabit, { isLoading: deleteLoading }] = useDeleteHabitMutation()
  const [createHabit, { isLoading: createHabitLoading, isSuccess }] =
    useCreateHabitMutation()

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
    setError,
    getValues,
    clearErrors,
    watch,
  } = useForm<FormInputs, FormInputs>({
    reValidateMode: 'onSubmit',
  })

  const handlePageChange = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected)
  }

  const handleDeleteHabits = async (id: string) => {
    try {
      const fn = await deleteHabit({ id }).unwrap()
      showHertz()
      dispatch(
        habitsApi.util.invalidateTags([
          {
            type: 'HabitsList',
          },
        ]),
      )
    } catch (error) {
      console.error(error)
    }
  }

  const onSubmit = async (formData: FormInputs) => {
    try {
      const fn = await createHabit({
        title: formData.title,
        status: HabitStatus.TODO,
      }).unwrap()
      showHert2()
      setCurrentPage(0)
      dispatch(
        habitsApi.util.invalidateTags([
          {
            type: 'HabitsList',
          },
        ]),
      )
    } catch (error) {
      console.error(error)
    }
  }

  const catRef = useRef<LottiePlayer | null>(null)
  const [isTyping, setIsTyping] = useState(false)
  const typingTimeout = useRef<NodeJS.Timeout | null>(null)
  const [isShowHertz, setShowHertz] = useState(false)
  const [isShowHertz2, setShowHertz2] = useState(false)

  const showHertz = () => {
    setShowHertz(true)
    catRef.current?.play()
    setTimeout(() => {
      setShowHertz(false)
      catRef.current?.stop()
    }, 4000)
  }
  const showHert2 = () => {
    setShowHertz2(true)
    catRef.current?.play()
    setTimeout(() => {
      setShowHertz2(false)
      catRef.current?.stop()
    }, 4000)
  }

  const handleTyping = () => {
    if (!isTyping) {
      setIsTyping(true)
      catRef.current?.play()
    }

    if (typingTimeout.current) clearTimeout(typingTimeout.current)

    typingTimeout.current = setTimeout(() => {
      setIsTyping(false)
      catRef.current?.stop()
    }, 800)
  }

  return (
    <div className="grid grid-cols-[1fr_1fr] overflow-hidden place-content-center">
      <div className="py-[10px] px-[24px] flex flex-col flex-wrap place-content-center w-full">
        <h1 className="font-black font-stretch-100%">New task</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-row justify-between gap-2 items-end py-[8px] px-[16px]"
        >
          <InputComponent
            {...register('title', {
              onChange: () => {
                clearErrors('title')
                handleTyping()
              },
            })}
            error={errors.title}
            placeholder="New task"
            id="title"
            type="text"
          />
          <div className="flex justify-end">
            <button
              className="btn-custom variant-primary h-12 w-12 flex items-center justify-center"
              type="submit"
              title="Add"
            >
              Add
            </button>
          </div>
        </form>
        <ul>
          {habitsData?.data.map((item) => (
            <li
              key={item.id}
              className="justify-between py-[8px] px-[16px] flex items-center gap-2 min-w-[300px] max-w-[500px]"
            >
              <span className="flex gap-2">
                <div className="flex-shrink-0 w-10 h-10 bg-neutral-500 rounded-full"></div>
                <div className="flex items-center">
                  <span className="line-clamp-2">{item.title}</span>
                </div>
              </span>
              <Checkbox
                onChange={(e) => {
                  if (e.target.checked) {
                    handleDeleteHabits(item.id)
                  }
                }}
              />
            </li>
          ))}
        </ul>
        {habitsData && (
          <ReactPaginate
            breakLabel="..."
            nextLabel="»"
            previousLabel="«"
            onPageChange={handlePageChange}
            pageRangeDisplayed={1}
            marginPagesDisplayed={1}
            pageCount={habitsData.totalPages} // общее количество страниц
            forcePage={currentPage}
            disabledLinkClassName="bg-neutral-200"
            activeLinkClassName="variant-accent"
            containerClassName="flex flex-row gap-2 py-[8px] px-[16px] justify-center"
            pageClassName="h-10 w-10 cursor-pointer"
            pageLinkClassName="flex btn-custom variant-primary flex justify-center items-center w-full h-full"
            previousClassName="h-10 w-10 cursor-pointer"
            previousLinkClassName="btn-custom variant-primary flex justify-center items-center w-full h-full"
            nextClassName="h-10 w-10 cursor-pointer"
            nextLinkClassName="btn-custom variant-primary flex justify-center items-center w-full h-full"
          />
        )}
      </div>
      <div className="relative py-[10px] px-[24px]">
        {(isShowHertz || isShowHertz2) && (
          <Player
            src={isShowHertz2 ? animationHertz2 : animationHertz}
            autoplay
            loop
            style={{ height: '100px', width: '100px' }}
            className="absolute right-[24px]"
          />
        )}
        <Player
          ref={catRef}
          src={animationData}
          autoplay={false}
          loop
          style={{ height: '500px', width: '500px' }}
        />
      </div>
    </div>
  )
}
function useAppDispatch() {
  throw new Error('Function not implemented.')
}
