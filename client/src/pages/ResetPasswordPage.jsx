import ResetPasswordForm from "../components/auth/ResetPasswordForm";

export default function ResetPasswordPage() {
  // Fixed: removed double title and wrapper — ResetPasswordForm already has its own
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <ResetPasswordForm />
    </div>
  );
}
