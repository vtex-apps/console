import { Option } from '../../../../../common/utils'


export const noOp = () => undefined

export const mapTime = {
  'Days': 'd',
  'Hours': 'h',
  'Minutes': 'm',
  'Months': 'M',
  'Seconds': 's',
  'Years': 'y',
}

export const stepModifierOptions: Option[] = [
  { value: 'Full', label: 'console.rangeStepPicker.stepModifier.full' },
  { value: 'Seconds', label: 'console.rangeStepPicker.stepModifier.seconds' },
  { value: 'Minutes', label: 'console.rangeStepPicker.stepModifier.minutes' },
  { value: 'Hours', label: 'console.rangeStepPicker.stepModifier.hours' },
  { value: 'Days', label: 'console.rangeStepPicker.stepModifier.days' },
  { value: 'Months', label: 'console.rangeStepPicker.stepModifier.months' },
  { value: 'Years', label: 'console.rangeStepPicker.stepModifier.years' },
]
export const mapTimeInverse = {
  'M': 'Months',
  'd': 'Days',
  'h': 'Hours',
  'm': 'Minutes',
  's': 'Seconds',
  'y': 'Years',
}
