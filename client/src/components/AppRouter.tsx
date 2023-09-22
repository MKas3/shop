import {Route, Routes} from 'react-router-dom';
import {authRoutes, publicRoutes} from '../routes.tsx';
import {useContext} from 'react';
import {Context} from '../main.tsx';
import {observer} from 'mobx-react-lite';

const AppRouter = observer(() => {
	const {user} = useContext(Context);

	return (
		<Routes>
			{user.isAuth && authRoutes.map(({...props}) => (
				<Route key={props.path} {...props}></Route>
			))}
			{publicRoutes.map(({...props}) => (
				<Route key={props.path} {...props}></Route>
			))}
		</Routes>
	);
});

export default AppRouter;