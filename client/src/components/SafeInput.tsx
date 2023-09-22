import {ChangeEvent} from 'react';
import {FieldValues, UseFormRegister, ValidationRule} from 'react-hook-form';

type InputProps = {
	register: UseFormRegister<FieldValues>;
	title?: string;
	value?: string;
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
	minLength?: number;
	maxLength?: number;
	pattern?: ValidationRule<RegExp>;
	className?: string;
	placeholder?: string;
	type?: React.HTMLInputTypeAttribute;
	registerKey?: string;
};

function SafeInput({
					   register,
					   title,
					   value,
					   onChange,
					   minLength,
					   maxLength,
					   pattern,
					   className,
					   placeholder,
					   type,
					   registerKey
				   }: InputProps) {
	return (
		<div className={className}>
			{title && <p className="mb-1">{title}</p>}
			<input
				type={type}
				className="bg-neutral-900 w-full border-[1px] border-neutral-800 px-2 py-1 rounded-md focus:hover:bg-neutral-900 focus:outline-2 focus:outline-indigo-950 transition duration-75"
				placeholder={placeholder}
				{...register(`${registerKey || title || placeholder}`, {
					value: value,
					onChange: value => onChange && onChange(value),
					minLength: minLength,
					maxLength: maxLength,
					pattern: pattern,
				})}
			/>
		</div>
	);
}

export default SafeInput;
