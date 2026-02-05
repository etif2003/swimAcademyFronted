// src/pages/AuthPage.jsx
import { useSearchParams } from "react-router";
import AuthLayout from "../components/auth/AuthLayout";
import AuthSideInfo from "../components/auth/AuthSideInfo";
import AuthFormWrapper from "../components/auth/AuthFormWrapper";
import AuthTabs from "../components/auth/AuthTabs";
import RegisterForm from "../components/RegisterForm";
import LoginForm from "../components/LoginForm";
import BackToHome from "../components/auth/BackToHome";

const AuthPage = () => {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode"); // signup | null

  return (
    <AuthLayout
      left={<AuthSideInfo />}
      right={
        <AuthFormWrapper>
          <BackToHome />
          <AuthTabs />
          {mode === "signup" ? <RegisterForm /> : <LoginForm />}
        </AuthFormWrapper>
      }
    />
  );
};

export default AuthPage;