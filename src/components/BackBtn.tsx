import { type FC } from 'react';
import { state } from '../store';

export const BackBtn: FC<{ camNumber: number }> = ({ camNumber }) => {
   return (
      <button className={`absolute top-2 right-2 bg-[#FFFFFF30] px-1 py-1 rounded-full inline-flex items-center w-10 invisible group-hover:visible transition-all duration-1000 ease-in-out`}
         onClick={() => { state.toggle(camNumber) }}>
         <svg className="w-8 h-8 text-gray-800">
            <use href='#back' />
         </svg>
      </button>
   )
}