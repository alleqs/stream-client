import { camsPerView, defaultFreezedTime, defaultTimerEnabled } from './constants';
import type { CamInfo, State } from './types';
import { proxy } from 'valtio';

const request = new XMLHttpRequest();
request.open("GET", "/stream/cams", false);
request.send(null);
const { camDescrArr }: { camDescrArr: [description: string, ar: string][] } = JSON.parse(request.responseText);
console.log('camDescrArr :>> ', camDescrArr);
const camInfoArr: CamInfo[] = camDescrArr.map(([description, ar], camNumber) => ({ description, camNumber, ar }));
const camsAmount = camInfoArr.length;

let interval = -1

const init: State = {
   _timerEnabled: getTimerEnabled(),
   _freezedTime: getFreezedTime(),
   camInfoArr,
   get timerEnabled() { return this._timerEnabled },
   set timerEnabled(enabled) {
      // if (enabled !== this._timerEnabled) {
      if (enabled) {
         clearInterval(interval);
         interval = setInterval(() => this.incr(), this._freezedTime * 1000);
      }
      localStorage.setItem('timerEnabled', `${enabled}`);
      this._timerEnabled = enabled;
      // }
   },
   get freezedTime() { return this._freezedTime },
   set freezedTime(fTime) {
      if (fTime !== this._freezedTime) {
         if (this.timerEnabled) {
            clearInterval(interval);
            interval = setInterval(() => this.incr(), fTime * 1000);
         }
         localStorage.setItem('freezedTime', `${fTime}`);
         this._freezedTime = fTime;
      }
   },
   camsPerView: camsPerView,
   viewState: { type: 'Multi', index: 0 },
   incr() {
      if (this.viewState.type === 'Multi') {
         this.viewState.index =
            (this.viewState.index + this.camsPerView) % (Math.ceil(camsAmount / this.camsPerView) * this.camsPerView)
      }
   },
   decr() {
      if (this.viewState.type === 'Multi') {
         const adjLength = Math.ceil(camsAmount / this.camsPerView) * this.camsPerView
         this.viewState.index =
            (this.viewState.index - this.camsPerView + adjLength) % adjLength
      }
   },
   toggle(index) {
      this.viewState.type === 'Single'
         ? this.viewState = { type: 'Multi', index: Math.floor(index / this.camsPerView) * this.camsPerView }
         : this.viewState = { type: 'Single', index }
   }
}

if (init.timerEnabled) init.timerEnabled = true;   //inicia timer

export const state: State = proxy<State>(init);

function getTimerEnabled(): boolean {
   const temp = localStorage.getItem('timerEnabled');
   if (temp !== null) {
      const enabled = temp === 'true';
      return enabled;
   }
   localStorage.setItem('timerEnabled', `${defaultTimerEnabled}`)

   return defaultTimerEnabled;
}

function getFreezedTime(): number {
   const temp = localStorage.getItem('freezedTime');
   if (temp !== null)
      return +temp;
   localStorage.setItem('freezedTime', `${defaultFreezedTime}`)
   return defaultFreezedTime;
}

