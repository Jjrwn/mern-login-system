import { useState } from "react";
import Input from "../common/Input";
import Button from "../common/Button";
import Spinner from "../common/Spinner";
import Alert from "../common/Alert";
import { forgotPassword } from "../../api/authApi";
import { useNavigate } from "react-router-dom";

export default function ForgotPasswordForm() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const res = await forgotPassword({ email });
      setSuccess(res.data.message);
      // Redirect to reset password page after a short delay
      setTimeout(() => {
        navigate("/reset-password", {
          state: { email, type: "password-reset" },
        });
      }, 2000);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
      <p className="mb-4 text-gray-600">
        Enter your email address and we'll send you a password reset OTP.
      </p>

      <Alert type="error" message={error} />
      <Alert type="success" message={success} />

      <form onSubmit={handleSubmit}>
        <Input
          id="email"
          type="email"
          label="Email Address"
          name="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Button primary type="submit" className="w-full" disabled={loading}>
          {loading ? <Spinner /> : "Send Reset OTP"}
        </Button>
      </form>
    </div>
  );
}
