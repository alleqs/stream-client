import { type FC } from 'react';
import { arMap } from '../constants';

export const VideoSkeleton: FC<{ ar: string }> = ({ ar }) => {

   return (
      <div role="status" className={`flex items-center justify-center h-[calc(50vh-0.25rem)] ${arMap[ar]} bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700`}>
         <svg className='w-10 h-10 text-gray-200 dark:text-gray-600'>
            <use href='#skeleton' />
         </svg>
         <span className="sr-only">Loading...</span>
      </div>
   );
};