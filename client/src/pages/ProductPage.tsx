import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCaretDown, faCaretUp, faRubleSign, faStar} from '@fortawesome/free-solid-svg-icons';
import {faStar as faEmptyStar, faStarHalfStroke} from '@fortawesome/free-regular-svg-icons';
import Button from '../components/Button.tsx';
import {useContext, useEffect, useState} from 'react';
import {IBrand, IInfo, IProduct} from '../models/models.ts';
import {useNavigate, useParams} from 'react-router-dom';
import {fetchBrands, fetchOneProduct} from '../http/productAPI.ts';
import {SHOP_ROUTE} from '../utils/consts.ts';
import {observer} from 'mobx-react-lite';
import {Context} from '../main.tsx';

const MAX_PRODUCT_INFO_ELEMENTS = 5;

const ProductPage = observer(() => {
	const {products} = useContext(Context);
	const [isProductInfoOpen, setIsProductInfoOpen] = useState(false);
	const [product, setProduct] = useState({info: [] as Array<IInfo>} as IProduct);
	const [brands, setBrands] = useState<IBrand[]>([]);
	const {id} = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		fetchBrands().then(data => setBrands(data));
		fetchOneProduct(id ? Number(id) : 1).then(data => setProduct(data));
	}, []);

	const getStarIcon = (index: number) => {
		if (index < product.rating) {
			if (product.rating - index >= 1)
				return faStar;
			return faStarHalfStroke;
		} else
			return faEmptyStar;
	};

	return (
		<div className="mx-10 p-10 bg-neutral-900 rounded-2xl">
			<div className="grid grid-cols-2 grid-rows-1">
				<img src={product.img && `${import.meta.env.VITE_API_URL}/${product.img}`} alt="" className="w-[40vw] rounded-2xl"/>
				<div>
					<p
						className="text-neutral-500 cursor-pointer"
						onClick={() => {
							products.setSelectedBrand(brands.find(el => el.id === product.brandId)!);
							navigate(SHOP_ROUTE);
						}
						}
					>
						{brands.length > 0 && brands.find(el => el.id === product.brandId)?.name}
					</p>
					<p className="font-bold text-2xl">{product.name}</p>
					<div className="select-none">
						{Array.from(
							{length: 5},
							(_, i) =>
								<FontAwesomeIcon
									key={i}
									icon={getStarIcon(i)}
									color="yellow"
								/>
						)}
						<span className="ml-1 ">{product.rating}</span>
					</div>
					<p className="font-bold tracking-wider text-2xl bg-green-600 w-fit p-2 rounded-xl mt-3">
						{product.price}
						<FontAwesomeIcon icon={faRubleSign} size="xs" className="ml-1"/>
					</p>
					<div className="flex space-x-3 mt-10">
						<Button className="rounded-full" isAlt={true}>To the cart</Button>
						<Button className="rounded-full">Buy now</Button>
					</div>
					<div className="mt-20 font-semibold text-sm space-y-3">
						{product.info.map((el, index) => (
							(isProductInfoOpen || index < MAX_PRODUCT_INFO_ELEMENTS) &&
                            <div className="grid grid-cols-3 border-dashed pb-1 border-b-[1px]" key={index}>
                                <p className="text-neutral-500 mr-1">{el.title}: </p>
                                <p className="col-span-2">{el.description}</p>
                            </div>
						))}
					</div>
					<div className="w-full mt-5 text-center">
						<button
							className="px-4 text-indigo-700 hover:text-indigo-400 transition"
							onClick={() => setIsProductInfoOpen(!isProductInfoOpen)}
						>
							{isProductInfoOpen ? 'Close description' : 'Show description'}
							<FontAwesomeIcon className="ml-1" icon={isProductInfoOpen ? faCaretUp : faCaretDown}
											 size="sm"/>
						</button>
					</div>

				</div>

			</div>

			<p></p>
		</div>
	);
});

export default ProductPage;