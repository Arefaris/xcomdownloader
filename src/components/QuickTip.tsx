import "./QuickTip.css"

export default function QuickTip() {
	return (
		<div className="quick-tip">
			<div className="quick-tip-container">
				<div className="tip-content">
					<h3 className="tip-title">Pro Tip: Super Quick Download</h3>
					<p className="tip-description">
						Add <code className="tip-code">from-</code> before <code className="tip-code">x.com</code> in any tweet URL for instant download!
					</p>
					<div className="tip-example">
						<div className="example-label">Example:</div>
						<div className="example-urls">
							<span className="example-url original">x.com/username/status/1234567890</span>
							<span className="arrow">→</span>
							<span className="example-url modified">from-x.com/username/status/1234567890</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
