import {observer} from 'mobx-react-lite';
import {useContext, useEffect, useState} from 'react';
import {Context} from '../main.tsx';
import Select from './Select.tsx';

type CatalogProps = {
	className?: string;
}

const Catalog = observer(({className}: CatalogProps) => {
	const {products} = useContext(Context);
	const [isTypesOpen, setIsTypesOpen] = useState(false);
	const [isBrandsOpen, setIsBrandsOpen] = useState(false);

	useEffect(() => {
		if (isTypesOpen)
			setIsBrandsOpen(false);
	}, [isTypesOpen]);

	useEffect(() => {
		if (isBrandsOpen)
			setIsTypesOpen(false);
	}, [isBrandsOpen]);

	return (
		<div
			className={
				'text-center overflow-auto'
				+ (className ? ` ${className}` : '')
			}
		>
			<Select
				optionsArray={products.types.map(el => el.name)}
				onChange={option => {
					products.setSelectedType(products.types.find(el => el.name === option)
						?? null);
				}}
				onClick={(openState) => setIsTypesOpen(openState)}
				isOpen={isTypesOpen}
			/>
			<Select
				optionsArray={products.brands.map(el => el.name)}
				onChange={option =>
					products.setSelectedBrand(products.brands.find(el => el.name === option)
						?? null)
				}
				onClick={(openState) => setIsBrandsOpen(openState)}
				isOpen={isBrandsOpen}
			/>
		</div>
	);
});

export default Catalog;