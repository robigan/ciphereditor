
import './select.scss'
import { ChangeEventHandler } from 'react'
import { ReactComponent as DoubleChevronIcon } from 'icons/chevron-double.svg'
import { useClassNames } from 'hooks/useClassNames'

export type SelectViewOptionElement = {
  type: 'option'
  value: string|number
  label: string
}

export type SelectViewGroupElement = {
  type: 'group'
  label: string
  elements: (SelectViewOptionElement|SelectViewDividerElement)[]
}

export type SelectViewDividerElement = {
  type: 'divider'
}

export type SelectViewElement =
  SelectViewOptionElement|SelectViewGroupElement|SelectViewDividerElement

export default function SelectView(props: {
  elements: SelectViewElement[]
  value?: string|number
  valueLabel?: string
  onChange?: ChangeEventHandler<HTMLSelectElement>
  modifiers?: string[]
}) {
  return (
    <div
      className={useClassNames('select', props.modifiers)}
      onMouseDown={(event) => event.stopPropagation()}
    >
      <select
        className="select__control"
        value={props.value !== undefined ? props.value : ''}
        onChange={props.onChange}
      >
        {(props.value === undefined) && (
          <option value="" disabled>{props.valueLabel}</option>
        )}
        {props.elements.map(renderElement)}
      </select>
      <div className="select__value">
        {props.valueLabel || 'Select'}
      </div>
      <div className="select__chevron">
        <DoubleChevronIcon />
      </div>
    </div>
  )
}

function renderElement(element: SelectViewElement, index: number) {
  switch (element.type) {
    case 'option':
      return (
        <option key={index} value={element.value}>
          {element.label}
        </option>
      )
    case 'divider':
      return (
        <option key={index} disabled>
          {'-'}
        </option>
      )
    case 'group':
      return (
        <optgroup key={index} label={element.label}>
          {element.elements.map(renderElement)}
        </optgroup>
      )
  }
}