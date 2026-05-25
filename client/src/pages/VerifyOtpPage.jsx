import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import OtpForm from "../components/auth/OtpForm";
import { verifyOtp, resendOtp } from "../api/authApi";

export default function VerifyOtpPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // Email and type passed from RegisterPage or ForgotPasswordPage via navigate state
  const email = location.state?.email || "";
  const type = location.state?.type || "email-verification";

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Fixed: OTP submit logic lives here and is passed down as prop to OtpForm
  const handleSubmit = async (code) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      await verifyOtp({ email, code, type });
      setSuccess("OTP verified successfully!");
      setTimeout(() => {
        // After email verification go to login, after password reset go to login too
        navigate("/login");
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Invalid or expired OTP.");
    } finally {
      setLoading(false);
    }
  };

  // Fixed: resend logic lives here and is passed down as prop to OtpForm
  const handleResend = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      await resendOtp({ email, type });
      setSuccess("A new OTP has been sent to your email.");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to resend OTP.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <OtpForm
        onSubmit={handleSubmit}
        onResend={handleResend}
        loading={loading}
        error={error}
        success={success}
      />
    </div>
  );
}
