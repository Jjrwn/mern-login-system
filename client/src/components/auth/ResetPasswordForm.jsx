import { useState } from "react";
import Input from "../common/Input";
import Button from "../common/Button";
import Spinner from "../common/Spinner";
import Alert from "../common/Alert";
import { resetPassword } from "../../api/authApi";
import { useNavigate, useLocation } from "react-router-dom";

export default function ResetPasswordForm() {
  const navigate = useNavigate();
  const location = useLocation();

  // Email passed from ForgotPasswordForm via navigation state
  const email = location.state?.email || "";

  const [formData, setFormData] = useState({
    code: "",
    newPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (formData.newPassword.length < 8) {
      setError("Password must be at least 8 characters");
      setLoading(false);
      return;
    }

    try {
      const res = await resetPassword({ email, ...formData });
      setSuccess(res.data.message);
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(
        err.response?.data?.message || "Reset failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">Reset Password</h2>

      <Alert type="error" message={error} />
      <Alert type="success" message={success} />

      <form onSubmit={handleSubmit}>
        {/* Fixed: added OTP code field — backend requires it */}
        <Input
          id="code"
          label="OTP Code"
          type="text"
          name="code"
          placeholder="Enter the OTP sent to your email"
          value={formData.code}
          onChange={handleChange}
          required
        />
        {/* Fixed: added new password field — backend requires it */}
        <Input
          id="newPassword"
          label="New Password"
          type="password"
          name="newPassword"
          placeholder="Enter your new password (min 8 characters)"
          value={formData.newPassword}
          onChange={handleChange}
          required
        />

        <Button primary type="submit" className="w-full" disabled={loading}>
          {loading ? <Spinner /> : "Reset Password"}
        </Button>
      </form>
    </div>
  );
}
