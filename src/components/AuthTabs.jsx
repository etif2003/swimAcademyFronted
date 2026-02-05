import { Link, useSearchParams } from "react-router-dom";

const AuthTabs = () => {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode"); // signup | null

  return (
    <div className="auth-tabs">
      <Link
        to="/auth"
        className={`auth-tab ${!mode ? "active" : ""}`}
      >
        התחברות
      </Link>

      <Link
        to="/auth?mode=signup"
        className={`auth-tab ${mode === "signup" ? "active" : ""}`}
      >
        הרשמה
      </Link>
    </div>
  );
};

export default AuthTabs;
