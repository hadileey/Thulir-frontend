import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const API = "https://thulir-backend-798k.onrender.com/api";

const Register = () => {
  const navigate = useNavigate();
  const [pageLoading, setPageLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    mobileNumber: "",
    city: "",
    neetStatus: "Appeared",
    collegePreference: "India (Govt)",
    educationLoan: "No"
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${API}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      if (response.ok) {
        setSuccess(true);
        setTimeout(() => navigate("/"), 4000);
      } else {
        const data = await response.json();
        alert(data.errors?.[0]?.msg || data.message || "Registration failed");
      }
    } catch (error) {
      alert("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return (
      <div className="h-screen w-full bg-white flex flex-col items-center justify-center">
        <div className="w-48 h-px bg-slate-100 relative overflow-hidden mb-4">
          <motion.div
            initial={{ left: "-100%" }}
            animate={{ left: "100%" }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            className="absolute top-0 w-1/2 h-full bg-blue-600"
          />
        </div>
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-black animate-pulse">
            Loading...
          </span>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-xl w-full border border-slate-100 p-12 text-center relative"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-blue-600" />
          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 size={32} strokeWidth={1.5} />
          </div>
          <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter mb-4">
            Registration <span className="text-slate-400 font-light italic">Confirmed</span>
          </h2>
          <p className="text-slate-500 font-medium leading-relaxed mb-8 uppercase text-[11px] tracking-widest">
            Your architectural roadmap to global medical excellence is being prepared.
            An expert will contact you within 24 hours.
          </p>
          <div className="flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-blue-600">
            Redirecting to Hub
            <span className="w-8 h-px bg-blue-600 animate-pulse" />
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-blue-600 selection:text-white">
      <nav className="border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex justify-between items-center">
          
          <button 
            onClick={() => navigate("/")}
            className="group cursor-pointer flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft size={14} /> Back to Home
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row">
          
          <div className="lg:w-1/3 p-10 lg:p-16 border-r border-b border-slate-100 bg-slate-50/30">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-8 bg-blue-600" />
              <span className="text-blue-600 font-bold text-[10px] uppercase tracking-[0.3em]">Secure Slot</span>
            </div>
            <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase mb-6 leading-none">
              Event <br/><span className="text-slate-400 font-light italic">Registration</span>
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed mb-12">
              Please provide your academic profile to receive a personalized counseling roadmap during the expo.
            </p>
            
            <div className="space-y-6">
              {[
                { label: "Phase", val: "Pre-Admission 2026" },
                { label: "Access", val: "Full Expo Pass" },
                { label: "Status", val: "Open" }
              ].map((item, i) => (
                <div key={i} className="flex flex-col border-b border-slate-200 pb-4">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.label}</span>
                  <span className="text-sm font-bold text-slate-900 uppercase">{item.val}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:w-2/3 p-10 lg:p-16 border-r border-b border-slate-100">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
              
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">01. Applicant Name</label>
                <input
                  required
                  type="text"
                  placeholder="ENTER FULL NAME"
                  className="w-full py-4 bg-transparent border-b border-slate-200 focus:border-blue-600 outline-none text-slate-900 font-bold placeholder:text-slate-200 transition-colors uppercase text-sm"
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">02. Contact Number</label>
                <input
                  required
                  type="text"
                  placeholder="10 DIGIT MOBILE"
                  maxLength={10}
                  className="w-full py-4 bg-transparent border-b border-slate-200 focus:border-blue-600 outline-none text-slate-900 font-bold placeholder:text-slate-200 transition-colors uppercase text-sm"
                  value={form.mobileNumber}
                  onChange={(e) => setForm({ ...form, mobileNumber: e.target.value.replace(/\D/g, "") })}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">03. Current City</label>
                <input
                  required
                  type="text"
                  placeholder="CITY NAME"
                  className="w-full py-4 bg-transparent border-b border-slate-200 focus:border-blue-600 outline-none text-slate-900 font-bold placeholder:text-slate-200 transition-colors uppercase text-sm"
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">04. NEET Profile</label>
                <select
                  className="w-full py-4 bg-transparent border-b border-slate-200 focus:border-blue-600 outline-none text-slate-900 font-bold transition-colors uppercase text-sm cursor-pointer"
                  value={form.neetStatus}
                  onChange={(e) => setForm({ ...form, neetStatus: e.target.value })}
                >
                  <option>Appeared</option>
                  <option>Yet to Appear</option>
                  <option>Qualified</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">05. Target Institution</label>
                <select
                  className="w-full py-4 bg-transparent border-b border-slate-200 focus:border-blue-600 outline-none text-slate-900 font-bold transition-colors uppercase text-sm cursor-pointer"
                  value={form.collegePreference}
                  onChange={(e) => setForm({ ...form, collegePreference: e.target.value })}
                >
                  <option>India (Govt)</option>
                  <option>India (Private)</option>
                  <option>Abroad</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">06. Loan Assistance Required?</label>
                <div className="flex gap-8 py-4">
                  {["Yes", "No"].map((opt) => (
                    <label key={opt} className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="radio"
                        className="hidden"
                        checked={form.educationLoan === opt}
                        onChange={() => setForm({ ...form, educationLoan: opt })}
                      />
                      <div className={`w-4 h-4 border rounded-full ${form.educationLoan === opt ? 'border-blue-600 bg-blue-600' : 'border-slate-300'} transition-all`} />
                      <span className={`text-sm font-bold ${form.educationLoan === opt ? 'text-blue-600' : 'text-slate-400'} uppercase`}>{opt}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="md:col-span-2 pt-10">
                <button
                  disabled={loading}
                  className="w-full cursor-pointer bg-blue-600 text-white py-6 px-8 text-xs font-black uppercase tracking-[0.3em] hover:bg-slate-900 transition-all flex items-center justify-center gap-4 group disabled:bg-slate-200"
                >
                  {loading ? "Submitting ..." : "Complete Registration"}
                  <ArrowUpRight size={18} className="group-hover:translate-x-1 hidden md:block group-hover:-translate-y-1 transition-transform" />
                </button>
                <p className="mt-6 text-[10px] text-slate-400 font-medium uppercase tracking-widest text-center">
                  *By registering, you agree to receive event invitation details via SMS/Call.
                </p>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;