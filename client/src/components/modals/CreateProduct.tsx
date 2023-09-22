import Modal, {ModalProps} from './Modal.tsx';
import SafeInput from '../SafeInput.tsx';
import {FieldValues, useForm} from 'react-hook-form';
import {useContext, useEffect, useState} from 'react';
import Button from '../Button.tsx';
import Select from '../Select.tsx';
import {Context} from '../../main.tsx';
import {IInfo} from '../../models/models.ts';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faXmark} from '@fortawesome/free-solid-svg-icons';
import {createProduct, fetchBrands, fetchTypes} from '../../http/productAPI.ts';
import {observer} from 'mobx-react-lite';

const CreateProduct = observer(({isShow, onExitClick, children, className}: ModalProps) => {
	const {products} = useContext(Context);
	const {register, handleSubmit} = useForm();
	const [name, setName] = useState('');
	const [brandName, setBrandName] = useState('');
	const [typeName, setTypeName] = useState('');
	const [price, setPrice] = useState(0);
	const [img, setImg] = useState<File | null>(null);
	const [info, setInfo] = useState<Array<IInfo>>([]);

	const addProduct = (_: FieldValues) => {
		if (!img)
			return;
		const formData = new FormData();
		formData.append('name', name);
		formData.append('price', `${price}`);
		formData.append('typeId', `${products.types.find(el => el.name === typeName)}`);
		formData.append('brandId', `${products.brands.find(el => el.name === brandName)}`);
		formData.append('img', img, img.name);
		formData.append('info', img, JSON.stringify(info));
		createProduct(formData);
	};

	const changeInfo = (key: keyof IInfo, value: IInfo[keyof IInfo], index: number) => {
		setInfo(info.map((el, i) => index === i ? {...el, [key]: value} : el));
	};

	useEffect(() => {
		fetchTypes().then(data => products.setTypes(data));
		fetchBrands().then(data => products.setBrands(data));
	}, []);

	return (
		<form onSubmit={handleSubmit(addProduct)}>
			<Modal isShow={isShow} className={className} onExitClick={onExitClick}>
				<p className="font-bold text-xl mb-10">Create Product</p>
				<SafeInput
					placeholder="Name"
					register={register}
					minLength={1}
					maxLength={40}
					value={name}
					onChange={(value) => setName(value.currentTarget.value)}
				/>
				<SafeInput
					placeholder="Price"
					type="number"
					register={register}
					minLength={1}
					maxLength={20}
					value={price.toString()}
					onChange={(value) => setPrice(value.currentTarget.valueAsNumber)}
				/>
				<SafeInput
					placeholder="Image"
					type="file"
					register={register}
					onChange={(value) => setImg(value.currentTarget.files && value.currentTarget.files[0])}
				/>
				<Select
					className="mt-4"
					title="Type"
					optionsArray={products.types.map(el => el.name)}
					onChange={(option) => setTypeName(option)}
				/>
				<Select
					className="mt-4"
					title="Brand"
					optionsArray={products.brands.map(el => el.name)}
					onChange={(option) => setBrandName(option)}
				/>
				<div className="mt-6 ">
					<p>Product Info</p>
					<ul className="space-y-2 overflow-auto">
						{info.map((el, index) => (
							<li className="flex space-x-2 items-center" key={index}>
								<SafeInput
									registerKey={index.toString()}
									register={register}
									placeholder="Title"
									onChange={e => changeInfo('title', e.currentTarget.value, index)}
								/>
								<SafeInput
									registerKey={(-(index + 1)).toString()}
									register={register}
									placeholder="Description"
									value={el.description}
									onChange={e => changeInfo('description', e.currentTarget.value, index)}
								/>
								<Button
									isAlt={true}
									className="py-0"
									onClick={() => setInfo(info.filter(el2 => el2 !== el))}
								>
									<FontAwesomeIcon icon={faXmark}/>
								</Button>
							</li>
						))}
					</ul>
				</div>

				<Button
					className="float-left mt-5"
					onClick={() => setInfo([...info, {id: Date.now(), title: '', description: ''}])}
				>
					Add Info
				</Button>
				<Button type="submit" className="float-right mt-5">
					Create
				</Button>
				{children}
			</Modal>
		</form>
	);
});

export default CreateProduct;