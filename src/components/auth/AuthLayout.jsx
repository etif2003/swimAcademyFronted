import "../../styles/AuthLayout.css";

const AuthLayout = ({ left, right }) => {
    return (
        <div className="auth-layout">
            <div className="auth-side auth-side--form">
                {right}
            </div>
            <div className="auth-side auth-side--info">
                {left}
            </div>
        </div>
    );
};

export default AuthLayout;
