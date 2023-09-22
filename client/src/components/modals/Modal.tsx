import {useRef} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faXmark} from '@fortawesome/free-solid-svg-icons';

export type ModalProps = {
	isShow: boolean;
	onExitClick: (e?: React.MouseEvent<HTMLDivElement>) => void;
	children?: React.ReactNode;
	className?: string;
}

function Modal({isShow, onExitClick, children, className}: ModalProps) {
	const ref = useRef<HTMLDivElement>(null);
	return (
		<div
			ref={ref}
			className={
				'fixed inset-0 bg-black/20 flex justify-center items-start overflow-auto'
				+ (className ? ` ${className}` : '')
				+ (isShow ? '' : ' hidden')
			}
			onClick={(e) => (e.target === ref.current) && onExitClick(e)}
		>
			<div className="relative px-5 py-5 rounded bg-neutral-950 mt-16 overflow-auto transition-opacity">
				<div
					className="absolute right-2 top-2 p-1 cursor-pointer"
					onClick={(e) => onExitClick(e)}
				>
					<FontAwesomeIcon icon={faXmark}/>
				</div>
				{children}
			</div>
		</div>
	);
}

export default Modal;