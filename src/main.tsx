import { createRoot } from 'react-dom/client';
import { App } from './App.tsx';
import './index.css';

declare module 'valtio' {
   function useSnapshot<T extends object>(p: T): T
}

createRoot(document.getElementById('root')!).render(
   <App />
);
