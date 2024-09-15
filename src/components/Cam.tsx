import { useEffect, useRef, useState, type FC } from 'react';
import { state } from '../store';
import { VideoSkeleton } from './VideoSkeleton';
import { Tray } from './Tray';

type Props = {
   visible: boolean
   camNumber: number
   description: string
   ar: string
   index: number
}

export const Cam: FC<Props> = ({ visible, camNumber, description, ar, index }) => {

   const [loading, setLoading] = useState(true);
   const ref = useRef<HTMLDivElement>(null);

   useEffect(() => {
      setLoading(true);
   }, [camNumber]);

   function handleClick() {
      if (state.viewState.type === 'Multi') {
         state.viewState = { type: 'Single', index };
      }
   }

   return (
      <div ref={ref} className='relative flex justify-center'>
         {loading && state.viewState.type === 'Multi' && visible && <VideoSkeleton ar={ar} />}
         <video
            // style={visible ? {} : { height: '0px' }}
            style={{ ...(!visible) && { height: '0px' } }}
            className={`${loading ? 'h-0 w-0' : ''} ${state.viewState.type === 'Multi' ? 'h-[calc(50vh-0.25rem)]' : 'max-h-screen'}`}
            autoPlay
            muted
            // controls
            src={`../api/stream/${camNumber}`}
            onClick={handleClick}
            onLoadedData={() => setLoading(false)}
         />
         {!loading && state.viewState.type === 'Multi' && <div className={`absolute left-0 right-0 bottom-2 grid place-items-center text-gray-200 invisible group-hover:visible transition-all duration-1000 ease-in-out`}>
            {description}
         </div>}
         {/* {state.viewState.type === 'Single' && visible && <>
            <BackBtn camNumber={camNumber} />
            <SnapshotBtn targetRef={ref} description={description} /></>} */}
         {state.viewState.type === 'Single' && visible &&
            <Tray description={description} targetRef={ref} />}
      </div>
   );
}



