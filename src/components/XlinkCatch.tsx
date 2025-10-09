import { useNavigate, useLocation } from "react-router"
import { useEffect, useState } from "react";
import { fetchTwitterMedia } from "../twitterFetcher";
import { trackPageView, trackEvent } from "../analytics";

export default function XlinkCatch() {
	const location = useLocation();
	const fullPath = location.pathname.slice(1);

	const [error, setError] = useState<string>("");
	const navigate = useNavigate();

	const isValidTwitterUrl = (url: string): boolean => {
		const twitterPattern = /^https?:\/\/(www\.)?(twitter\.com|x\.com)\/\w+\/status\/\d+/i;
		return twitterPattern.test(url);
	};


	useEffect(()=>{
		const twitterUrl = `https://x.com/${fullPath}`;

		// Track page view when direct link is accessed
		trackPageView('Direct Link Download', location.pathname);

		// Track direct link usage event
		trackEvent('direct_link_access', {
			path: fullPath,
			url: twitterUrl.substring(0, 50) // Truncate for privacy
		});

		if (!isValidTwitterUrl(twitterUrl)) {
			setError("Invalid X.com/Twitter URL. Format: from-x.com/username/status/1234567890");

			// Track invalid URL error
			trackEvent('invalid_direct_link', {
				path: fullPath,
				reason: 'invalid_format'
			});

			return;
		}

		const fetch = async () =>{

			const result = await fetchTwitterMedia(twitterUrl);

			if (result.found && result.media[0]) {

				window.location.href = result.media[0].url
			} else {
				navigate("/")
			}

		}

		fetch()
	}, [navigate, fullPath, location.pathname])


	return (<>
		{error && (
			<p className="error-message">{error}</p>
		)}
	</>



	)
}
