import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { getMe } from "../lib/api";
import { getInitial, getAvatarColor } from "../lib/avatar";

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
    if (!token) return;
    getMe()
      .then(setUser)
      .catch(() => setUser(null));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    router.push("/login");
  };

  return (
    <nav className="border-b border-rule bg-black/90 backdrop-blur sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/dashboard" className="font-display font-bold text-lg text-offwhite">
          SPEC BUSINESS
        </Link>

        <div className="flex items-center gap-6 text-sm">
          <Link href="/opportunities" className="text-offwhite/60 hover:text-offwhite">
            Opportunities
          </Link>
          <Link href="/requirements/create" className="text-offwhite/60 hover:text-offwhite">
            Post requirement
          </Link>

          {user && (
            <Link href="/profile" className="flex items-center gap-2 group">
              <span
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold text-black ${getAvatarColor(
                  user.username
                )}`}
              >
                {getInitial(user.username)}
              </span>
              <span className="text-offwhite/60 group-hover:text-offwhite">
                {user.username}
              </span>
            </Link>
          )}

          <button
            onClick={handleLogout}
            className="px-4 py-1.5 border border-rule rounded-full text-offwhite/80 hover:border-offwhite/40 hover:text-offwhite"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
