import {observer} from 'mobx-react-lite';
import {useContext} from 'react';
import {Context} from '../main.tsx';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faRubleSign} from '@fortawesome/free-solid-svg-icons';
import {useNavigate} from 'react-router-dom';
import {PRODUCT_ROUTE} from '../utils/consts.ts';

type ProductsListProps = {
	className?: string;
}

const ProductsList = observer(({className}: ProductsListProps) => {
	const {products} = useContext(Context);
	const navigate = useNavigate();

	return (
		<div className={'grid grid-cols-4 gap-x-2' + (className ? ` ${className}` : '')}>
			{products.products.map((el, index) => (
				<div
					className="p-5 mb-6 justify-center width-auto min-w-[10vw] overflow-hidden justify-self-center cursor-pointer"
					key={index}
					onClick={() => navigate(PRODUCT_ROUTE + el.id)}
				>
					<div
						className="flex min-w-[5rem] min-h-[5rem] w-[15vw] h-[30vh] overflow-hidden rounded-lg relative">
						<img src={`${import.meta.env.VITE_API_URL}/${el.img}`} alt=""
							 className="rounded-lg top-[50%] left-[50%] -translate-x-2/4 -translate-y-2/4 object-center absolute"/>
					</div>

					<p className="font text-lg mt-1">{el.name}</p>
					<p className="font-semibold tabular-nums tracking-tight text-xl">{el.price}
						<FontAwesomeIcon icon={faRubleSign} size="xs" className="ml-1"/>
					</p>
				</div>
			))}
		</div>
	);
});

export default ProductsList;