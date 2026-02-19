import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { motion } from "framer-motion"; 

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    fetch("https://thulir-backend-798k.onrender.com/api/admin/check-auth", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setIsAuth(data.authenticated);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center gap-6 font-sans">
        <div className="w-48 h-[1px] bg-slate-900 relative overflow-hidden">
          <motion.div
            animate={{ left: ["-100%", "100%"] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="absolute inset-0 bg-blue-600 w-1/2 shadow-[0_0_15px_rgba(37,99,235,0.4)]"
          />
        </div>

        <div className="flex flex-col items-center gap-2">
          
          <span className="text-[11px] font-mono text-blue-500/80 uppercase tracking-[0.2em]">
            Verifying Credentials...
          </span>
        </div>

        <div className="fixed inset-0 pointer-events-none opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-50 bg-[length:100%_2px,3px_100%]" />
        </div>
      </div>
    );
  }

  return isAuth ? children : <Navigate to="/admin/login" replace />;
};

export default ProtectedRoute;