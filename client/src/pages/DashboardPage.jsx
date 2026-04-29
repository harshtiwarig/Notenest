import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import NoteCard from "../components/NoteCard";
import { useAuth } from "../context/AuthContext";
import api, { getApiErrorMessage } from "../lib/api";

function DashboardPage() {
  const { user, logout } = useAuth();
  const [noteText, setNoteText] = useState("");
  const [notes, setNotes] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [deletingId, setDeletingId] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const loadNotes = async () => {
      try {
        const response = await api.get("/notes");
        setNotes(response.data);
      } catch (requestError) {
        setError(getApiErrorMessage(requestError, "Unable to load your notes"));
      } finally {
        setPageLoading(false);
      }
    };

    loadNotes();
  }, []);

  const handleCreateNote = async (event) => {
    event.preventDefault();

    if (!noteText.trim()) {
      setError("Please write something before saving your note");
      return;
    }

    setError("");
    setIsCreating(true);

    try {
      const response = await api.post("/notes", { text: noteText });
      setNotes((current) => [response.data, ...current]);
      setNoteText("");
    } catch (requestError) {
      setError(getApiErrorMessage(requestError, "Unable to save your note"));
    } finally {
      setIsCreating(false);
    }
  };

  const handleDeleteNote = async (noteId) => {
    setDeletingId(noteId);
    setError("");

    try {
      await api.delete(`/notes/${noteId}`);
      setNotes((current) => current.filter((note) => note._id !== noteId));
    } catch (requestError) {
      setError(getApiErrorMessage(requestError, "Unable to delete this note"));
    } finally {
      setDeletingId("");
    }
  };

  const handleLogout = () => {
    logout();
  };

  const latestNoteDate =
    notes.length > 0
      ? new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(new Date(notes[0].createdAt))
      : "No notes yet";

  return (
    <div className="min-h-screen px-4 py-4 sm:px-6 sm:py-6">
      <div className="mx-auto max-w-7xl">
        <Navbar userName={user?.name || "there"} onLogout={handleLogout} />

        <section className="page-fade surface-card mb-6 overflow-hidden px-6 py-6 sm:px-8 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
            <div>
              <span className="eyebrow">Your Personal Dashboard</span>
              <h2 className="mt-5 max-w-3xl font-serif text-4xl leading-tight text-ink sm:text-5xl">
                Capture thoughts quickly, then revisit them in a space that feels composed.
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-[#666c63] sm:text-base">
                NoteNest keeps your writing flow simple: add a note in seconds, scan your archive at a
                glance, and keep everything attached to your account.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              <div className="metric-card">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-oat-700">Total Notes</p>
                <p className="mt-3 text-3xl font-semibold text-ink">{notes.length}</p>
              </div>
              <div className="metric-card">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-oat-700">Latest Entry</p>
                <p className="mt-3 text-sm font-semibold text-ink">{latestNoteDate}</p>
              </div>
              <div className="metric-card">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-oat-700">Account</p>
                <p className="mt-3 truncate text-sm font-semibold text-ink">{user?.email}</p>
              </div>
            </div>
          </div>
        </section>

        <main className="grid gap-6 lg:grid-cols-[390px_1fr]">
          <section className="surface-card page-fade h-fit p-6 sm:p-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-oat-700">Quick Capture</p>
                <h2 className="mt-3 font-serif text-3xl leading-tight text-ink">What's worth saving today?</h2>
              </div>
              <div className="rounded-[1.2rem] bg-[rgba(32,66,61,0.1)] px-3 py-2 text-xs font-bold uppercase tracking-[0.14em] text-pine">
                {notes.length} saved
              </div>
            </div>

            <p className="mt-4 text-sm leading-7 text-[#666c63]">
              Use this space for quick ideas, reminders, and fragments you want to hold onto before they
              disappear.
            </p>

            <form className="mt-7 space-y-4" onSubmit={handleCreateNote}>
              <div>
                <label className="mb-2 block text-sm font-semibold text-ink" htmlFor="note">
                  New note
                </label>
                <textarea
                  className="input-field min-h-48 resize-none"
                  id="note"
                  onChange={(event) => setNoteText(event.target.value)}
                  placeholder="Write a note you'll want to revisit later..."
                  value={noteText}
                />
              </div>

              {error ? (
                <div className="rounded-[1.25rem] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {error}
                </div>
              ) : null}

              <button className="primary-button w-full" disabled={isCreating} type="submit">
                {isCreating ? "Saving note..." : "Save note"}
              </button>
            </form>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              <div className="metric-card">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-oat-700">Writing Rhythm</p>
                <p className="mt-2 text-sm leading-7 text-[#666c63]">
                  Short notes work great here. Capture first, refine later.
                </p>
              </div>
              <div className="metric-card">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-oat-700">Private By Default</p>
                <p className="mt-2 text-sm leading-7 text-[#666c63]">
                  Only you can access this dashboard with your account token.
                </p>
              </div>
            </div>
          </section>

          <section className="surface-card page-fade p-6 sm:p-7">
            <div className="flex flex-col gap-3 border-b border-[rgba(98,81,61,0.1)] pb-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-oat-700">Library</p>
                <h2 className="mt-2 font-serif text-3xl leading-tight text-ink">Recent notes and saved thoughts</h2>
              </div>
              <p className="text-sm text-[#666c63]">
                Everything here is private to <span className="font-semibold">{user?.email}</span>.
              </p>
            </div>

            {pageLoading ? (
              <div className="flex min-h-72 items-center justify-center">
                <div className="text-center">
                  <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-oat-200 border-t-pine" />
                  <p className="mt-4 text-sm text-[#666c63]">Loading notes...</p>
                </div>
              </div>
            ) : notes.length === 0 ? (
              <div className="flex min-h-72 items-center justify-center">
                <div className="max-w-md text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-[1.5rem] bg-[rgba(196,127,73,0.14)] text-lg font-bold text-oat-700">
                    NN
                  </div>
                  <h3 className="mt-5 font-serif text-3xl text-ink">Your note space is ready</h3>
                  <p className="mt-3 text-sm leading-7 text-[#666c63]">
                    Create your first note from the panel on the left. It will appear here instantly.
                  </p>
                </div>
              </div>
            ) : (
              <div className="note-grid">
                {notes.map((note) => (
                  <NoteCard
                    key={note._id}
                    note={note}
                    onDelete={handleDeleteNote}
                    isDeleting={deletingId === note._id}
                  />
                ))}
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}

export default DashboardPage;
