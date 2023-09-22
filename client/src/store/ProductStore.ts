import {makeAutoObservable} from 'mobx';
import {IBrand, IProduct, IType} from '../models/models.ts';

class ProductStore {
	private _types: IType[];
	private _brands: IBrand[];
	private _products: IProduct[];
	private _selectedType: IType | null;
	private _selectedBrand: IBrand | null;
	private _page: number;
	private _totalCount: number;
	private _limit: number;

	constructor() {
		this._types = [];
		this._brands = [];
		this._products = [];
		this._selectedType = null;
		this._selectedBrand = null;
		this._page = 1;
		this._totalCount = 0;
		this._limit = 3;
		makeAutoObservable(this);
	}

	setTypes(types: IType[]) {
		this._types = types;
	}

	setBrands(brands: IBrand[]) {
		this._brands = brands;
	}

	setProducts(products: IProduct[]) {
		this._products = products;
	}

	setSelectedType(type: IType | null) {
		this.setPage(1);
		this._selectedType = type;
	}

	setSelectedBrand(brand: IBrand | null) {
		this.setPage(1);
		this._selectedBrand = brand;
	}

	setPage(page: number) {
		this._page = page;
	}

	setTotalCount(totalCount: number) {
		this._totalCount = totalCount;
	}

	setLimit(limit: number) {
		this._limit = limit;
	}
	get types() {
		return this._types;
	}

	get brands() {
		return this._brands;
	}

	get products() {
		return this._products;
	}

	get selectedType() {
		return this._selectedType;
	}

	get selectedBrand() {
		return this._selectedBrand;
	}

	get page() {
		return this._page;
	}

	get totalCount() {
		return this._totalCount;
	}

	get limit() {
		return this._limit;
	}
}

export default ProductStore;