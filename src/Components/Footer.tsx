const Footer = () => {
	return (
		<footer className='text-center text-gray-400 text-sm border-t border-gray-700 py-6 bg-neutral-900 z-10 max-w-7xl '>
			<p className='mb-2'>
				This site is a non-commercial fan project and is not affiliated with or
				endorsed by Wizards of the Coast.
			</p>
			<p className='mb-2 italic'>
				<span className='font-semibold text-gray-300'>
					Magic: The Gathering
				</span>{" "}
				and all related logos, symbols, and card names are © Wizards of the
				Coast LLC.
			</p>
			<p className='mb-2'>
				Card artwork © Wizards of the Coast. Featured artwork:{" "}
				<span className='text-gray-300'>"Black Lotus"</span> by{" "}
				<span className='text-gray-300'>Chris Rahn</span>.
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
		</footer>
	);
};

export default Footer;
