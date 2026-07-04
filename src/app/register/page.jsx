"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();
  const handleRegister = (e) => { e.preventDefault(); router.push("/login"); };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-gray-800 rounded-xl border border-gray-700 shadow-2xl p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white">Register for AIFR</h1>
        </div>
        <form onSubmit={handleRegister} className="space-y-4">
          <input type="text" required className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white" placeholder="Full Name" />
          <input type="email" required className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white" placeholder="Email" />
          <input type="password" required className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white" placeholder="Password" />
          <button type="submit" className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg mt-4">Register</button>
        </form>
        <div className="text-center text-sm text-gray-400">
          <Link href="/login" className="text-blue-400">Log In</Link>
        </div>
      </div>
    </div>
  );
}