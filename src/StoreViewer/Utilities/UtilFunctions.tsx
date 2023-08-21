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

function getAllKeys(obj: Record<string, any>, path: string[] = []): string[][] {
	let keys: any = [];

	for (let key in obj) {
		const currentPath = path.concat(key);

		if (
			Array.isArray(obj) &&
			typeof (obj as Record<string, any>)[key] !== "object"
		) {
			continue; // Skip primitive array elements
		}

		keys.push(currentPath);

		if (typeof obj[key] === "object" && obj[key] !== null) {
			keys = keys.concat(getAllKeys(obj[key], currentPath));
		}
	}

	return keys;
}

function findSublistWithValue(
	keysList: string[][],
	targetValue: string
): string[] | undefined {
	return keysList.find(
		(sublist) => sublist[sublist.length - 1] === targetValue
	);
}

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

export { deepMerge, getAllKeys, handleCopy, findSublistWithValue };
