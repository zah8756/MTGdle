import { useState } from "react";
import Modal from "./Modal";
const Header = () => {
	const [isAboutModalOpen, setIsAboutModalOpen] = useState<boolean>(false);
	const [isRulesModalOpen, setIsRulesModalOpen] = useState<boolean>(false);
	const [isCreditsModalOpen, setIsCreditsModalOpen] = useState<boolean>(false);
	const [isSettingsModalOpen, setIsSettingsModalOpen] =
		useState<boolean>(false);

	return (
		<header className='w-full max-w-6xl mx-auto px-4 flex  justify-center flex-col gap-4'>
			<h1 className='font-bold text-8xl'>MTGdle</h1>
			<div className='flex justify-center gap-4'>
				<button onClick={() => setIsAboutModalOpen(true)}>About</button>
				<button onClick={() => setIsRulesModalOpen(true)}>How to play</button>
				<button onClick={() => setIsCreditsModalOpen(true)}>Credits</button>
				<button onClick={() => setIsSettingsModalOpen(true)}>Settings</button>
			</div>
			{isAboutModalOpen && (
				<Modal
					isModalOpen={isAboutModalOpen}
					onClose={() => setIsAboutModalOpen(false)}>
					<h2 className='text-2xl font-bold'>About</h2>
				</Modal>
			)}
			{isRulesModalOpen && (
				<Modal
					isModalOpen={isRulesModalOpen}
					onClose={() => setIsRulesModalOpen(false)}>
					<h2 className='text-2xl font-bold'>How to play</h2>
					<p className='mb-2'>
						MTGdle is a wordle-style game for Magic: The Gathering cards.
					</p>
					<p className='mb-2'>
						You are given a random card and you need to guess the card by typing
						the name of the card in the input field.
					</p>
					<p className='mb-2'>You have 20 guesses to guess the card.</p>
					<p className='mb-2'>
						Each guess will be evaluated and you will be given a hint on the
						next guess.
					</p>
					<p className='mb-2'>
						You can use the keyboard to navigate the input field.
					</p>
					<p className='mb-2'>
						You can use the mouse to click the input field.
					</p>
				</Modal>
			)}
			{isCreditsModalOpen && (
				<Modal
					isModalOpen={isCreditsModalOpen}
					onClose={() => setIsCreditsModalOpen(false)}>
					<h2 className='text-2xl font-bold'>About</h2>
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
			{isSettingsModalOpen && (
				<Modal
					isModalOpen={isSettingsModalOpen}
					onClose={() => setIsSettingsModalOpen(false)}>
					<h2 className='text-2xl font-bold'>Settings</h2>
					<p className='mb-2'>Settings</p>
				</Modal>
			)}
		</header>
	);
};

export default Header;
