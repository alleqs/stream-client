
export type ViewState =
   | { type: 'Single', index: number }
   | { type: 'Multi', index: number }

export type State = {
   _timerEnabled: boolean
   _freezedTime: number
   camInfoArr: CamInfo[]
   timerEnabled: boolean
   freezedTime: number
   camsPerView: number
   viewState: ViewState
   incr(): void
   decr(): void
   toggle(index: number): void
}

export type CamInfo = {
   camNumber: number
   description: string
   ar: string
}