import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import { useAuth } from "../context/AuthContext";

function RegisterPage() {
  const navigate = useNavigate();
  const { signup, getErrorMessage } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await signup(formData);
      navigate("/", { replace: true });
    } catch (requestError) {
      setError(getErrorMessage(requestError, "Unable to create your account"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout
      title="Create a space for your ideas to land"
      subtitle="Set up your account in a minute and start collecting thoughts, reminders, and rough drafts in one tidy place."
      footerText="Already have an account?"
      footerLinkLabel="Sign in"
      footerLinkTo="/login"
    >
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <label className="mb-2 block text-sm font-semibold text-ink" htmlFor="name">
            Full name
          </label>
          <input
            className="input-field"
            id="name"
            name="name"
            onChange={handleChange}
            placeholder="Jane Doe"
            required
            type="text"
            value={formData.name}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-ink" htmlFor="email">
            Email
          </label>
          <input
            className="input-field"
            id="email"
            name="email"
            onChange={handleChange}
            placeholder="you@example.com"
            required
            type="email"
            value={formData.email}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-ink" htmlFor="password">
            Password
          </label>
          <input
            className="input-field"
            id="password"
            minLength="6"
            name="password"
            onChange={handleChange}
            placeholder="Choose a secure password"
            required
            type="password"
            value={formData.password}
          />
        </div>

        {error ? (
          <div className="rounded-[1.25rem] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        ) : null}

        <button className="primary-button w-full" disabled={isSubmitting} type="submit">
          {isSubmitting ? "Creating account..." : "Create account"}
        </button>

        <p className="text-center text-xs uppercase tracking-[0.18em] text-[#8d8378]">
          Notes stay private to your account from day one
        </p>
      </form>
    </AuthLayout>
  );
}

export default RegisterPage;
