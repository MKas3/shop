type ButtonProps = {
	children?: React.ReactNode;
	type?: 'button' | 'submit' | 'reset';
	onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
	className?: string;
	isAlt?: boolean;
}

function Button({children, type = "button", onClick, className, isAlt}: ButtonProps) {
	return (
		<button
			type={type}
			className={
				'px-5 py-2 rounded transition duration-75'
				+ (className ? ` ${className}` : '')
				+ (isAlt ? ' border-[1px] border-indigo-950 hover:bg-indigo-700/10' : ' hover:bg-indigo-700 bg-indigo-800')
			}
			onClick={onClick}
		>
			{children}
		</button>
	);
}

export default Button;