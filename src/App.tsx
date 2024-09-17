import { useEffect, useRef, useState, type FC } from 'react';
import { ArrowBtn } from './components/ArrowBtn';
import { Cam } from './components/Cam';
import { SettingsBtn } from './components/SettingsBtn';
import { useSnapshot } from 'valtio';
import { state } from './store';
import { SettingsModal } from './components/SettingsModal';
import { SearchBar } from './components/SearchBar';
import type { CamInfo, CamProps } from './types';


export const App: FC = () => {

   const { viewState, camInfoArr, page } = useSnapshot(state);
   const settingsModalRef = useRef<HTMLDialogElement>(null);
   const [showSearchBar, setShowSearchBar] = useState(false);

   useEffect(() => {
      function handlekeydownEvent({ code }: KeyboardEvent) {
         // console.log('code :>> ', code);
         switch (code) {
            case 'AltLeft':
               setShowSearchBar(true);
               break;
            case 'Escape':
               setShowSearchBar(false);
               break;
            case 'ArrowRight':
               state.incr();
               break;
            case 'ArrowLeft':
               state.decr();
               break;
            case 'Backspace':
               if (state.viewState.type === 'Single') {
                  state.viewState = { type: 'Multi' };
               }
               break;
         }
      }
      document.addEventListener('keyup', handlekeydownEvent)
      return () => { document.removeEventListener('keyup', handlekeydownEvent) }
   }, []);

   function handleSettingsModalClick() {
      settingsModalRef.current?.showModal();
   }

   return (
      <main className='h-screen bg-zinc-950 flex justify-center items-center'>
         <div className='relative group bg-zinc-900 max-h-screen' >
            {showSearchBar && <SearchBar onClose={() => setShowSearchBar(false)} />}
            <div className={viewState.type === 'Multi' ? `grid ${'grid-cols-2'} auto-rows-[1fr] gap-0.5 max-h-screen` : 'flex justify-center items-center h-full'}>
               {Array(state.camsPerView).fill(null).map((_, i) =>
                  <Cam key={i} {...getCamProps(camInfoArr[page * state.camsPerView + i], i)} />)}
            </div>
            {viewState.type === 'Multi' && <>
               {camInfoArr.length > state.camsPerView && <>
                  <ArrowBtn icon='arrow-left' dir='L' />
                  <ArrowBtn icon='arrow-right' dir='R' /> </>}
               <SettingsBtn onClick={handleSettingsModalClick} /> </>}
         </div>
         <SettingsModal modalRef={settingsModalRef} />
      </main>
   );
};

function isVisible(i: number): boolean {
   return (state.viewState.type === 'Multi' || state.viewState.index === i)
}

function getCamProps(camInfo: CamInfo | undefined, index: number): CamProps {
   return camInfo
      ? {
         visible: isVisible(index),
         camNumber: camInfo.camNumber,
         description: camInfo.descr,
         ar: camInfo.ar,
         index
      }
      : {
         visible: false,
         camNumber: -1,
         description: '',
         ar: '16/9',
         index
      }
}
