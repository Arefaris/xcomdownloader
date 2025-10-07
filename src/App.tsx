import { useEffect, useRef, useState } from 'react'
import './App.css'
import { fetchTwitterMedia } from './twitterFetcher'

function App() {
	const [videoUrl, setVideoUrl] = useState<string>("");
	const userUrlRef = useRef<HTMLInputElement>(null)
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string>("");

	const isValidTwitterUrl = (url: string): boolean => {
		const twitterPattern = /^https?:\/\/(www\.)?(twitter\.com|x\.com)\/\w+\/status\/\d+/i;
		return twitterPattern.test(url);
	};

	const handleFetch = async () => {
		setError("");

		if(userUrlRef.current?.value){
			const url = userUrlRef.current.value.trim();

			if (!url) {
				setError("Please enter a URL");
				return;
			}

			if (!isValidTwitterUrl(url)) {
				setError("Invalid X.com/Twitter URL. Format: https://x.com/username/status/1234567890");
				return;
			}

			setLoading(true);
			const result = await fetchTwitterMedia(url);

			if (result.found && result.media[0]) {
				setVideoUrl(result.media[0].url);
			} else {
				setError("No media found or unable to fetch");
			}
			setLoading(false);
		}
	};

	return (
		<>
			<h1>Simple x.com downloader</h1>
			<h2>Paste your link</h2>

			<input placeholder='x.com url' ref={userUrlRef}></input>

			<button onClick={handleFetch} disabled={loading}>
				{loading ? 'Loading...' : 'Download Video'}
			</button>

			{error && (
				<p style={{ color: 'red' }}>{error}</p>
			)}

			{videoUrl && (
				window.open(videoUrl, '_blank')?.focus()
			)}
		</>
	)
}

export default App
