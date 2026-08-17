import Link from "next/link";

export default function Register() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4">
      <Link href="/" className="font-display font-bold text-xl text-offwhite mb-10 block">
        SPEC BUSINESS
      </Link>
      <h1 className="font-display font-semibold text-2xl text-offwhite mb-8">
        What type of user are you?
      </h1>
      <div className="flex flex-col md:flex-row gap-4 w-full max-w-md">
        <Link
          href="/register/individual"
          className="flex-1 bg-surface border border-rule rounded-2xl p-6 text-center hover:border-offwhite/30 transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-job mx-auto mb-3" />
          <p className="font-display font-medium text-offwhite">Individual</p>
          <p className="text-xs text-offwhite/40 mt-1">Looking for an opportunity</p>
        </Link>
        <Link
          href="/register/company"
          className="flex-1 bg-surface border border-rule rounded-2xl p-6 text-center hover:border-offwhite/30 transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-associate mx-auto mb-3" />
          <p className="font-display font-medium text-offwhite">Company / Business</p>
          <p className="text-xs text-offwhite/40 mt-1">Looking for partners or hires</p>
        </Link>
      </div>
    </main>
  );
}
