import React from "react";
import RegisterForm from "../../components/common/forms/RegisterForm";

const Register: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[var(--pluton-background)] text-[var(--pluton-text)] px-4">
      <RegisterForm />
    </div>
  );
};

export default Register;
