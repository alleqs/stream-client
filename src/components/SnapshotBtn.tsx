import { useState, type FC } from 'react';
import html2canvas from 'html2canvas';
import useSound from 'use-sound';

type Props = {
   targetRef: React.RefObject<HTMLDivElement>
   description: string
}

export const SnapshotBtn: FC<Props> = ({ targetRef: ref, description }) => {

   const [count, setCount] = useState(0);
   const [play] = useSound('./camera-sound.mp3', { playbackRate: count <= 1 ? 0.5 : 1 });

   async function handleSnapshot() {
      play();
      setCount(c => c + 1);
      const canvas = await html2canvas(ref.current!, { useCORS: true, allowTaint: true });
      const imgData = canvas.toDataURL('image/jpg');
      const p = await fetch(imgData);
      const imgBlob = await p.blob();
      const url = URL.createObjectURL(imgBlob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = `snapshot_${toSnakeCase(description)}.jpg`;
      document.body.appendChild(a);
      a.click();
      a.parentNode?.removeChild(a);
   }

   return (
      <button className={`bg-[#FFFFFF30] px-1 py-1 rounded-full inline-flex items-center w-16 invisible group-hover:visible transition-all duration-1000 ease-in-out`}
         onClick={handleSnapshot}>
         <svg className="w-14 h-14 text-gray-800">
            <use href='#cam' />
         </svg>
      </button>
   );
};

function toSnakeCase(str: string) {
   const stringWithSingleSpace = str.trim().toLocaleLowerCase().replace(/\s+/g, ' ');
   return stringWithSingleSpace.split(' ').join('_');
}