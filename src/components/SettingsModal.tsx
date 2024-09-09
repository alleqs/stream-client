import React, { useState, type FC } from 'react';
import { state } from '../store';
import { ToggleBtn } from './ToggleBtn';
import { StepperBtn } from './StepperBtn';

type Props = {
   modalRef: React.RefObject<HTMLDialogElement>
}

export const SettingsModal: FC<Props> = ({ modalRef }) => {

   const [timerEnabled, setTimerEnabled] = useState(state.timerEnabled);
   const [freezedTime, setFreezedTime] = useState(state.freezedTime);

   function handleClose() {
      setTimerEnabled(state.timerEnabled);
      setFreezedTime(state.freezedTime);
   }

   function onSave() {
      state.timerEnabled = timerEnabled;
      state.freezedTime = freezedTime;
      modalRef.current?.close()
   }

   return (
      <dialog
         ref={modalRef}
         onClick={() => modalRef.current?.close()}
         onClose={handleClose}
         className='select-none text-center rounded-md shadow-lg bg-[#111827A0] backdrop:bg-[#000000BB]'>

         <div className='pt-10 w-96 space-y-10 text-gray-200' onClick={e => e.stopPropagation()}>

            <p className='text-3xl  font-semibold'>Configurações</p>

            <div className='mx-5 flex justify-between'>
               <span className='text-xl'>Timer</span>
               <ToggleBtn timerEnabled={timerEnabled} toggleTimerEnabled={() => setTimerEnabled(t => !t)} />
            </div>
            <div className='mx-5 flex justify-between items-center'>
               <span className='text-xl'>Tempo (s)</span>
               <StepperBtn freezedTime={freezedTime} setFreezedTime={setFreezedTime} timerEnabled={timerEnabled} />
            </div>

            <div className='flex'>
               <button onClick={() => modalRef.current?.close()}
                  className="py-5 text-xl w-full rounded-md">
                  Cancela
               </button>
               <button
                  onClick={onSave}
                  className="py-5 text-xl w-full rounded-md font-semibold">
                  Salva
               </button>
            </div>
         </div>
      </dialog>
   );
};

