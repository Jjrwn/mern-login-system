export default function Input({ label, id, ...rest }) {
  return (
    <div className="mb-4">
      {/* Fixed: label now uses htmlFor linked to input id for accessibility */}
      {label && (
        <label htmlFor={id} className="block text-gray-700 mb-2">
          {label}
        </label>
      )}
      {/* Fixed: added w-full so input stretches to fill its container */}
      <input
        id={id}
        className="w-full border rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        {...rest}
      />
    </div>
  );
}
