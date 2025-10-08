import "./Footer.css"
export default function Footer() {
	return (
		<footer className="footer">
			<div className="footer-content">
				<div className="footer-disclaimer">
					<p>
						We operate as a linking service that connects you directly to Twitter's content delivery network.
						No video files are stored on our servers - all downloads come straight from Twitter's official CDN.
						We respect intellectual property rights and do not facilitate or encourage copyright infringement.
					</p>
				</div>

				<div className="footer-bottom">
					<p className="footer-made">
						Crafted with <span className="footer-heart">♥</span> by developers who love simplicity
					</p>
					<p className="footer-year">© 2025</p>
				</div>
			</div>
		</footer>
	)
}
