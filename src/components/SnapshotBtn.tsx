import { type FC } from 'react';
import html2canvas from 'html2canvas';
import useSound from 'use-sound';

export const SnapshotBtn: FC<{ targetRef: React.RefObject<HTMLDivElement> }> = ({ targetRef: ref }) => {

   const [play] = useSound('./camera-13695.mp3');

   async function handlesSnapshot() {
      console.log('snapshot');
      play();
      const canvas = await html2canvas(ref.current!, { useCORS: true, allowTaint: true });
      const imgData = canvas.toDataURL('image/jpg');
      const p = await fetch(imgData);
      const imgBlob = await p.blob();
      const url = URL.createObjectURL(imgBlob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = 'snapshot.jpg';
      document.body.appendChild(a);
      a.click();
      a.parentNode?.removeChild(a);
   }

   return (
      <button className={`absolute top-14 right-2  bg-[#FFFFFF30] px-1 py-1 rounded-full inline-flex items-center w-10 invisible group-hover:visible transition-all duration-1000 ease-in-out`}
         onClick={handlesSnapshot}>
         <svg className="w-8 h-8 text-gray-800">
            <use href='#cam' />
         </svg>
      </button>
   );
};