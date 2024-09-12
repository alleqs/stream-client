import { type FC } from 'react';
import { BackBtn } from './BackBtn';
import { SnapshotBtn } from './SnapshotBtn';

type Props = {
   targetRef: React.RefObject<HTMLDivElement>
   description: string
   camNumber: number
}

export const Tray: FC<Props> = ({ targetRef: ref, description, camNumber }) => {
   return (
      <div className='absolute left-1/2 transform -translate-x-1/2 bottom-1 flex justify-between items-center bg-[#00000030] rounded-lg invisible group-hover:visible transition-all duration-1000 ease-in-out py-2 px-4 space-x-3 min-w-48'>
         <BackBtn camNumber={camNumber} />
         <span className='text-gray-200'>{description}</span>
         <SnapshotBtn targetRef={ref} description={description} />
      </div>
   );
};