"use client";
import FaqAccordion from "@/components/FaqAccordion";
import LinkWrapper from "@/components/shared/LinkWrapper";
import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";

export default function Page() {
  const { user, error, isLoading } = useUser();

  return (
    <div
      className="hero min-h-screen overflow-hidden bg-cover"
      style={{
        backgroundImage:
          "url(https://images2.alphacoders.com/261/thumb-1920-26102.jpg)",
      }}
    >
      <div className="hero-overlay"></div>

      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-md">
          <div className="flex flex-col items-center mb-4">
            <h2 className="text-xl">
              {user ? `Welcome back, ${user.name} ` : "Introducing "}
            </h2>
            <h1 className="bold text-3xl text-purple-400 ">Read Away!</h1>
          </div>

          {user ? (
            <>
              <Link
                className="btn btn-secondary mt-2 btn-outline"
                href="/library"
              >
                Enter the library
              </Link>
            </>
          ) : (
            <>
              <FaqAccordion />
              <Link
                prefetch={false}
                className="btn btn-primary m-2"
                href="/api/auth/login"
              >
                Login
              </Link>
              <LinkWrapper
                pointerEvents="none"
                className="btn btn-ghost m-2  cursor-not-allowed"
                href="#the-void"
              >
                Enter the library
              </LinkWrapper>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
