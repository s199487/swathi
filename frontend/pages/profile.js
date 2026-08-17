import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  getMe,
  getIndividualProfile,
  updateIndividualProfile,
  getCompanyProfile,
  updateCompanyProfile,
} from "../lib/api";
import Navbar from "../components/Navbar";
import { getInitial, getAvatarColor } from "../lib/avatar";

const INDIVIDUAL_FIELDS = [
  ["full_name", "Full name", "text"],
  ["location", "Location", "text"],
  ["education", "Education", "text"],
  ["profession", "Profession", "text"],
  ["experience_years", "Experience (years)", "number"],
  ["skills", "Skills", "text"],
  ["preferred_location", "Preferred location", "text"],
  ["industry_preference", "Industry preference", "text"],
  ["investment_capacity_min", "Investment min", "number"],
  ["investment_capacity_max", "Investment max", "number"],
];

const COMPANY_FIELDS = [
  ["company_name", "Company name", "text"],
  ["contact_person", "Contact person", "text"],
  ["website", "Website", "text"],
  ["industry", "Industry", "text"],
  ["location", "Location", "text"],
  ["business_type", "Business type", "text"],
  ["registration_number", "Registration number (GST etc.)", "text"],
  ["description", "Description", "textarea"],
];

export default function Profile() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
    if (!token) {
      router.push("/login");
      return;
    }
    (async () => {
      try {
        const me = await getMe();
        setUser(me);
        const data =
          me.user_type === "company" ? await getCompanyProfile() : await getIndividualProfile();
        setProfile(data);
      } catch (err) {
        router.push("/login");
      } finally {
        setLoading(false);
      }
    })();
  }, [router]);

  const handleChange = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    try {
      const updated =
        user.user_type === "company"
          ? await updateCompanyProfile(profile)
          : await updateIndividualProfile(profile);
      setProfile(updated);
      setEditing(false);
      setMessage("Saved.");
    } catch (err) {
      setMessage("Could not save. Check the fields and try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return (
      <main className="min-h-screen flex items-center justify-center text-offwhite/50">
        Loading...
      </main>
    );

  const isCompany = user?.user_type === "company";
  const fields = isCompany ? COMPANY_FIELDS : INDIVIDUAL_FIELDS;
  const inputClass =
    "w-full bg-black border border-rule rounded-lg px-4 py-2.5 text-offwhite placeholder-offwhite/30 focus:outline-none focus:border-offwhite/40";
  const displayName = profile?.full_name || profile?.company_name || user?.username;

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <div className="max-w-lg mx-auto px-6 py-10">
          <div className="flex items-center gap-4 mb-8">
            <span
              className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-semibold text-black ${getAvatarColor(
                displayName
              )}`}
            >
              {getInitial(displayName)}
            </span>
            <div>
              <h1 className="font-display font-bold text-2xl text-offwhite">{displayName}</h1>
              <p className="text-sm text-offwhite/40">
                {user?.username} &middot; {user?.email}
                {!user?.user_type && (
                  <span className="text-associate"> &middot; no account type set</span>
                )}
                {isCompany && (
                  <>
                    {" "}
                    &middot;{" "}
                    <span
                      className={
                        profile?.verification_status === "verified"
                          ? "text-dealer"
                          : profile?.verification_status === "rejected"
                          ? "text-red-400"
                          : "text-associate"
                      }
                    >
                      {profile?.verification_status}
                    </span>
                  </>
                )}
              </p>
            </div>
          </div>

          {message && <p className="text-sm text-offwhite/60 mb-4">{message}</p>}

          {!editing ? (
            <div className="bg-surface border border-rule rounded-2xl p-6">
              <div className="flex justify-between items-center mb-5">
                <p className="font-mono text-xs uppercase tracking-widest text-offwhite/40">
                  Profile details
                </p>
                <button
                  onClick={() => setEditing(true)}
                  className="px-4 py-1.5 text-sm border border-rule rounded-full text-offwhite/80 hover:border-offwhite/40 hover:text-offwhite"
                >
                  Edit
                </button>
              </div>
              <dl className="space-y-4">
                {fields.map(([key, label]) => (
                  <div key={key} className="flex justify-between gap-4 border-b border-rule pb-3 last:border-0 last:pb-0">
                    <dt className="text-sm text-offwhite/40 shrink-0">{label}</dt>
                    <dd className="text-sm text-offwhite text-right">
                      {profile?.[key] ? String(profile[key]) : (
                        <span className="text-offwhite/25">Not set</span>
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          ) : (
            <form onSubmit={handleSave} className="bg-surface border border-rule rounded-2xl p-6 space-y-4">
              {fields.map(([key, label, type]) => (
                <div key={key}>
                  <label className="block text-xs text-offwhite/50 mb-1.5">{label}</label>
                  {type === "textarea" ? (
                    <textarea
                      className={inputClass}
                      rows={3}
                      value={profile?.[key] ?? ""}
                      onChange={(e) => handleChange(key, e.target.value)}
                    />
                  ) : (
                    <input
                      type={type}
                      className={inputClass}
                      value={profile?.[key] ?? ""}
                      onChange={(e) => handleChange(key, e.target.value)}
                    />
                  )}
                </div>
              ))}

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditing(false)}
                  className="flex-1 border border-rule rounded-full py-2.5 text-offwhite/70 hover:text-offwhite hover:border-offwhite/40"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 bg-offwhite text-black rounded-full py-2.5 font-medium hover:bg-offwhite/90 disabled:opacity-50"
                >
                  {saving ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          )}
        </div>
      </main>
    </>
  );
}