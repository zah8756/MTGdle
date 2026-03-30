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
			<h1 className='font-bold text-6xl tracking-wide title-shadow sm:text-8xl'>
				MTGdle
			</h1>
			<div className='flex justify-center gap-1.5 sm:gap-2'>
				<button
					onClick={() => setIsAboutModalOpen(true)}
					className='px-2.5 py-1 text-xs sm:px-4 sm:py-1.5 sm:text-sm rounded-md border border-gray-600 text-gray-300 hover:bg-white/10 hover:text-white hover:border-gray-400 transition-all duration-200'>
					About
				</button>
				<button
					onClick={() => setIsRulesModalOpen(true)}
					className='px-2.5 py-1 text-xs sm:px-4 sm:py-1.5 sm:text-sm rounded-md border border-gray-600 text-gray-300 hover:bg-white/10 hover:text-white hover:border-gray-400 transition-all duration-200'>
					How to play
				</button>
				<button
					onClick={() => setIsCreditsModalOpen(true)}
					className='px-2.5 py-1 text-xs sm:px-4 sm:py-1.5 sm:text-sm rounded-md border border-gray-600 text-gray-300 hover:bg-white/10 hover:text-white hover:border-gray-400 transition-all duration-200'>
					Credits
				</button>
				<button
					onClick={() => setIsSettingsModalOpen(true)}
					className='px-2.5 py-1 text-xs sm:px-4 sm:py-1.5 sm:text-sm rounded-md border border-gray-600 text-gray-300 hover:bg-white/10 hover:text-white hover:border-gray-400 transition-all duration-200'>
					Settings
				</button>
			</div>
			{isAboutModalOpen && (
				<Modal
					isModalOpen={isAboutModalOpen}
					onClose={() => setIsAboutModalOpen(false)}>
					<div className='flex flex-col gap-2'>
						<h2 className='text-2xl font-bold after:content-["_"] after:block after:w-full after:h-[1px] after:bg-gray-300'>
							About
						</h2>
						<p className='mb-2'>
							MTGdle is a wordle-style game for Magic: The Gathering cards.
						</p>
						<p className='mb-2'>
							Every day, a new card is chosen from nearly every card in magic's
							history and you have to guess it in 20 guesses.
						</p>
						<p className='mb-2'>
							You can use the keyboard to navigate the input field.
						</p>
						<p className='mb-2'>
							Greatly inspired by{"  "}
							<a
								href='https://loldle.net/'
								target='_blank'
								rel='noopener noreferrer'>
								loldle
							</a>{" "}
							and{" "}
							<a
								href='https://commandercodex.com/?from=loldle.net_with_love'
								target='_blank'
								rel='noopener noreferrer'>
								commandercodex
							</a>{" "}
						</p>
					</div>

					<div className='flex flex-col gap-2'>
						{" "}
						<h2 className='text-2xl font-bold after:content-["_"] after:block after:w-full after:h-[1px] after:bg-gray-300'>
							Feedback
						</h2>
						<p className='mb-2'>
							Have feedback or suggestions? Please contact me at{" "}
							<a href='mailto:zah8756@gmail.com'>zah8756@gmail.com</a>.
						</p>
					</div>
				</Modal>
			)}
			{isRulesModalOpen && (
				<Modal
					isModalOpen={isRulesModalOpen}
					onClose={() => setIsRulesModalOpen(false)}>
					<h2 className='text-2xl font-bold after:content-["_"] after:block after:w-full after:h-[1px] after:bg-gray-300'>
						How to play
					</h2>
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
					<h2 className='text-2xl font-bold after:content-["_"] after:block after:w-full after:h-[1px] after:bg-gray-300'>
						Credits
					</h2>
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
