import { useRef, useState } from 'react'
import './App.css'
import { fetchTwitterMedia } from './twitterFetcher'
import Faq from './components/faq';

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
			<div className="hero-cont">
				<h1 className="title">Download <span className="tw-h-hilight">Twitter Videos</span> </h1>
				<h1 className="second-title-line">in Seconds</h1>
				<h3 className="description-hero">The fastest and easiest way to download videos from Twitter/X. No sign-up required. HD quality. Always free.</h3>

				<input className='main-input' placeholder='Paste Twitter/X video URL here...' ref={userUrlRef}></input>

				<button className='input-btn' onClick={handleFetch} disabled={loading}>
					{loading ? 'Loading...' : 'Download Video'}
			</button>
			<h6>Supports all Twitter/X video formats • No watermarks • Lightning fast</h6>
			</div>		
			
			{error && (
				<p className="error-message">{error}</p>
			)}

			{videoUrl && (
				window.open(videoUrl, '_blank')?.focus()
			)}
			<br></br>
			<Faq></Faq>
		</>
	)
}

export default App
