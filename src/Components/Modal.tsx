import { useRef, useEffect } from "react";

const Modal = ({
	isModalOpen,
	onClose,
}: {
	isModalOpen: boolean;
	onClose: () => void;
}) => {
	const focusList = useRef<HTMLLIElement | null>(null);
	

	useEffect(() => {
		focusList.current?.focus();
	}, [isModalOpen]);

	return (
		<div className='fixed left-0 top-0 bg-black/50 w-screen h-screen flex justify-center items-center z-30'>
			<div
				ref={focusList}
				className='bg-white rounded shadow-md p-8 w-[20%] opacity-100 flex flex-col text-black'
				role='dialog'
				aria-label='fan-content-policy'
				tabIndex={-1}>
				<button onClick={() => onClose()}>&times;</button>
				<p className='mb-2'>
					This site is a non-commercial fan project and is not affiliated with
					or endorsed by Wizards of the Coast.
				</p>
				<p className='mb-2 italic'>
					<span className='font-semibold '>Magic: The Gathering</span> and all
					related logos, symbols, and card names are © Wizards of the Coast LLC.
				</p>
				<p className='mb-2'>
					Card artwork © Wizards of the Coast. Featured artwork:{" "}
					<span className=''>"Black Lotus"</span> by{" "}
					<span className=''>Chris Rahn</span>.
				</p>
				<p>
					Used under Wizards of the Coast’s{" "}
					<a
						href='https://company.wizards.com/en/legal/fancontentpolicy'
						target='_blank'
						rel='noopener noreferrer'
						className='text-red-500 hover:text-red-400 underline'>
						Fan Content Policy
					</a>
					.
				</p>
			</div>
		</div>
	);
};

export default Modal;
