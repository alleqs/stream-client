
export type ViewState =
   | { type: 'Single', index: number }
   | { type: 'Multi' }

export type State = {
   _timerEnabled: boolean
   _freezedTime: number
   _pickedTags: string[]
   page: number
   camInfoArr: CamInfo[]
   timerEnabled: boolean
   pickedTags: string[]
   freezedTime: number
   camsPerView: number
   viewState: ViewState
   incr(): void
   decr(): void
   // toggleViewState(index?: number): void
}

export type CamInfo = {
   camNumber: number
   descr: string
   ar: string
   tags: string[]
}

export type DTO = {
   camInfoArr: Omit<CamInfo, 'camNumber'>[]
}

export type CamProps = {
   visible: boolean
   camNumber: number
   description: string
   ar: string
   index: number
}
