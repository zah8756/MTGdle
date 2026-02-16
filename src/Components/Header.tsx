import { useState } from "react";
import Modal from "./Modal";
const Header = () => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	return (
		<header className='w-full max-w-6xl mx-auto px-4'>
			<h1 className='font-bold text-8xl'>MTGdle</h1>
			<button onClick={() => setIsModalOpen(true)}>Open</button>
			{isModalOpen && (
				<Modal isModalOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
					<p className='mb-2'>
						This site is a non-commercial fan project and is not affiliated with
						or endorsed by Wizards of the Coast.
					</p>
					<p className='mb-2 italic'>
						<span className='font-semibold '>Magic: The Gathering</span> and all
						related logos, symbols, and card names are © Wizards of the Coast
						LLC.
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
				</Modal>
			)}
		</header>
	);
};

export default Header;
