function Navbar({ userName, onLogout, isLoggingOut }) {
  return (
    <header className="surface-card page-fade sticky top-4 z-10 mb-8 px-5 py-5 sm:px-6">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-[1.4rem] bg-[linear-gradient(135deg,_#20423d,_#2f6a60)] text-lg font-bold text-white shadow-glow">
            NN
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-oat-700">NoteNest</p>
            <h1 className="mt-1 font-serif text-3xl tracking-tight text-ink">Welcome back, {userName}</h1>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="rounded-[1.25rem] border border-white/60 bg-white/55 px-4 py-3 text-sm text-[#61675e] backdrop-blur">
            A calm place to keep personal thoughts and quick plans.
          </div>
          <button className="secondary-button" onClick={onLogout} disabled={isLoggingOut} type="button">
            {isLoggingOut ? "Logging out..." : "Logout"}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
