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

  // const handleResultsPerPageChange = (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   setSearchOptions((prevState) => ({
  //     ...prevState,
  //     resultsPerPage: Number(event.target.value),
  //   }));
  // };
  return (
    <>
      <label className="input input-bordered flex items-center gap-2">
        <input
          name="title"
          value={searchOptions.title}
          onChange={handleTitleChange}
          type="text"
          className="grow"
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
      <label className="form-control">
        <div className="label">
          <span className="label-text-alt">Results per page</span>
        </div>
        <select
          onChange={(e) =>
            setSearchOptions((prevState) => ({
              ...prevState,
              resultsPerPage: Number(e.target.value),
            }))
          }
          defaultValue={10}
          className="select select-bordered select-sm"
        >
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={20}>20</option>
        </select>
      </label>
    </>
  );
}
