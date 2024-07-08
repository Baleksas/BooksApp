"use client";
import { useMemo } from "react";
import { Toaster } from "react-hot-toast";
import toast, { useToaster } from "react-hot-toast/headless";

const Notifications = () => {
  const { toasts, handlers } = useToaster();
  const { startPause, endPause } = handlers;

  // TODO: hide a toast when another comes up

  return (
    <div onMouseEnter={startPause} onMouseLeave={endPause}>
      {toasts
        .filter((toast) => toast.visible)
        .map((toast, i) => (
          <div
            key={toast.id}
            {...toast.ariaProps}
            role="alert"
            style={{ maxWidth: "calc(100% - 20px)" }}
            className={`alert alert-${toast.type} fixed z-10 m-2 w-full sm:w-80 bottom-0 right-0"`}
          >
            <span className="text-2xl">
              {toast.type === "success" && "✔️"}
              {toast.type === "loading" && "⏳"}
              {toast.type === "error" && "❌"}
              {toast.type === "blank" && "ℹ️"}
            </span>
            <span>{toast.message as string}</span>
          </div>
        ))}
    </div>
  );
};

export default Notifications;
