export function encodeString(str) {
	return window.btoa(encodeURIComponent(str));
}

export function decodeString(str) {
	return decodeURIComponent(window.atob(str));
}
