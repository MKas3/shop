import {useEffect, useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCaretDown} from '@fortawesome/free-solid-svg-icons';

type SelectProps = {
	title?: string;
	optionsArray?: string[];
	onClick?: (openState: boolean) => void;
	onChange?: (option: string) => void;
	className?: string;
	isOpen?: boolean;
}

function Select({title, optionsArray, onClick, onChange, className, isOpen}: SelectProps) {
	const [isOpenState, setIsOpenState] = useState(false);
	const [selectedOption, setSelectedOption] = useState('');

	const handleOptionClick = (option: string) => {
		setSelectedOption(option);
		setIsOpenState(false);
		if (onChange)
			onChange(option);
	};

	useEffect(() => {
		setIsOpenState(isOpen ?? false);
	}, [isOpen]);

	useEffect(() => {
		if (optionsArray)
			setSelectedOption(optionsArray[0]);
	}, [optionsArray]);

	useEffect(() => {
		if (onClick)
			onClick(isOpenState);
	}, [isOpenState]);

	return (
		<div className={className}>
			{title && <p className="mb-1">{title}</p>}
			<div className="relative">
				<button
					className="z-0 py-1 px-2 w-full justify-center border-[1px] bg-neutral-900 hover:bg-white/10 border-neutral-800 rounded-md flex items-center transition ease-in-out duration-150"
					onClick={() => setIsOpenState(!isOpenState)}
					type="button"
				>
					{selectedOption}
					<div className="ml-2">
						<FontAwesomeIcon icon={faCaretDown} size="2xs"/>
					</div>
				</button>

				{isOpenState &&
                    <div
                        className="absolute z-10 border-[1px] bg-neutral-900 mt-1 rounded-md max-h-screen overflow-auto shadow-lg"
                    >
						{optionsArray?.map((option, index) => (
							<button
								id="option"
								key={index}
								className="px-4 py-2 rounded-md text-sm hover:bg-white/10 w-full transition duration-75"
								onClick={() => handleOptionClick(option)}
							>
								{option}
							</button>
						))}
                    </div>}
			</div>
		</div>
	);
}

export default Select;