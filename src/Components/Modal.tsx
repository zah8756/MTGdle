import { useRef, useEffect } from "react";

//might want to try children prop to handle the innter text not sure however because of the usabilty concersns
//also try the dialog element
const Modal = ({
	isModalOpen,
	onClose,
	children,
}: {
	isModalOpen: boolean;
	onClose: () => void;
	children: React.ReactNode;
}) => {
	const modalRef = useRef<HTMLDialogElement>(null);

	useEffect(() => {
		if (modalRef.current) {
			if (isModalOpen) {
				modalRef.current.showModal();
			} else {
				modalRef.current.close();
			}
		}
	}, [isModalOpen]);

	return (
		<dialog
		ref={modalRef}
		className='bg-white rounded shadow-md p-8 w-[75%] max-w-[600px] opacity-100 flex flex-col text-black m-auto z-30 inset-0 backdrop:bg-black/50 relative'
		role='dialog'
		aria-label='Dialog-modal'
		tabIndex={-1}>
		<button
		//get rid of focus on close 
			onClick={() => onClose()}
			className='absolute top-2 right-2 flex justify-center items-center w-10 h-10 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400'
			type='button'
			aria-label='Close modal'>
			<svg
				xmlns='http://www.w3.org/2000/svg'
				className='h-6 w-6'
				fill='none'
				viewBox='0 0 24 24'
				stroke='currentColor'
				strokeWidth={2}>
				<path
					strokeLinecap='round'
					strokeLinejoin='round'
					d='M6 18L18 6M6 6l12 12'
				/>
			</svg>
		</button>
		{children}
	</dialog>
	);
};

export default Modal;
