type PaginationProps = {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  resultsPerPage: number;
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  setCurrentPage,
  resultsPerPage,
}) => {
  return (
    <div className="join grid grid-cols-2">
      <button
        className="join-item btn btn-outline"
        onClick={() => setCurrentPage(currentPage - resultsPerPage)}
        disabled={currentPage === 0}
      >
        Previous page
      </button>
      <button
        className="join-item btn btn-outline"
        onClick={() => setCurrentPage(currentPage + resultsPerPage)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
