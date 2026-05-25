// Fixed: renamed file from Alerts.jsx to Alert.jsx to match component name
export default function Alert({ type, message }) {
  if (!message) return null;

  const baseClasses = "px-4 py-3 rounded relative mb-4";
  const typeClasses = {
    success: "bg-green-100 text-green-700",
    error: "bg-red-100 text-red-700",
    warning: "bg-yellow-100 text-yellow-700",
    info: "bg-blue-100 text-blue-700",
  };

  const classes = `${baseClasses} ${typeClasses[type] || typeClasses.info}`;

  return <div className={classes}>{message}</div>;
}
