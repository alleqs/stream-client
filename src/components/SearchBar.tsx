import { FC } from 'react';

type Props = {}

export const SearchBar: FC<Props> = ({ }) => {
   return (
      <div className='absolute left-1/2 transform -translate-x-1/2 top-10 z-10'>
         <div className="relative mx-auto text-gray-600 w-[280px]">
            <input autoComplete="off" autoFocus spellCheck={false} className="border-2 border-gray-300 bg-[#FFFFFF80] h-10 pl-5 pr-10 rounded-lg text-sm focus:outline-none w-full placeholder-gray-600 text-gray-800"
               type="search" name="search" placeholder="Pesquisar" />
            <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2">
               <svg className="m-2 text-gray-600 fill-current h-4 w-4">
                  <use href='#search' />
               </svg>
            </button>
         </div>
      </div>
   );
};