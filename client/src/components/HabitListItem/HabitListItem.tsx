import { HabitsDTO } from '@/api/types'
import { Checkbox } from '@/ui-kit/Checkbox/Checkbox'
import { Modal } from '@/ui-kit/Modal/Modal'
import { useState } from 'react'

type Props = {
  habit: HabitsDTO
  onDeleteHabit: (id: string) => void
}

export const HabitsListItem: React.FC<Props> = (props) => {
  const { habit, onDeleteHabit } = props
  const [modalOpen, setModalState] = useState(false)

  const handleModal = () => {
    setModalState((open) => !open)
  }

  return (
    <li className="justify-between py-[8px] px-[16px] flex items-center gap-2 min-w-[300px] max-w-[500px]">
      <span className="flex gap-2 items-center" onClick={handleModal}>
        <div className="flex-shrink-0 w-10 h-10 bg-neutral-500 rounded-full"></div>
        <div className="flex items-center">
          <span className="line-clamp-2">{habit.title}</span>
        </div>
      </span>
      <Modal title="Edit Task" onClose={handleModal} isOpen={modalOpen}>
        <div>{habit.title}</div>
        <div>{habit.status}</div>
      </Modal>
      <Checkbox
        onChange={(e) => {
          if (e.target.checked) {
            onDeleteHabit(habit.id)
          }
        }}
        accent
      />
    </li>
  )
}
