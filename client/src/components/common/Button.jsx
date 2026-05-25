export default function Button({ children, primary, secondary, ...rest }) {
  const baseClasses =
    "px-4 py-2 rounded focus:outline-none transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed";
  const primaryClasses = "bg-indigo-600 text-white hover:bg-indigo-700";
  const secondaryClasses = "bg-gray-300 text-gray-800 hover:bg-gray-400";
  // Fixed: added default style when neither primary nor secondary is passed
  const defaultClasses = "bg-gray-200 text-gray-700 hover:bg-gray-300";

  const variantClass = primary
    ? primaryClasses
    : secondary
      ? secondaryClasses
      : defaultClasses;

  const classes = `${baseClasses} ${variantClass}`;

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
