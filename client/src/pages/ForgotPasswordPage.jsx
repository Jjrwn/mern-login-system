import ForgotPasswordForm from "../components/auth/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  // Fixed: removed double title and wrapper — ForgotPasswordForm already has its own
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <ForgotPasswordForm />
    </div>
  );
}
