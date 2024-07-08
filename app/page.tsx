import Link from "next/link";

export default async function Page() {
  return (
    <div className="hero min-h-full">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-4xl font-bold">Introducing ReadAway!</h1>
          <p className="py-6 text-lg">
            An innovative application designed to help you effortlessly keep
            track of your reading progress and share insightful reviews of your
            favorite books.
          </p>
          <p className="py-6 text-lg">
            Inspired by the popular Goodreads platform, ReadAway offers a
            seamless user experience tailored to passionate readers who want to
            stay organized and connected in the world of literature.{" "}
          </p>
          <Link className="btn btn-primary mt-2" href="/library">
            Find books
          </Link>
          <button></button>
        </div>
      </div>
    </div>
  );
}
