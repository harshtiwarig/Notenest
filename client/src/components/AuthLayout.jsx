import { Link } from "react-router-dom";

function AuthLayout({ title, subtitle, footerText, footerLinkLabel, footerLinkTo, children }) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-8 sm:px-6 lg:px-8">
      <div className="hero-orb absolute -left-24 top-10 h-72 w-72 rounded-full bg-[radial-gradient(circle,_rgba(196,127,73,0.35),_transparent_65%)] blur-2xl" />
      <div className="hero-orb absolute right-0 top-1/3 h-80 w-80 rounded-full bg-[radial-gradient(circle,_rgba(32,66,61,0.25),_transparent_68%)] blur-2xl" />

      <div className="surface-card page-fade relative grid w-full max-w-6xl overflow-hidden lg:grid-cols-[1.1fr_0.9fr]">
        <section className="relative flex flex-col justify-between overflow-hidden bg-[#1f2520] px-6 py-8 text-white sm:px-8 lg:px-10 lg:py-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(196,127,73,0.28),_transparent_32%),radial-gradient(circle_at_bottom_right,_rgba(87,142,131,0.24),_transparent_34%)]" />

          <div className="relative">
            <span className="eyebrow bg-white/10 text-white">NoteNest</span>
            <h2 className="mt-6 max-w-md font-serif text-4xl leading-tight sm:text-5xl">
              A focused home for personal notes, ideas, and small plans.
            </h2>
            <p className="mt-5 max-w-lg text-sm leading-7 text-white/72 sm:text-base">
              Thoughtful structure, a calmer interface, and just enough polish to make capturing ideas
              feel natural every day.
            </p>
          </div>

          <div className="relative mt-10 space-y-4">
            <div className="metric-card bg-white/10 text-white shadow-none">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/60">
                Designed For Clarity
              </p>
              <p className="mt-3 text-sm leading-7 text-white/82">
                Quick writing on the left, everything organized on the right, with distractions kept
                intentionally low.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="metric-card bg-white/10 text-white shadow-none">
                <p className="text-2xl font-semibold">Private</p>
                <p className="mt-1 text-sm text-white/68">Every note stays tied to your account.</p>
              </div>
              <div className="metric-card bg-white/10 text-white shadow-none">
                <p className="text-2xl font-semibold">Simple</p>
                <p className="mt-1 text-sm text-white/68">No clutter, just a quiet workflow.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[linear-gradient(180deg,_rgba(255,251,245,0.94),_rgba(248,241,231,0.84))] px-6 py-8 sm:px-8 lg:px-10 lg:py-10">
          <div className="mx-auto w-full max-w-md">
            <div className="mb-8">
              <span className="eyebrow">Personal Workspace</span>
              <div className="mt-4 h-1.5 w-24 rounded-full accent-line" />
            </div>

            <div className="mb-8">
              <h1 className="font-serif text-4xl leading-tight tracking-tight text-ink">{title}</h1>
              <p className="mt-3 text-sm leading-7 text-[#676d63] sm:text-base">{subtitle}</p>
            </div>

            {children}

            <p className="mt-6 text-center text-sm text-[#6f7368]">
              {footerText}{" "}
              <Link className="font-semibold text-pine transition hover:text-clay" to={footerLinkTo}>
                {footerLinkLabel}
              </Link>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default AuthLayout;
