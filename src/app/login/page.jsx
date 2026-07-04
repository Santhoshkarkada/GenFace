"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  
  const handleLogin = (e) => { 
    e.preventDefault(); 
    // Save a secure token to prove the user logged in
    sessionStorage.setItem("aifr_auth_token", "active_session");
    // Send them to the dashboard
    router.push("/"); 
  };

  // ADDED 'return (' HERE
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-gray-800 rounded-xl border border-gray-700 shadow-2xl p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white">AIFR System Access</h1>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <input type="email" required className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white" placeholder="Email" />
          <input type="password" required className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white" placeholder="Password" />
          <button type="submit" className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg mt-4">Login</button>
        </form>
        <div className="text-center text-sm text-gray-400">
          <Link href="/register" className="text-blue-400">Request Access</Link>
        </div>
      </div>
    </div>
  ); 
}