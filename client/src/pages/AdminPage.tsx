import Button from '../components/Button.tsx';
import CreateProduct from '../components/modals/CreateProduct.tsx';
import {useContext, useState} from 'react';
import CreateType from '../components/modals/CreateType.tsx';
import CreateBrand from '../components/modals/CreateBrand.tsx';
import {observer} from 'mobx-react-lite';
import {Context} from '../main.tsx';
import {useNavigate} from 'react-router-dom';
import {SHOP_ROUTE} from '../utils/consts.ts';

const AdminPage = observer(() => {
	const {user} = useContext(Context);
	const navigate = useNavigate();
	const [isProductModalOpen, setIsProductModalOpen] = useState(false);
	const [isTypeModalOpen, setIsTypeModalOpen] = useState(false);
	const [isBrandModalOpen, setIsBrandModalOpen] = useState(false);

	if (user.user.role !== 'ADMIN')
		navigate(SHOP_ROUTE);

	return (
		<div className="relative">
			<div className="flex flex-col space-y-4 justify-center items-center min-h-[75vh]">
				<Button
					className="w-[20vw]"
					onClick={() => setIsProductModalOpen(true)}
				>
					Add Product
				</Button>
				<Button
					className="w-[20vw]"
					onClick={() => setIsTypeModalOpen(true)}
				>
					Add Type
				</Button>
				<Button
					className="w-[20vw]"
					onClick={() => setIsBrandModalOpen(true)}
				>
					Add Brand
				</Button>
			</div>
			<CreateProduct
				isShow={isProductModalOpen}
				onExitClick={() => setIsProductModalOpen(false)}
			/>
			<CreateType
				isShow={isTypeModalOpen}
				onExitClick={() => setIsTypeModalOpen(false)}
			/>
			<CreateBrand
				isShow={isBrandModalOpen}
				onExitClick={() => setIsBrandModalOpen(false)}
			/>

		</div>

	);
});

export default AdminPage;