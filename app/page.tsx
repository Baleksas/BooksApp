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
          "url(https://i.postimg.cc/xTR1z3vv/Magical-Library-DALL-E-Nov-3.png)",
      }}
    >
      <div className="hero-overlay bg-opacity-80"></div>

      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-md">
          <h1 className="mb-5 text-4xl font-bold">
            Introducing{" "}
            <span className="bold text-purple-400 ">Read Away!</span>
          </h1>

          <FaqAccordion />
          {user ? (
            <Link
              className="btn btn-secondary mt-2 btn-outline"
              href="/library"
            >
              Find books
            </Link>
          ) : (
            <>
              <Link className="btn btn-primary mt-2" href="/api/auth/login">
                Login
              </Link>
              <LinkWrapper
                disabled={true}
                className="btn btn-secondary mt-2 btn-outline"
                href="/library"
              >
                Find books
              </LinkWrapper>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
