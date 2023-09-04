const handleCopy = async (
	label: string,
	setCopied: React.Dispatch<React.SetStateAction<boolean>>
) => {
	setCopied(false);
	try {
		await navigator?.clipboard?.writeText(label);
		setCopied(true);
	} catch (error) {
		console.log("Copy Failed");
	}
};

function deepMerge(target: any, source: any): any {
	const output = { ...target };

	if (isObject(target) && isObject(source)) {
		Object.keys(source).forEach((key) => {
			if (isObject(source[key])) {
				if (!(key in target)) {
					Object.assign(output, { [key]: source[key] });
				} else {
					output[key] = deepMerge(target[key], source[key]);
				}
			} else {
				Object.assign(output, { [key]: source[key] });
			}
		});
	}

	return output;
}

function isObject(item: any): boolean {
	return (
		item && typeof item === "object" && !Array.isArray(item) && item !== null
	);
}

export { deepMerge, handleCopy };
