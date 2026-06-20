export interface DeviceState {
  on?: boolean
  [key: string]: any
}

export interface Device {
  id: string
  name: string
  type: string
  state: DeviceState
}