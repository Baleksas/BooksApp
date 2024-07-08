export default function BookSkeleton() {
  return (
    <div className="card card-side bg-base-100 shadow-xl my-4 px-4">
      <div className="flex flex-row gap-4 w-full p-4">
        <div className="skeleton h-32 w-24"></div>
        <div className="flex flex-col gap-4 w-full">
          <div className="skeleton h-4 w-52"></div>
          <div className="skeleton h-4 w-40"></div>
          <div className="skeleton h-4 w-52"></div>
          <div className="flex flex-row justify-end gap-4 w-10/12">
            <div className="skeleton h-8 w-24"></div>
            <div className="skeleton h-8 w-24"></div>
            <div className="skeleton h-8 w-24"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
