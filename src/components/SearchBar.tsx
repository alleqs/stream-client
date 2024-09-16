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
      <div className='absolute left-1/2 transform -translate-x-1/2 top-20 z-10 w-[480px]'>
         <Select
            isMulti
            autoFocus
            defaultValue={pickedTags.map(t => ({ value: t, label: t }))}
            name="colors"
            options={tags}
            className="basic-multi-select mx-auto text-gray-600 text-4xl"
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
      //   // match with the menu
      //   borderRadius: state.isFocused ? "3px 3px 0 0" : 3,
      //   // Overwrittes the different states of border
      //   borderColor: state.isFocused ? "yellow" : "green",
      //   // Removes weird border around container
      //   boxShadow: state.isFocused ? null : null,
      //   "&:hover": {
      //     // Overwrittes the different states of border
      //     borderColor: state.isFocused ? "red" : "blue"
      //   }
   }),
   // menu: base => ({
   //   ...base,
   //   // override border radius to match the box
   //   borderRadius: 0,
   //   // kill the gap
   //   marginTop: 0
   // }),
   // menuList: base => ({
   //   ...base,
   //   // kill the white space on first and last option
   //   padding: 0
   // })
};
