import Link from "next/link";

export default function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center mb-6">
          <Link href="/" className="text-3xl font-bold text-blue-600">
            SkillSwap
          </Link>
          <h1 className="text-2xl font-semibold mt-4">{title}</h1>
          <p className="text-gray-700 mt-2">{subtitle}</p>
        </div>

        {children}
      </div>
    </div>
  );
}