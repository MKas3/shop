import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import UserStore from './store/UserStore.ts';
import {IContext} from './models/models.ts';
import ProductStore from './store/ProductStore.ts';

export const Context = createContext<IContext>(null as any);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Context.Provider value={{
			user: new UserStore(),
			products: new ProductStore()
		}}>
			<App/>
		</Context.Provider>
	</React.StrictMode>,
);
