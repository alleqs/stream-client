import React, { useState, type FC } from 'react';
import Select, { type MultiValue, type StylesConfig } from 'react-select';
import { allTags, state } from '../store';

type Props = { onClose: Function }
const tags = allTags.map(c => ({ value: c, label: c }));

export const SearchBar: FC<Props> = ({ onClose }) => {

   const [pickedTags, setPickedTags] = useState<string[]>(state.pickedTags);
   const [tag, setTag] = useState('');

   function handleChange(values: MultiValue<{ value: string, label: string }>) {
      setPickedTags(values.map(v => v.value));
   }

   function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
      e.stopPropagation();
      state.pickedTags = allTags.includes(tag) ? [tag, ...pickedTags] : pickedTags;
      onClose();
   }

   function handleKeyDown({ key }: React.KeyboardEvent<HTMLDivElement>) {
      if (key === 'Enter' && checkIsVisible(pickedTags, tag)) {
         state.pickedTags = allTags.includes(tag) ? [tag, ...pickedTags] : pickedTags;
         onClose();
      }
   }

   function handleInputChange(str: string) {
      setTag(str);
   }

   return (
      <div className='absolute left-1/2 transform -translate-x-1/2 top-1/4 z-10 w-[300px] scale-[3]'>
         <Select
            isMulti
            autoFocus
            defaultValue={pickedTags.map(t => ({ value: t, label: t }))}
            name="colors"
            options={tags}
            className="basic-multi-select mx-auto text-gray-600"
            classNamePrefix="select"
            placeholder='Pesquisar...'
            onChange={handleChange as (_: MultiValue<unknown>) => void}
            onKeyDown={handleKeyDown}
            onInputChange={handleInputChange}
            noOptionsMessage={() => <div className='text-red-500'>opção não encontrada</div>}
            components={{
               DropdownIndicator: () => <ConfirmBtn onClick={handleClick} isVisible={checkIsVisible(pickedTags, tag)} />,
               IndicatorSeparator: () => null
            }}
            styles={customStyles}
         />
      </div>
   );
};

type ConfirmBtnProps = {
   onClick: React.MouseEventHandler<HTMLButtonElement>
   isVisible: boolean
}
const ConfirmBtn: FC<ConfirmBtnProps> = ({ onClick, isVisible }) =>
   <button type="submit" className={isVisible ? 'visible' : 'invisible'} onMouseDown={onClick}>
      <svg className="m-2 text-gray-600 fill-current h-6 w-6">
         <use href='#search' />
      </svg>
   </button>

function checkIsVisible(pickedTags: string[], tag: string): boolean {
   return pickedTags.length > 0 || allTags.includes(tag) || tag === ''
}

const customStyles: StylesConfig = {
   control: (base, state) => ({
      ...base,
      background: "#FFFFFFC0",
   })
};
