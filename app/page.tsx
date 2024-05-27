import Sidebar from "@/components/Sidebar";

export default function Home() {
  return (
    <div className="hero min-h-full">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Welcome!</h1>
          <p className="py-6">
            Introducing ReadAway, an innovative application designed to help you
            effortlessly keep track of your reading progress and share
            insightful reviews of your favorite books.
          </p>

          <p className="py-6 ">
            Inspired by the popular Goodreads platform, ReadAway offers a
            seamless user experience tailored to passionate readers who want to
            stay organized and connected in the world of literature.{" "}
          </p>

          <button className="btn btn-primary">Get Started</button>
        </div>
      </div>
    </div>
  );
}
