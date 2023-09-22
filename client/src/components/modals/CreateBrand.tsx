import Modal, {ModalProps} from './Modal.tsx';
import SafeInput from '../SafeInput.tsx';
import {FieldValues, useForm} from 'react-hook-form';
import {useState} from 'react';
import Button from '../Button.tsx';
import {createBrand} from '../../http/productAPI.ts';

function CreateBrand({isShow, onExitClick, children, className}: ModalProps) {
	const {register, handleSubmit} = useForm();
	const [brandName, setBrandName] = useState('');
	const addBrand = (_: FieldValues) => {
		createBrand({name: brandName, id: 0}).then(_ => setBrandName(''));
		onExitClick();
	};

	return (
		<form onSubmit={handleSubmit(data => addBrand(data))}>
			<Modal isShow={isShow} className={className} onExitClick={onExitClick}>
				<p className="font-bold text-xl mb-10">Create Brand</p>
				<SafeInput
					placeholder="Name"
					register={register}
					minLength={1}
					maxLength={40}
					value={brandName}
					onChange={(value) => setBrandName(value.currentTarget.value)}
				/>
				<Button type="submit" className="float-right mt-5">
					Create
				</Button>
				{children}
			</Modal>
		</form>
	);
}

export default CreateBrand;