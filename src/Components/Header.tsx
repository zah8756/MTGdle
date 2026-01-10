import { useState } from "react";
import Modal from "./Modal";
const Header = () => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	const closeModal = () => {
		setIsModalOpen(false);
	};

	return (
		<header className='w-full max-w-6xl mx-auto px-4'>
			<h1 className='font-bold text-8xl'>MTGdle</h1>
			<button onClick={() => setIsModalOpen(true)}>Open</button>
			{isModalOpen && <Modal isModalOpen={isModalOpen} onClose={closeModal} />}
		</header>
	);
};

export default Header;
