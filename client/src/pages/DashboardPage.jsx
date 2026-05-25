import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Button from "../components/common/Button";

export default function DashboardPage() {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Welcome, {user?.username}!
          </h1>
          <Button secondary onClick={handleLogout}>
            Logout
          </Button>
        </div>

        <div className="bg-white rounded shadow p-6">
          <p className="text-gray-600">You are successfully logged in.</p>
          <p className="text-gray-600 mt-2">Email: {user?.email}</p>
        </div>
      </div>
    </div>
  );
}
