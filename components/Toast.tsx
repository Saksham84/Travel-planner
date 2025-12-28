"use client";

type ToastProps = {
  message: string;
  type?: "success" | "error" | "warning";
};

export default function Toast({ message, type = "success" }: ToastProps) {
  const styles = {
    success: "bg-green-600",
    error: "bg-red-600",
    warning: "bg-yellow-500 text-black",
  };

  return (
    <div
      className={`fixed top-6 right-6 z-50 px-5 py-3 rounded-lg shadow-lg text-white animate-slide-in ${styles[type]}`}
    >
      {message}
    </div>
  );
}
