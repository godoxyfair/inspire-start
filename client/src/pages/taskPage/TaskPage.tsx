import {
  useGetHabitsQuery,
  useDeleteHabitMutation,
  habitsApi,
  useCreateHabitMutation,
} from '@/api/habitsApi'
import { HabitStatus } from '@/api/types'
import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import InputComponent from '@/ui-kit/Input/InputComponent'
import { useForm } from 'react-hook-form'
import type { Player as LottiePlayer } from '@lottiefiles/react-lottie-player'
import ReactPaginate from 'react-paginate'
import { HabitsListItem } from '@/components/HabitListItem/HabitListItem'
import { CatAnimation } from '@/components/CatAnimation/CatAnimation'

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

  const [modalOpen, setModalOpen] = useState(false)

  const handleOpenModal = () => {
    setModalOpen((open) => !open)
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
            <HabitsListItem
              key={item.id}
              habit={item}
              onDeleteHabit={handleDeleteHabits}
            />
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
            pageCount={habitsData.totalPages}
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
      <CatAnimation
        catRef={catRef}
        isShowHertz={isShowHertz}
        isShowHertz2={isShowHertz2}
      />
    </div>
  )
}
function useAppDispatch() {
  throw new Error('Function not implemented.')
}
