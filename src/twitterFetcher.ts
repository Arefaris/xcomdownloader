import * as twitterMediaModule from 'get-twitter-media';

// @ts-ignore - library exports default but types say named export
const getTwitterMedia = (twitterMediaModule as any).default || (twitterMediaModule as any).getTwitterMedia || twitterMediaModule;

export async function fetchTwitterMedia(url: string, options = { buffer: false }) {
	try {
		const result = await getTwitterMedia(url, options);
		return result;
	} catch (error) {
		console.error('Error fetching media:', error);
		return { found: false, error: (error as Error).message };
	}
}
