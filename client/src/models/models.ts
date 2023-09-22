import UserStore from '../store/UserStore.ts';
import ProductStore from '../store/ProductStore.ts';

export interface IContext {
	user: UserStore,
	products: ProductStore
}

interface Default {
	name: string;
	id: number;
}

export interface IType extends Default {
}

export interface IBrand extends IType {
}

export interface IProduct extends Default {
	img: File;
	price: number;
	rating: number;
	info: IInfo[];
	typeId: number;
	brandId: number;
}

export interface IInfo {
	id: number;
	title: string;
	description: string;
}

export interface IUser {
	id: number;
	username: string;
	email: string;
	role: string;
}