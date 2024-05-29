export function Pagination({
  pages,
  currentPage,
  onChange,
}: {
  pages: number;
  currentPage: number;
  onChange: (page: number) => void;
}) {
  return (
    <div className="flex flex-row justify-end">
      <div className="flex flex-row gap-2">
        <button className="text-pag font-medium" onClick={() => onChange(1)} disabled={currentPage === 1}>
          First
        </button>
        <button className="text-pag font-medium" onClick={() => onChange(currentPage - 1)} disabled={currentPage === 1}>
          Prev
        </button>
        <span className="text-pag">
          Page {currentPage} of {pages}
        </span>
        <button
          className="text-pag font-medium"
          onClick={() => onChange(currentPage + 1)}
          disabled={currentPage === pages}
        >
          Next
        </button>
        <button className="text-pag font-medium" onClick={() => onChange(pages)} disabled={currentPage === pages}>
          Last
        </button>
      </div>
    </div>
  );
}
