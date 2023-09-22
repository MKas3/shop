import {$authHost, $host} from './index.ts';
import {IBrand, IType} from '../models/models.ts';

export const createType = async ({name}: IType) => {
	const {data} = await $authHost.post('api/type', {name});
	return data;
};

export const fetchTypes = async () => {
	const {data} = await $host.get('api/type');
	return data;
};

export const createBrand = async ({name}: IBrand) => {
	const {data} = await $authHost.post('api/brand', {name});
	return data;
};

export const fetchBrands = async () => {
	const {data} = await $host.get('api/brand');
	return data;
};

export const createProduct = async (formData: FormData) => {
	const {data} = await $authHost.post('api/product', formData);
	return data;
};

export const fetchProducts = async (typeId: number | undefined, brandId: number | undefined, page: number, limit = 5) => {
	const {data} = await $host.get('api/product', {
		params: {
			typeId, brandId, page, limit
		}
	});
	return data;
};

export const fetchOneProduct = async (id: number) => {
	const {data} = await $host.get('api/product/' + id);
	return data;
};