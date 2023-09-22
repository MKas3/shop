import {useContext} from 'react';
import {observer} from 'mobx-react-lite';
import {Context} from '../main.tsx';

type PagesProps = {
	className?: string;
}

const Pages = observer(({className}: PagesProps) => {
	const {products} = useContext(Context);
	const pagesCount = Math.ceil(products.totalCount / products.limit);
	const pages	 = Array.from({length: pagesCount}, (_, i) => i + 1);

	return (
		<div className={'text-center' + (className ? ` ${className}` : '')}>
			{pages.map((page, index) =>
				<button
					key={index}
					className={
						'border-[1px] border-indigo-800 p-2 transition duration-75'
						+ (index === 0 ? ' rounded-l' : '')
						+ (index === pages.length - 1 ? ' rounded-r' : '')
						+ (index + 1 === products.page ? ' bg-indigo-900 hover:bg-indigo-700' : ' hover:bg-indigo-700/25')
					}
					onClick={() => products.setPage(index + 1)}
				>
					{page}
				</button>
			)}
		</div>
	);
});

export default Pages;