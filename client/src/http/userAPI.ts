import {$authHost, $host} from './index.ts';
import jwtDecode from 'jwt-decode';
import {IUser} from '../models/models.ts';

export const registration = async (username: string, email: string, password: string) => {
	const {data} = await $host.post('api/user/registration', {username, email, password, role: 'USER'});
	localStorage.setItem('token', data.token);
	return jwtDecode(data.token) as IUser;
};

export const login = async (emailUsername: string, password: string) => {
	const {data} = await $host.post('api/user/login', {emailUsername, password});
	localStorage.setItem('token', data.token);
	return jwtDecode(data.token) as IUser;
};

export const check = async () => {
	try {
		const {data} = await $authHost.get('api/user/auth');
		localStorage.setItem('token', data.token);
		return jwtDecode(data.token) as IUser;
	} catch (e: any) {
		console.log('No auth');
	}
};