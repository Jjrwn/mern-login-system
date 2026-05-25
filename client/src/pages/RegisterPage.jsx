import RegisterForm from "../components/auth/RegisterForm";

export default function RegisterPage() {
  // Fixed: removed double title and wrapper — RegisterForm already has its own
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <RegisterForm />
    </div>
  );
}
