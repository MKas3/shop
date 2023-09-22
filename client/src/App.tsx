import {BrowserRouter} from 'react-router-dom';
import AppRouter from './components/AppRouter.tsx';
import NavBar from './components/NavBar.tsx';
import {observer} from 'mobx-react-lite';
import {useContext, useEffect, useState} from 'react';
import {Context} from './main.tsx';
import {check} from './http/userAPI.ts';

const App = observer(() => {
	const {user} = useContext(Context);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		check().then(data => {
			if (data) {
				user.setUser(data);
				user.setIsAuth(true);
			}
		}).finally(() => setIsLoading(false));
	}, []);

	if (isLoading)
		return <div className="fixed inset-0 bg-neutral-900 text-center">
			<p className="font-bold text-3xl text-neutral-100 mt-20">Loading...</p>
		</div>;

	return (
		<div className="bg-[url('/bg2.jpg')] overflow-auto min-w-[40rem] bg-cover min-h-screen text-neutral-100">
			<BrowserRouter>
				<NavBar/>
				<AppRouter/>
			</BrowserRouter>
		</div>
	);
});

export default App;
