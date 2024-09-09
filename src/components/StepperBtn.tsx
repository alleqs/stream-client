import { type FC } from "react";
import { deltaTimer, minFreezedTime } from "../constants";

type Props = {
   freezedTime: number
   setFreezedTime: (t: number) => void
   timerEnabled: boolean
}

export const StepperBtn: FC<Props> = ({ freezedTime, setFreezedTime, timerEnabled }) => {

   return (
      <form name='stepper-form' className="">
         <div className="relative flex items-center max-w-[8rem]">
            <button disabled={!timerEnabled}
               onClick={() => freezedTime > minFreezedTime && setFreezedTime(freezedTime - deltaTimer)}
               type="button" id="decrement-button" data-input-counter-decrement="quantity-input" className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
               <svg className="w-3 h-3 text-gray-900 dark:text-white" strokeWidth={timerEnabled ? '2' : '0'}>
                  <use href="#minus" />
               </svg>
            </button>
            <input type="text" id="quantity-input" data-input-counter data-input-counter-min="1" data-input-counter-max="6000" aria-describedby="helper-text-explanation" className="text-xl min-w-0 bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={freezedTime} required
               onChange={(e) => setFreezedTime(+e.target.value)} />
            <button disabled={!timerEnabled}
               onClick={() => setFreezedTime(freezedTime + deltaTimer)}
               type="button" id="increment-button" data-input-counter-increment="quantity-input" className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
               <svg className="w-3 h-3 text-gray-900 dark:text-white" strokeWidth={timerEnabled ? '2' : '0'}>
                  <use href="#plus" />
               </svg>
            </button>
         </div>
      </form>
   );
};