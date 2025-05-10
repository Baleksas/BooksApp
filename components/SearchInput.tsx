type SearchInputProps = {
  searchOptions: { title: string; resultsPerPage: number };
  setSearchOptions: React.Dispatch<
    React.SetStateAction<{ title: string; resultsPerPage: number }>
  >;
};

export default function SearchInput({
  searchOptions,
  setSearchOptions,
}: SearchInputProps) {
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchOptions((prevState) => ({
      ...prevState,
      title: event.target.value,
    }));
  };

  return (
    <>
      <div className="flex flex-col gap-2 md:gap-0 md:join md:flex-row w-full">
        <label className="input input-bordered flex items-center gap-2 w-full md:w-auto">
          <input
            autoComplete="on"
            name="title"
            value={searchOptions.title}
            onChange={handleTitleChange}
            type="text"
            className="grow join-item"
            placeholder="Search"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>

        <label className="form-control w-full md:w-auto">
          <select
            onChange={(e) =>
              setSearchOptions((prevState) => ({
                ...prevState,
                resultsPerPage: Number(e.target.value),
              }))
            }
            value={searchOptions.resultsPerPage}
            className="select select-bordered join-item w-full md:w-auto"
          >
            <option value={10}>10 per page</option>
            <option value={15}>15 per page</option>
            <option value={20}>20 per page</option>
          </select>
        </label>

        <button
          type="submit"
          className="btn btn-outline join-item w-full md:w-auto"
        >
          Search
        </button>
      </div>
    </>
  );
}
