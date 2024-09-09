import React, { type FC } from 'react';
import { state } from '../store';

type Props = {
   icon: string
   dir: 'L' | 'R'
}

export const ArrowBtn: FC<Props> = ({ icon, dir }) => {

   return (
      <button className={`absolute m-auto top-0 bottom-0 ${dir === 'L' ? 'left-1' : 'right-1'} bg-[#FFFFFF30] px-1 rounded-full inline-flex items-center h-10 invisible group-hover:visible transition-all duration-1000 ease-in-out`}
         onClick={() => { dir === 'R' ? state.incr() : state.decr() }}>
         <svg className="w-8 h-8 text-gray-800">
            <use href={`#${icon}`} />
         </svg>
      </button>
   );
};