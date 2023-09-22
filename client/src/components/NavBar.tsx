import {useContext} from 'react';
import {Context} from '../main.tsx';
import {Link} from 'react-router-dom';
import NavBarLink from './NavBarLink.tsx';
import {observer} from 'mobx-react-lite';
import {ADMIN_ROUTE, CART_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE} from '../utils/consts.ts';
import {IUser} from '../models/models.ts';

const NavBar = observer(() => {
	const {user} = useContext(Context);

	const logOut = () => {
		user.setUser({} as IUser);
		user.setIsAuth(false);
		localStorage.removeItem('token');
	};

	return (
		<nav className="py-4 bg-black/10 z-10 sticky top-0">
			<div className="flex justify-between items-center">
				<Link to="/" className="mx-1 px-4 font-bold text-lg hover:text-indigo-200 transition">Shop</Link>
				<div className="flex space-x-3 mx-6">
					{user.isAuth ?
						<>
							{user.user.role === 'ADMIN' &&
                                <NavBarLink link={ADMIN_ROUTE}>Admin Panel</NavBarLink>
							}
							<NavBarLink link={CART_ROUTE}>Cart</NavBarLink>
							<NavBarLink onClick={logOut} link={LOGIN_ROUTE} isAlt={true}>Sign Out</NavBarLink>
						</>

						:
						<>
							<NavBarLink link={LOGIN_ROUTE}>Sign in</NavBarLink>
							<NavBarLink isAlt={true} link={REGISTRATION_ROUTE}>Sign up</NavBarLink>
						</>
					}
				</div>
			</div>
		</nav>
	);
});

export default NavBar;