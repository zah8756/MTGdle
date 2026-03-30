import { useState, useRef } from "react";

const Footer = () => {
	const [isLegendOpen, setIsLegendOpen] = useState<boolean>(true);
	const contentRef = useRef<HTMLDivElement>(null);
	return (
		<>
			<footer className='text-gray-400 text-sm z-20 fixed bottom-0 left-0 right-0 flex flex-col items-center w-full max-w-6xl mx-auto px-4'>
				{/* Shirt-tag tab — the only thing visible when collapsed */}
				<button
					onClick={() => setIsLegendOpen((prev) => !prev)}
					className='flex items-center gap-2 px-5 py-1 bg-neutral-900/95 backdrop-blur-sm border border-gray-700 border-b-0 rounded-t-lg text-gray-400 hover:text-white transition-colors text-xs font-medium tracking-wide'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						className={`h-3 w-3 transition-transform duration-300 ${isLegendOpen ? "" : "rotate-180"}`}
						fill='none'
						viewBox='0 0 24 24'
						stroke='currentColor'
						strokeWidth={2.5}>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M5 15l7-7 7 7'
						/>
					</svg>
					Legend
					<svg
						xmlns='http://www.w3.org/2000/svg'
						className={`h-3 w-3 transition-transform duration-300 ${isLegendOpen ? "" : "rotate-180"}`}
						fill='none'
						viewBox='0 0 24 24'
						stroke='currentColor'
						strokeWidth={2.5}>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M5 15l7-7 7 7'
						/>
					</svg>
				</button>

				{/* Collapsible panel — full width, only appears when open */}
				<div
					ref={contentRef}
					style={{
						maxHeight: isLegendOpen
							? (contentRef.current?.scrollHeight ?? 9999) + "px"
							: "0px",
						overflow: "hidden",
						transition: "max-height 0.35s ease-in-out",
					}}
					className='w-full bg-neutral-900/95 backdrop-blur-sm border-t border-gray-700 rounded-t-lg '>
					<div className='max-w-6xl mx-auto px-4 py-4 flex flex-col gap-4'>
						{/* Hint colour key */}
						<div>
							<p className='text-xs uppercase tracking-widest text-gray-200 mb-3'>
								Hint colours
							</p>
							<ul className='flex flex-wrap justify-center gap-x-6 gap-y-3'>
								<li className='flex items-center gap-2'>
									<div className='w-6 h-6 rounded bg-green-700 shrink-0'></div>
									<span>Correct</span>
								</li>
								<li className='flex items-center gap-2'>
									<div className='w-6 h-6 rounded bg-yellow-700 shrink-0'></div>
									<span>Partially correct</span>
								</li>
								<li className='flex items-center gap-2'>
									<div className='w-6 h-6 rounded bg-red-700 shrink-0 flex items-center justify-center text-white text-xs font-bold'>
										↑
									</div>
									<span>Too low / too early</span>
								</li>
								<li className='flex items-center gap-2'>
									<div className='w-6 h-6 rounded bg-red-700 shrink-0 flex items-center justify-center text-white text-xs font-bold'>
										↓
									</div>
									<span>Too high / too recent</span>
								</li>
								<li className='flex items-center gap-2'>
									<div className='w-6 h-6 rounded bg-red-700 shrink-0'></div>
									<span>Incorrect</span>
								</li>
							</ul>
						</div>

						<div className='border-t border-gray-700'></div>

						{/* MTG colour reference */}
						<div>
							<p className='text-xs uppercase tracking-widest text-gray-200 mb-3'>
								MTG colours
							</p>
							<ul className='flex flex-wrap justify-center gap-x-6 gap-y-3'>
								<li className='flex items-center gap-2'>
									<i className='ms ms-w ms-cost ms-shadow'></i>
									<span>White</span>
								</li>
								<li className='flex items-center gap-2'>
									<i className='ms ms-u ms-cost ms-shadow'></i>
									<span>Blue</span>
								</li>
								<li className='flex items-center gap-2'>
									<i className='ms ms-b ms-cost ms-shadow'></i>
									<span>Black</span>
								</li>
								<li className='flex items-center gap-2'>
									<i className='ms ms-r ms-cost ms-shadow'></i>
									<span>Red</span>
								</li>
								<li className='flex items-center gap-2'>
									<i className='ms ms-g ms-cost ms-shadow'></i>
									<span>Green</span>
								</li>
								<li className='flex items-center gap-2'>
									<i className='ms ms-c ms-cost ms-shadow'></i>
									<span>Colorless</span>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</footer>
		</>
	);
};

export default Footer;
