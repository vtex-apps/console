export interface EventWithValue extends Event {
  value: any
  currentTarget: EventTargetWithValue
}

export interface EventTargetWithValue extends EventTarget {
  value: any
}
