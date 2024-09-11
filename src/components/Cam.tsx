import { useEffect, useRef, useState, type FC } from 'react';
import { state } from '../store';
import { BackBtn } from './BackBtn';
import { VideoSkeleton } from './VideoSkeleton';
import { SnapshotBtn } from './SnapshotBtn';
import { Tray } from './Tray';

type Props = {
   visible: boolean
   camNumber: number
   description: string
   ar: string
}

export const Cam: FC<Props> = ({ visible, camNumber, description, ar }) => {

   const [loading, setLoading] = useState(true);
   const ref = useRef<HTMLDivElement>(null);

   useEffect(() => {
      setLoading(true);
   }, [camNumber]);

   // useEffect(() => {
   //    function handlekeydownEvent(event: KeyboardEvent) {
   //       if (event.key === 's') {
   //          console.log('snapshot');
   //          // console.log('visible :>> ', visible);
   //          // state.toggle(camNumber);
   //       }
   //    }
   //    document.addEventListener('keyup', handlekeydownEvent)
   //    return () => { document.removeEventListener('keyup', handlekeydownEvent) }
   // }, []);

   // async function handlesSnapshot() {
   //    console.log('snapshot');
   //    const canvas = await html2canvas(ref.current!, { useCORS: true, allowTaint: true });
   //    const imgData = canvas.toDataURL('image/jpg');
   //    const p = await fetch(imgData);
   //    const imgBlob = await p.blob();
   //    const url = URL.createObjectURL(imgBlob);
   //    const a = document.createElement('a');
   //    a.style.display = 'none';
   //    a.href = url;
   //    a.download = 'snapshot.jpg';
   //    document.body.appendChild(a);
   //    a.click();
   //    a.parentNode?.removeChild(a);
   // }


   return (
      <div ref={ref} className='relative flex justify-center'>
         {loading && state.viewState.type === 'Multi' && <VideoSkeleton ar={ar} />}
         <video
            // style={visible ? {} : { height: '0px' }}
            className={`${loading ? 'h-0 w-0' : ''} ${state.viewState.type === 'Multi' ? 'h-[calc(50vh-0.25rem)]' : 'max-h-screen'}`}
            style={{ ...(!visible) && { height: '0px' } }}
            autoPlay
            muted
            // controls
            src={`../api/stream/${camNumber}`}
            onClick={() => state.toggle(camNumber)}
            onLoadedData={() => setLoading(false)}
         />
         {!loading && state.viewState.type === 'Multi' && <div className={`absolute left-0 right-0 bottom-2 grid place-items-center text-gray-200 invisible group-hover:visible transition-all duration-1000 ease-in-out`}>
            {description}
         </div>}
         {/* {state.viewState.type === 'Single' && visible && <>
            <BackBtn camNumber={camNumber} />
            <SnapshotBtn targetRef={ref} description={description} /></>} */}
         {state.viewState.type === 'Single' && visible &&
            <Tray camNumber={camNumber} description={description} targetRef={ref} />}
      </div>
   );
}



