import Modal, {ModalProps} from './Modal.tsx';
import SafeInput from '../SafeInput.tsx';
import {FieldValues, useForm} from 'react-hook-form';
import {useState} from 'react';
import Button from '../Button.tsx';
import {createType} from '../../http/productAPI.ts';

function CreateType({isShow, onExitClick, children, className}: ModalProps) {
	const {register, handleSubmit} = useForm();
	const [typeName, setTypeName] = useState('');
	const addType = (_: FieldValues) => {
		createType({name: typeName, id: 0}).then(_ => setTypeName(''));
		onExitClick();
	}

	return (
		<form onSubmit={handleSubmit(addType)}>
			<Modal isShow={isShow} className={className} onExitClick={onExitClick}>
				<p className="font-bold text-xl mb-10">Create Type</p>
				<SafeInput
					placeholder="Name"
					register={register}
					minLength={1}
					maxLength={40}
					value={typeName}
					onChange={(value) => setTypeName(value.currentTarget.value)}
				/>
				<Button type="submit" className="float-right mt-5">
					Create
				</Button>
				{children}
			</Modal>
		</form>
	);
}

export default CreateType;