import { type FC } from 'react';

type Props = {
   onClick: () => void
}

export const SettingsBtn: FC<Props> = ({ onClick }) => {

   return (
      <button className={`absolute m-auto left-0 right-0 bottom-1 bg-[#FFFFFF30] px-1 py-1 rounded-full inline-flex items-center w-10 invisible group-hover:visible transition-all duration-1000 ease-in-out`}
         onClick={onClick}>
         <svg className="w-8 h-8 text-gray-800">
            <use href='#cog' />
         </svg>
      </button>
   )
}
