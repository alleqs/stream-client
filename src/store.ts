import { camsPerView, defaultFreezedTime, defaultTimerEnabled } from './constants';
import type { CamInfo, DTO, State } from './types';
import { proxy } from 'valtio';

const request = new XMLHttpRequest();
request.open("GET", "/api/cams", false);
request.send(null);
const { camInfoArr: arr }: DTO = JSON.parse(request.responseText);
const camInfoArr: CamInfo[] = arr.map((obj, camNumber) => ({ camNumber, ...obj }));
const camsAmount = camInfoArr.length;
export const allTags = [...new Set(camInfoArr.map(c => c.tags).flat())];

let interval = -1

const init: State = {
   _timerEnabled: getTimerEnabled(),
   _freezedTime: getFreezedTime(),
   _pickedTags: [],
   camInfoArr,
   camsPerView: camsPerView,
   viewState: { type: 'Multi' },
   page: 0,
   get pickedTags() { return this._pickedTags },
   set pickedTags(pickedTags) {
      console.log('picked');
      this.camInfoArr = pickedTags.length === 0
         ? camInfoArr
         : camInfoArr.filter(({ tags: _tags }) => {
            const tags = Object.values(_tags);
            let includes = false;
            for (const tag of pickedTags) {
               if (tags.includes(tag)) {
                  includes = true;
                  break;
               }
            }
            return includes;
         });
      this._pickedTags = pickedTags;
      this.viewState = { type: 'Multi' }
      this.page = 0;
   },
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
   incr() {
      if (this.viewState.type === 'Multi') {
         this.page = (this.page + 1) % Math.ceil(this.camInfoArr.length / this.camsPerView);
      }
   },
   decr() {
      if (this.viewState.type === 'Multi') {
         const totalPages = Math.ceil(this.camInfoArr.length / this.camsPerView)
         this.page = (this.page + totalPages - 1) % totalPages;
      }
   },
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

