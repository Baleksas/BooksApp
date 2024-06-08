"use client";
import { Toaster } from "react-hot-toast";
import toast, { useToaster } from "react-hot-toast/headless";

const Notifications = () => {
  const { toasts, handlers } = useToaster();
  const { startPause, endPause } = handlers;

  return (
    <div onMouseEnter={startPause} onMouseLeave={endPause}>
      {toasts
        .filter((toast) => toast.visible)
        .map((toast) => (
          <div
            key={toast.id}
            {...toast.ariaProps}
            role="alert"
            style={{ maxWidth: "calc(100% - 20px)" }}
            className="alert alert-error fixed z-10 m-2 w-full sm:w-64 bottom-0 right-0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-8 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{toast.message as string}</span>
          </div>
        ))}
    </div>
  );
};

export default Notifications;
