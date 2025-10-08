import React from 'react'
import "./WhyChooseUs.css"

export default function WhyChooseUs() {
	const features = [
		{
			title: "Lightning Fast",
			description: "Download your favorite Twitter videos in seconds with our optimized servers"
		},
		{
			title: "100% Safe & Secure",
			description: "No malware, no spam. Your privacy is our top priority"
		},
		{
			title: "HD Quality",
			description: "Get videos in the highest quality available, up to 1080p"
		},
		{
			title: "No Watermarks",
			description: "Clean downloads without any branding or watermarks"
		}
	];

	return (
		<div className="why-choose-us">
			<h2 className="why-header">
				Why Choose Our <span className="why-header-highlight">Downloader?</span>
			</h2>
			<p className="why-subtitle">
				The most reliable Twitter video downloader with powerful features
			</p>

			<div className="features-grid">
				{features.map((feature, index) => (
					<div className="feature-card" key={index}>
						<h3 className="feature-title">{feature.title}</h3>
						<p className="feature-description">{feature.description}</p>
					</div>
				))}
			</div>
		</div>
	)
}
