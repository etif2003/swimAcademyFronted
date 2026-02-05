


import { useSearchParams } from "react-router";
import RegisterForm from "../components/RegisterForm";
import LoginForm from "../components/LoginForm";
import AuthTabs from "../components/AuthTabs";

const AuthPage = () => {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode"); // signup | null
  const role = searchParams.get("role"); // instructor | school | null
  return (
    <div className="auth-page">
      <AuthTabs />

      {mode === "signup" ? <RegisterForm /> : <LoginForm />}
    </div>
  );
};

export default AuthPage;
