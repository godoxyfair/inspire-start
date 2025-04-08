import { forwardRef, useState } from 'react'
import './checkbox.css'

export type CheckboxProps = {
  // checked: boolean
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  label?: string
  disabled?: boolean
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ disabled = false, onChange, ...props }: CheckboxProps, ref) => {
    return (
      <label className={`checkbox ${disabled ? 'checkbox--disabled' : ''}`}>
        <input
          type="checkbox"
          // checked={props.checked}
          onChange={onChange}
          disabled={disabled}
          {...props}
        />
        <span className="checkbox__label">{props.label}</span>
      </label>
    )
  },
)
