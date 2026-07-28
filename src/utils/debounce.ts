export default function debounce<T extends (...args: any[]) => void>(
	func: T,
	wait: number,
) {
	let data: ReturnType<typeof setTimeout> | null = null;
	return function (...args: Parameters<T>) {
		clearTimeout(data ?? undefined);
		data = setTimeout(() => {
			data = null;
			func(...args);
		}, wait);
	};
}
