import { useState } from "react";
import Input from "../common/Input";
import Button from "../common/Button";
import Spinner from "../common/Spinner";
import Alert from "../common/Alert";
import { loginUser } from "../../api/authApi";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const { loginUser: setAuthUser } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await loginUser(formData);
      setAuthUser(res.data);
      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

      <Alert type="error" message={error} />

      <form onSubmit={handleSubmit}>
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
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <Button primary type="submit" className="w-full" disabled={loading}>
          {loading ? <Spinner /> : "Login"}
        </Button>

        {/* Fixed: href changed from /signup to /register to match your routes */}
        <span className="text-sm text-gray-600 mt-4 block text-center">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-500 hover:underline">
            Sign up
          </a>
        </span>
        <span className="text-sm text-gray-600 mt-2 block text-center">
          <a href="/forgot-password" className="text-blue-500 hover:underline">
            Forgot password?
          </a>
        </span>
      </form>
    </div>
  );
}
