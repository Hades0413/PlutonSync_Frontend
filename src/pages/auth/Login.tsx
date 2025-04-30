import React from "react";
import LoginForm from "../../components/common/forms/LoginForm";

const Login: React.FC = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--pluton-background)] text-[var(--pluton-text)]">
      <LoginForm />
    </div>
  );
};

export default Login;
