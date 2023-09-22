import {makeAutoObservable} from 'mobx';
import {IUser} from '../models/models.ts';

class UserStore {
	private _isAuth: boolean;
	private _user: IUser;

	constructor() {
		this._isAuth = false;
		this._user = {} as IUser;
		makeAutoObservable(this);
	}

	setIsAuth(isAuth: boolean) {
		this._isAuth = isAuth;
	}

	setUser(user: IUser) {
		this._user = user;
	}

	get isAuth() {
		return this._isAuth;
	}

	get user() {
		return this._user;
	}
}

export default UserStore;