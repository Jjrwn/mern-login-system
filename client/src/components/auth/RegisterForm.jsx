import { useState } from "react";
import Input from "../common/Input";
import Button from "../common/Button";
import Spinner from "../common/Spinner";
import Alert from "../common/Alert";
import { registerUser } from "../../api/authApi";
import { useNavigate } from "react-router-dom";

export default function RegisterForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters");
      setLoading(false);
      return;
    }

    try {
      await registerUser(formData);
      // Redirect to OTP verification and pass email via state
      navigate("/verify-otp", {
        state: { email: formData.email, type: "email-verification" },
      });
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

      <Alert type="error" message={error} />

      <form onSubmit={handleSubmit}>
        {/* Fixed: added username field — backend requires it */}
        <Input
          id="username"
          label="Username"
          type="text"
          name="username"
          placeholder="Enter your username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <Input
          id="email"
          label="Email"
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <Input
          id="password"
          label="Password"
          type="password"
          name="password"
          placeholder="Enter your password (min 8 characters)"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <Button primary type="submit" className="w-full" disabled={loading}>
          {loading ? <Spinner /> : "Register"}
        </Button>

        <span className="text-sm text-gray-600 mt-4 block text-center">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Login
          </a>
        </span>
      </form>
    </div>
  );
}
