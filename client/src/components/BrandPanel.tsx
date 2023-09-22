import {observer} from 'mobx-react-lite';
import {useContext} from 'react';
import {Context} from '../main.tsx';

type BrandPanelProps = {
	className?: string;
}

const BrandPanel = observer(({className}: BrandPanelProps) => {
	const {products} = useContext(Context);
	return (
		<div
			className={
				'text-center overflow-auto'
				+ (className ? ` ${className}` : '')
			}
		>
			<ul className="flex">
				{products.brands.map((el, index) => (
					<div
						className={
							'border-[1px] border-indigo-950 py-2 cursor-pointer px-6 whitespace-nowrap select-none'
							+ (index == 0 ? ' rounded-l' : '')
							+ (index == products.brands.length - 1 ? ' rounded-r' : '')
							+ (index + 1 === products.selectedBrand?.id ? ' bg-indigo-800' : ' bg-indigo-950')
						}
						key={el.id}
						onClick={() => products.setSelectedBrand(el.id === products.selectedBrand?.id ? null : el)}
					>
						{el.name}
					</div>
				))}
			</ul>
		</div>
	);
});

export default BrandPanel;