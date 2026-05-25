import { useState } from "react";
import Input from "../common/Input";
import Button from "../common/Button";
import Spinner from "../common/Spinner";
import Alert from "../common/Alert";

export default function OtpForm({
  onSubmit,
  onResend,
  loading,
  error,
  success,
}) {
  // Fixed: added local state so the OTP value can be read and passed to onSubmit
  const [code, setCode] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(code);
  };

  return (
    <div className="max-w-sm mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Enter OTP</h2>
      <p className="text-sm text-gray-600 mb-4 text-center">
        Check your email for the OTP code.
      </p>

      <Alert type="error" message={error} />
      <Alert type="success" message={success} />

      <form onSubmit={handleSubmit}>
        <Input
          id="otp"
          label="OTP Code"
          type="text"
          name="otp"
          placeholder="Enter the OTP sent to your email"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        />

        <Button primary type="submit" className="w-full" disabled={loading}>
          {loading ? <Spinner /> : "Verify OTP"}
        </Button>

        {/* Added: resend OTP button wired to onResend prop */}
        <button
          type="button"
          onClick={onResend}
          disabled={loading}
          className="mt-3 w-full text-sm text-blue-500 hover:underline disabled:opacity-50"
        >
          Resend OTP
        </button>
      </form>
    </div>
  );
}
