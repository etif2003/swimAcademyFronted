const AuthSideInfo = () => {
    return (
        <div className="auth-info">
            <div className="cta-wave top">
                <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
                    <path
                        d="M0,64 C240,96 480,96 720,80 960,64 1200,32 1440,48 L1440,0 L0,0 Z"
                        fill="rgba(255,255,255,0.15)"
                    />
                </svg>
            </div>
            <h1>
                הפלטפורמה המובילה<br />
                לשחייה בישראל
            </h1>

            <p>
                מחברים בין תלמידים, מדריכים ובתי ספר לשחייה.
                מצאו את הקורס המושלם עבורכם!
            </p>

            <div className="auth-stats">
                <div>
                    <strong>10K+</strong>
                    <span>תלמידים</span>
                </div>
                <div>
                    <strong>200+</strong>
                    <span>מדריכים</span>
                </div>
                <div>
                    <strong>500+</strong>
                    <span>קורסים</span>
                </div>
            </div>
            <div className="cta-wave">
                <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
                    <path
                        d="M0,64 C240,96 480,96 720,80 960,64 1200,32 1440,48 L1440,120 L0,120 Z"
                        fill="rgba(255,255,255,0.15)"
                    />
                </svg>
            </div>
        </div>
    );
};

export default AuthSideInfo;
