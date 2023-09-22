import {ADMIN_ROUTE, CART_ROUTE, LOGIN_ROUTE, PRODUCT_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from './utils/consts.ts';
import AdminPage from './pages/AdminPage.tsx';
import CartPage from './pages/CartPage.tsx';
import ShopPage from './pages/ShopPage.tsx';
import ProductPage from './pages/ProductPage.tsx';
import AuthPage from './pages/AuthPage.tsx';
import {Navigate} from 'react-router-dom';

export const authRoutes = [
	{
		path: ADMIN_ROUTE,
		element: <AdminPage/>
	},
	{
		path: CART_ROUTE,
		element: <CartPage/>
	}
];

export const publicRoutes = [
	{
		path: SHOP_ROUTE,
		element: <ShopPage/>,
	},
	{
		path: LOGIN_ROUTE,
		element: <AuthPage/>
	},
	{
		path: REGISTRATION_ROUTE,
		element: <AuthPage/>
	},
	{
		path: PRODUCT_ROUTE + ':id',
		element: <ProductPage/>
	},
	{
		path: '*',
		element: <Navigate to="/" replace={true}/>
	}
];