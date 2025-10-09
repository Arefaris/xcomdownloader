import * as twitterMediaModule from 'get-twitter-media';
import { trackSearch, trackDownload, trackError } from './analytics';

// @ts-ignore - library exports default but types say named export
const getTwitterMedia = (twitterMediaModule as any).default || (twitterMediaModule as any).getTwitterMedia || twitterMediaModule;

export async function fetchTwitterMedia(url: string, options = { buffer: false }) {
	try {
		// Track the search/URL submission
		trackSearch(url);

		const result = await getTwitterMedia(url, options);

		// Track successful media fetch
		if (result.found && result.media) {
			const mediaType = result.media[0]?.type || 'unknown';
			trackDownload(mediaType === 'video' ? 'video' : 'image', 'twitter');
		}

		return result;
	} catch (error) {
		console.error('Error fetching media:', error);

		// Track the error
		trackError('fetch_error', (error as Error).message);

		return { found: false, error: (error as Error).message };
	}
}
