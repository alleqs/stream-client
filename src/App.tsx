import { useEffect, useRef, useState, type FC } from 'react';
import { ArrowBtn } from './components/ArrowBtn';
import { Cam } from './components/Cam';
import { SettingsBtn } from './components/SettingsBtn';
import { useSnapshot } from 'valtio';
import { state } from './store';
import { SettingsModal } from './components/SettingsModal';
import { SearchBar } from './components/SearchBar';


export const App: FC = () => {

   const { viewState, camInfoArr, page } = useSnapshot(state);
   const settingsModalRef = useRef<HTMLDialogElement>(null);
   const [showSearchBar, setShowSearchBar] = useState(false);
   const slice = camInfoArr.slice(page * state.camsPerView, (page + 1) * state.camsPerView);
   console.log('page :>> ', page);
   console.log(`${camInfoArr.length} [${page * state.camsPerView}, ${(page + 1) * state.camsPerView}]`);

   useEffect(() => {
      function handlekeydownEvent({ code }: KeyboardEvent) {
         if (code === 'AltLeft') {
            setShowSearchBar(true);
         } else if (code === 'Escape') {
            setShowSearchBar(false);
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
            <div className={viewState.type === 'Multi' ? `grid ${slice.length !== 1 ? 'grid-cols-2' : ''} auto-rows-[1fr] gap-0.5 max-h-screen` : 'flex justify-center items-center h-full'}>
               {slice.map(({ descr, camNumber, ar }, i) => {
                  console.log('{ descr, camNumber, ar, i } :>> ', { descr, camNumber, ar, i });
                  return <Cam key={i} visible={isVisible(i)} camNumber={camNumber} description={descr} ar={ar} index={i} />
               })}
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
   return state.viewState.type === 'Multi' || state.viewState.index === i
}
