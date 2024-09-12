import { useEffect, useRef, useState, type FC } from 'react';
import { ArrowBtn } from './components/ArrowBtn';
import { Cam } from './components/Cam';
import { SettingsBtn } from './components/SettingsBtn';
import { useSnapshot } from 'valtio';
import { state } from './store';
import { SettingsModal } from './components/SettingsModal';
import { SearchBar } from './components/SearchBar';


export const App: FC = () => {

   const { viewState, camsPerView } = useSnapshot(state);
   const settingsModalRef = useRef<HTMLDialogElement>(null);
   const slice = state.camInfoArr.slice(Math.floor(viewState.index / camsPerView) * camsPerView, Math.floor(viewState.index / camsPerView) * camsPerView + camsPerView);
   const [showSearchBar, setShowSearchBar] = useState(false);

   useEffect(() => {
      function handlekeydownEvent({ code }: KeyboardEvent) {
         switch (code) {
            case 'AltLeft':
               setShowSearchBar(true);
               break;
            case 'Escape':
               setShowSearchBar(false);
               break;
            case 'NumpadEnter':
            case 'Enter':
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
      <div className='h-screen bg-zinc-950 flex justify-center items-center'>
         <div className='relative group bg-zinc-900 max-h-screen' >
            {showSearchBar && <SearchBar />}
            <div className={viewState.type === 'Multi' ? `grid ${slice.length !== 1 ? 'grid-cols-2' : ''} auto-rows-[1fr] gap-0.5 max-h-screen` : 'flex justify-center items-center h-full'}>
               {slice.map(({ description, camNumber, ar }, i) =>
                  <Cam key={i} visible={isVisible(i)} camNumber={camNumber} description={description} ar={ar} />)}
            </div>
            {viewState.type === 'Multi' && <>
               <ArrowBtn icon='arrow-left' dir='L' />
               <ArrowBtn icon='arrow-right' dir='R' />
               <SettingsBtn onClick={handleSettingsModalClick} />
            </>}
         </div>
         <SettingsModal modalRef={settingsModalRef} />
      </div>
   );
};

function isVisible(i: number): boolean {
   return state.viewState.type === 'Multi' || (state.viewState.index % state.camsPerView) === i
}
