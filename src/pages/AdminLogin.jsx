import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ShieldAlert, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [booting, setBooting] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setBooting(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("🚀 Login button clicked");
    console.log("📦 Form data:", form);

    setLoading(true);

    try {
      console.log("🌍 Sending request...");

      const response = await fetch(
        "https://thulir-backend-798k.onrender.com/api/admin/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(form),
        },
      );

      console.log("📡 Raw response:", response);

      const res = await response.json();

      console.log("✅ Response JSON:", res);
      console.log("✅ Response OK?:", response.ok);

      if (response.ok) {
        console.log("🎉 Login success → navigating");
        navigate("/admin/dashboard");
      } else {
        console.log("❌ Invalid credentials");
        alert(res.message || "Invalid Credentials");
      }
    } catch (err) {
      console.error("🔥 FETCH ERROR:", err);
      alert("Connection Error");
    } finally {
      setLoading(false);
      console.log("🏁 Request finished");
    }
  };

  if (booting) {
    return (
      <div className="h-screen w-full bg-slate-950 flex flex-col items-center justify-center font-sans">
        <div className="w-48 h-px bg-slate-900 relative overflow-hidden mb-4">
          <motion.div
            initial={{ left: "-100%" }}
            animate={{ left: "100%" }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            className="absolute top-0 w-1/2 h-full bg-blue-600"
          />
        </div>
        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-600 animate-pulse">
          Loading...
        </span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 font-sans selection:bg-blue-600 selection:text-white">
      <div className="max-w-md w-full border border-slate-900 relative">
        <div className="absolute -top-10 left-0 flex items-center gap-4">
          <div className="h-px w-8 bg-blue-600" />
          <span className="text-blue-600 font-black text-[10px] uppercase tracking-[0.3em]">
            Authorization Required
          </span>
        </div>

        <div className="p-10 lg:p-12">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-1.5 h-6 bg-blue-600" />
            <span className="text-xl font-black text-white tracking-tighter uppercase">
              Admin<span className="font-light text-slate-500">Portal</span>
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-10">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 flex items-center gap-2">
                <Lock size={10} /> 01. ADMIN ID
              </label>
              <input
                required
                type="text"
                name="username" 
                autocomplete="username" 
                placeholder="ENTER USERNAME"
                className="w-full py-4 bg-transparent border-b border-slate-900 focus:border-blue-600 outline-none text-white font-bold placeholder:text-slate-800 transition-colors text-sm"
                onChange={(e) => setForm({ ...form, username: e.target.value })}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black tracking-[0.2em] text-slate-500 flex items-center gap-2">
                <ShieldAlert size={10} /> 02. SECURITY KEY
              </label>
              <input
                required
                type="password"
                name="password" 
                autocomplete="current-password" 
                placeholder="••••••••"
                className="w-full py-4 bg-transparent border-b border-slate-900 focus:border-blue-600 outline-none text-white font-bold placeholder:text-slate-800 transition-colors text-sm"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>

            <button
              disabled={loading}
              className="w-full cursor-pointer bg-blue-600 text-white py-6 px-8 text-xs font-black uppercase tracking-[0.3em] hover:bg-white hover:text-blue-600 transition-all flex items-center justify-center gap-4 group disabled:bg-slate-800"
            >
              {loading ? "Loading..." : "Login"}
              <ArrowUpRight
                size={18}
                className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
              />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
