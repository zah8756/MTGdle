import { useState } from "react";
import Modal from "./Modal";

interface HeaderProps {
	isPracticeMode: boolean;
	onSwitchToDaily: () => void;
	onSwitchToPractice: () => void;
}

const Header = ({
	isPracticeMode,
	onSwitchToDaily,
	onSwitchToPractice,
}: HeaderProps) => {
	const [isAboutModalOpen, setIsAboutModalOpen] = useState<boolean>(false);
	const [isRulesModalOpen, setIsRulesModalOpen] = useState<boolean>(false);
	const [isCreditsModalOpen, setIsCreditsModalOpen] = useState<boolean>(false);
	const [modesModalOpen, setModesModalOpen] = useState<boolean>(false);

	return (
		<header className='w-full max-w-6xl mx-auto px-4 flex  justify-center flex-col gap-4'>
			<h1 className='font-bold text-6xl tracking-wide title-shadow sm:text-8xl'>
				MTGdle
			</h1>
			<div className='flex justify-center gap-1.5 sm:gap-2'>
				<button
					onClick={() => setIsAboutModalOpen(true)}
					className='cursor-pointer px-3 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm rounded-md border border-gray-600 bg-[var(--btn-bg)] text-gray-200 hover:bg-[var(--btn-bg-hover)] hover:text-white hover:border-gray-400 transition-all duration-200'>
					About
				</button>
				<button
					onClick={() => setIsRulesModalOpen(true)}
					className='cursor-pointer px-3 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm rounded-md border border-gray-600 bg-[var(--btn-bg)] text-gray-200 hover:bg-[var(--btn-bg-hover)] hover:text-white hover:border-gray-400 transition-all duration-200'>
					How to play
				</button>
				<button
					onClick={() => setIsCreditsModalOpen(true)}
					className='cursor-pointer px-3 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm rounded-md border border-gray-600 bg-[var(--btn-bg)] text-gray-200 hover:bg-[var(--btn-bg-hover)] hover:text-white hover:border-gray-400 transition-all duration-200'>
					Credits
				</button>
				<button
					onClick={() => setModesModalOpen(true)}
					className='cursor-pointer px-3 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm rounded-md border border-gray-600 bg-[var(--btn-bg)] text-gray-200 hover:bg-[var(--btn-bg-hover)] hover:text-white hover:border-gray-400 transition-all duration-200'>
					Modes
				</button>
			</div>
			{isAboutModalOpen && (
				<Modal
					isModalOpen={isAboutModalOpen}
					onClose={() => setIsAboutModalOpen(false)}>
					<div className='flex flex-col gap-2'>
					<h2 className='text-2xl font-bold after:content-["_"] after:block after:w-full after:h-[1px] after:bg-gray-700'>
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
					<h2 className='text-2xl font-bold after:content-["_"] after:block after:w-full after:h-[1px] after:bg-gray-700'>
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
					<h2 className='text-2xl font-bold after:content-["_"] after:block after:w-full after:h-[1px] after:bg-gray-700'>
						How to play
					</h2>
					<p className='mb-2'>
						MTGdle is a wordle-style game for Magic: The Gathering cards.
					</p>
					<p className='mb-2'>
						Every Day a new card is chosen for the cards of the day and you can
						put in your guesses by typing the name of the card in the input
						field.
					</p>
					<p className='mb-2'>
						You have 20 guesses to guess the card of the day.
					</p>
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
					<h2 className='text-2xl font-bold after:content-["_"] after:block after:w-full after:h-[1px] after:bg-gray-700'>
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
			{modesModalOpen && (
				<Modal
					isModalOpen={modesModalOpen}
					onClose={() => setModesModalOpen(false)}>
					<h2 className='text-3xl font-bold after:content-["_"] after:block after:w-full after:h-[1px] after:bg-gray-700'>
						Modes
					</h2>
					<p className='text-lg text-gray-400 mb-4'>
						Switching modes currently resets your current game.
					</p>
					<div className='flex flex-col gap-3'>
						<button
							onClick={() => {
								onSwitchToDaily();
								setModesModalOpen(false);
							}}
							className={`group flex items-center justify-between px-4 py-3 rounded-md border text-left transition-all duration-200 cursor-pointer ${
								!isPracticeMode
									? "border-emerald-500 bg-emerald-500/10"
									: "border-gray-600 hover:bg-white/10 hover:border-gray-400"
							}`}>
							<div>
								<p
								className={`font-bold text-lg  ${!isPracticeMode ? "text-emerald-300" : "text-gray-200 group-hover:text-gray-400"}`}>
								Card of the Day
							</p>
							<p
								className={`text-s mt-0.5 ${!isPracticeMode ? "text-emerald-400" : "text-gray-400 group-hover:text-gray-500"}`}>
								A new card every day, the same for everyone.
							</p>
							</div>
							{!isPracticeMode && (
								<svg
									xmlns='http://www.w3.org/2000/svg'
									className='h-5 w-5 text-emerald-400 shrink-0 ml-4'
									viewBox='0 0 20 20'
									fill='currentColor'>
									<path
										fillRule='evenodd'
										d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
										clipRule='evenodd'
									/>
								</svg>
							)}
						</button>
						<button
							onClick={() => {
								onSwitchToPractice();
								setModesModalOpen(false);
							}}
							className={`group flex items-center justify-between px-4 py-3 rounded-md border text-left transition-all duration-200 cursor-pointer ${
								isPracticeMode
									? "border-emerald-500 bg-emerald-600/10"
									: "border-gray-600 hover:bg-white/10 hover:border-gray-400"
							}`}>
							<div>
								<p
								className={`font-bold text-lg ${isPracticeMode ? "text-emerald-300" : "text-gray-200 group-hover:text-gray-400"}`}>
								Random Card
							</p>
							<p
								className={`text-s mt-0.5 ${isPracticeMode ? "text-emerald-400" : "text-gray-400 group-hover:text-gray-500"}`}>
								A random card each time — play as many as you like.
							</p>
							</div>
							{isPracticeMode && (
								<svg
									xmlns='http://www.w3.org/2000/svg'
									className='h-5 w-5 text-emerald-400 shrink-0 ml-4'
									viewBox='0 0 20 20'
									fill='currentColor'>
									<path
										fillRule='evenodd'
										d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
										clipRule='evenodd'
									/>
								</svg>
							)}
						</button>
					</div>
				</Modal>
			)}
		</header>
	);
};

export default Header;
