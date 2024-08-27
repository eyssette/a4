export function typographyNonBreakingSpaces(str) {
	return str.replace(/ ([!?;:»])|« /g, (match, addNBspaceBefore) => {
		if (addNBspaceBefore) return `&nbsp;${addNBspaceBefore}`;
		return "«&nbsp;";
	});
}
