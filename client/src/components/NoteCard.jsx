function formatDate(dateValue) {
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(new Date(dateValue));
}

function NoteCard({ note, onDelete, isDeleting }) {
  return (
    <article className="surface-panel group p-5 transition duration-200 hover:-translate-y-1 hover:bg-white/95">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-oat-700">Personal Note</p>
          <div className="mt-3 h-1 w-14 rounded-full bg-[linear-gradient(90deg,_rgba(196,127,73,0.8),_rgba(32,66,61,0.6))]" />
        </div>
        <button
          className="rounded-full border border-transparent px-3 py-1.5 text-sm font-semibold text-[#7d8079] transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
          onClick={() => onDelete(note._id)}
          disabled={isDeleting}
          type="button"
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
      </div>

      <p className="mt-5 whitespace-pre-wrap text-[15px] leading-7 text-[#30362f]">{note.text}</p>

      <p className="mt-8 text-xs font-bold uppercase tracking-[0.18em] text-[#8c8f88]">
        Created {formatDate(note.createdAt)}
      </p>
    </article>
  );
}

export default NoteCard;
