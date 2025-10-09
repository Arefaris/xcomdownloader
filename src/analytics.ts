// src/analytics.ts
// Google Analytics 4 integration

declare global {
	interface Window {
		dataLayer: any[];
		gtag: (...args: any[]) => void;
	}
}

/**
 * Initialize Google Analytics
 * Call this once when the app starts
 */
export const initAnalytics = () => {
	const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;

	// Skip in development if no ID provided
	if (!measurementId) {
		console.warn('Google Analytics: Measurement ID not found in environment variables');
		return;
	}

	// Prevent double initialization
	if (window.dataLayer) {
		console.log('Google Analytics: Already initialized');
		return;
	}

	try {
		// Create and load Google Analytics script
		const script = document.createElement('script');
		script.async = true;
		script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
		document.head.appendChild(script);

		// Initialize dataLayer
		window.dataLayer = window.dataLayer || [];
		window.gtag = function gtag() {
			window.dataLayer.push(arguments);
		};

		// Configure Google Analytics
		window.gtag('js', new Date());
		window.gtag('config', measurementId, {
			send_page_view: true,
			anonymize_ip: true, // Privacy-friendly
		});

		console.log('Google Analytics: Initialized successfully');
	} catch (error) {
		console.error('Google Analytics: Initialization failed', error);
	}
};

/**
 * Track custom events
 * @param eventName - Name of the event (e.g., 'download', 'search')
 * @param params - Additional parameters
 */
export const trackEvent = (eventName: string, params?: Record<string, any>) => {
	if (typeof window.gtag === 'undefined') {
		console.warn('Google Analytics: gtag not initialized');
		return;
	}

	try {
		window.gtag('event', eventName, params);
		console.log('Google Analytics: Event tracked', eventName, params);
	} catch (error) {
		console.error('Google Analytics: Event tracking failed', error);
	}
};

/**
 * Track page views manually (for SPAs)
 * @param pageTitle - Title of the page
 * @param pagePath - Path of the page
 */
export const trackPageView = (pageTitle: string, pagePath: string) => {
	if (typeof window.gtag === 'undefined') {
		console.warn('Google Analytics: gtag not initialized');
		return;
	}

	try {
		window.gtag('event', 'page_view', {
			page_title: pageTitle,
			page_path: pagePath,
		});
		console.log('Google Analytics: Page view tracked', pageTitle, pagePath);
	} catch (error) {
		console.error('Google Analytics: Page view tracking failed', error);
	}
};

// Predefined event tracking functions for common actions

/**
 * Track media download event
 */
export const trackDownload = (mediaType: 'video' | 'image', source: string = 'twitter') => {
	trackEvent('download', {
		media_type: mediaType,
		source: source,
		timestamp: new Date().toISOString(),
	});
};

/**
 * Track search/URL submission
 */
export const trackSearch = (url: string) => {
	trackEvent('search', {
		search_term: url.substring(0, 50), // Truncate for privacy
		timestamp: new Date().toISOString(),
	});
};

/**
 * Track errors
 */
export const trackError = (errorType: string, errorMessage: string) => {
	trackEvent('error', {
		error_type: errorType,
		error_message: errorMessage,
		timestamp: new Date().toISOString(),
	});
};

/**
 * Track button clicks
 */
export const trackButtonClick = (buttonName: string, buttonLocation?: string) => {
	trackEvent('button_click', {
		button_name: buttonName,
		button_location: buttonLocation,
	});
};
