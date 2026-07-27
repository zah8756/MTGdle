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
				modalRef.current.focus();
			} else {
				modalRef.current.close();
			}
		}
	}, [isModalOpen]);

	useEffect(() => {
		const el = modalRef.current;
		if (!el) return;
		const handler = () => onClose();
		el.addEventListener("close", handler);
		return () => el.removeEventListener("close", handler);
	}, [onClose]);

	return (
		<dialog
		ref={modalRef}
		className='bg-neutral-900 border border-gray-700 rounded-lg shadow-xl p-8 w-[75%] max-w-[600px] opacity-100 flex flex-col text-gray-100 m-auto z-30 inset-0 backdrop:bg-black/60 relative gap-4 text-start'
		role='dialog'
		aria-label='Dialog-modal'
		tabIndex={-1}>
		<button
			onClick={() => onClose()}
			className='absolute top-2 right-2 flex justify-center items-center w-10 h-10 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-600'
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
