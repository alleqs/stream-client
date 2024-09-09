import { useEffect, useState, type FC } from 'react';
import { state } from '../store';
import { BackBtn } from './BackBtn';
import { VideoSkeleton } from './VideoSkeleton';

type Props = {
   visible: boolean
   camNumber: number
   description: string
   ar: string
}

export const Cam: FC<Props> = ({ visible, camNumber, description, ar }) => {

   const [loading, setLoading] = useState(true);

   useEffect(() => {
      setLoading(true);
   }, [camNumber]);

   // useEffect(() => {
   //    function handlekeydownEvent(event: KeyboardEvent) {
   //       if (event.key === 'Escape' && state.viewState.type === 'Single' && visible) {
   //          console.log('visible :>> ', visible);
   //          state.toggle(camNumber);
   //       }
   //    }
   //    document.addEventListener('keyup', handlekeydownEvent)
   //    return () => { document.removeEventListener('keyup', handlekeydownEvent) }
   // }, []);


   return (
      <div className='relative flex justify-center'>
         {loading && state.viewState.type === 'Multi' && <VideoSkeleton ar={ar} />}
         {/* <video
            // style={visible ? {} : { height: '0px' }}
            className={`${loading ? 'h-0 w-0' : ''} ${state.viewState.type === 'Multi' ? 'max-h-[calc(50vh-0.25rem)]' : 'max-h-screen'}`}
            style={{ ...(!visible) && { height: '0px' } }}
            autoPlay
            muted
            // controls
            src={`../api/stream/${camNumber}`}
            onClick={() => state.toggle(camNumber)}
            onLoadedData={() => setLoading(false)}
         /> */}
         {!loading && visible && <div className={`absolute left-0 right-0 bottom-2 grid place-items-center text-gray-200 invisible group-hover:visible transition-all duration-1000 ease-in-out`}>
            {description}
         </div>}
         {state.viewState.type === 'Single' && visible && <BackBtn camNumber={camNumber} />}
      </div>
   );
}



