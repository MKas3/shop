import sequelizeConnection from '../db';
import {DataTypes} from 'sequelize';

export const User = sequelizeConnection.define('user', {
	id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
	username: {type: DataTypes.STRING, unique: true},
	email: {type: DataTypes.STRING, unique: true},
	password: {type: DataTypes.STRING},
	role: {type: DataTypes.STRING, defaultValue: 'USER'},
});

export const Cart = sequelizeConnection.define('cart', {
	id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
});

export const CartProduct = sequelizeConnection.define('cart_product', {
	id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
});

export const Product = sequelizeConnection.define('product', {
	id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
	name: {type: DataTypes.STRING, unique: true, allowNull: false},
	price: {type: DataTypes.INTEGER, allowNull: false},
	rating: {type: DataTypes.INTEGER, defaultValue: 0},
	img: {type: DataTypes.STRING, allowNull: false}
});

export const Type = sequelizeConnection.define('type', {
	id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
	name: {type: DataTypes.STRING, unique: true, allowNull: false},
});

export const Brand = sequelizeConnection.define('brand', {
	id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
	name: {type: DataTypes.STRING, unique: true, allowNull: false},
});

export const Rating = sequelizeConnection.define('rating', {
	id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
	rate: {type: DataTypes.INTEGER, allowNull: false},
});

export const ProductInfo = sequelizeConnection.define('product_info', {
	id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
	title: {type: DataTypes.STRING, allowNull: false},
	description: {type: DataTypes.STRING, allowNull: false},
});

export const TypeBrand = sequelizeConnection.define('type_brand', {
	id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
});

User.hasOne(Cart);
Cart.belongsTo(User);

User.hasMany(Rating);
Rating.belongsTo(User);

Cart.hasMany(CartProduct);
CartProduct.belongsTo(Cart);

Type.hasMany(Product);
Product.belongsTo(Type);

Brand.hasMany(Product);
Product.belongsTo(Brand);

Product.hasMany(Rating);
Rating.belongsTo(Product);

Product.hasMany(CartProduct);
CartProduct.belongsTo(Product);

Product.hasMany(ProductInfo, {as: 'info'});
ProductInfo.belongsTo(Product);

Type.belongsToMany(Brand, {through: TypeBrand});
Brand.belongsToMany(Type, {through: TypeBrand});