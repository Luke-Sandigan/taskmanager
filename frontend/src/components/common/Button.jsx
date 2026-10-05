function Button({ children, type = "button", disabled = false, onClick, variant = "primary" }) {
  const styles = variant === "danger"
    ? "bg-red-600 hover:bg-red-700"
    : variant === "secondary"
      ? "bg-slate-200 text-slate-800 hover:bg-slate-300"
      : "bg-blue-600 text-white hover:bg-blue-700";

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`rounded-lg px-4 py-2 font-medium transition disabled:cursor-not-allowed disabled:opacity-50 ${styles}`}
    >
      {children}
    </button>
  );
}

export default Button;
