import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Globe,
  Users,
  MapPin,
  Award,
  ArrowUpRight,
  GraduationCap,
  CheckCircle2,
  UserCheck,
  ShieldCheck,
  Cpu,
  FileSearch,
  CheckCircle,
} from "lucide-react";

const LandingPage = () => {
  const navigate = useNavigate();

  const [pageLoading, setPageLoading] = useState(true); 
  const countries = [
    "Georgia",
    "Uzbekistan",
    "Kazakhstan",
    "Bulgaria",
    "Nepal",
    "Egypt",
    "Philippines",
    "Poland",
  ];
  useEffect(() => {
    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);
  const targetAudience = [
    {
      title: "NEET Aspirants",
      subtitle: "Preparation & Guidance",
      icon: <CheckCircle2 className="w-5 h-5" />,
    },
    {
      title: "MBBS / BSc Nursing Students",
      subtitle: "Admission Pathways",
      icon: <GraduationCap className="w-5 h-5" />,
    },
    {
      title: "Parents",
      subtitle: "Support & Information",
      icon: <Users className="w-5 h-5" />,
    },
    {
      title: "Admission Seekers",
      subtitle: "Guidance & Support",
      icon: <UserCheck className="w-5 h-5" />,
    },
  ];

  const locations = ["Coimbatore", "Chennai", "Trichy", "Madurai", "Salem"];
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
  return (
    <div className="bg-white font-sans selection:bg-blue-600 selection:text-white">
      <nav className="fixed top-0 w-full z-[100] bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex justify-between items-center">
          <div
            className="flex items-center gap-1 group cursor-pointer"
            onClick={() => window.scrollTo({ top: 0 })}
          >
            <div className="w-6 h-6">
              <img src="https://i.ibb.co/hJKCs5Vm/medicine-svgrepo-com.png" />
            </div>
            <span className="text-xl font-black text-slate-900 tracking-tighter uppercase">
              Medico<span className="font-light text-slate-400">Expo</span>
            </span>
          </div>
          <div className="hidden md:flex items-center gap-10 text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">
            {["About", "Benefits", "Countries", "Register", "Contact"].map(
              (item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="hover:text-blue-600 transition-colors uppercase"
                >
                  {item}
                </a>
              ),
            )}
          </div>
          <button
            onClick={() => navigate("/register")}
            className="hover:bg-slate-900 text-white px-6 py-2.5 text-[11px] font-black uppercase tracking-widest bg-blue-600 transition-all duration-300"
          >
            Register Now
          </button>
        </div>
      </nav>

      <section className="relative pt-14 overflow-hidden border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row border-l border-slate-100">
            <div className="lg:w-3/5 p-6 lg:p-16 border-r border-slate-100">
              <div className="inline-flex items-center gap-3 mb-8">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
                </span>
                <span className="text-blue-600 text-[10px] font-black uppercase tracking-[0.3em]">
                  Admission Season 2026
                </span>
              </div>
              <h1 className="text-6xl md:text-8xl font-black text-slate-900 leading-[0.9] mb-4 tracking-tighter uppercase">
                Medico
                <br />
                <span className="text-blue-600">Expo</span>
                <span className="text-slate-200">.</span>
              </h1>
              <p className="text-lg text-slate-700 mb-4">
                Your Trusted Guide to Medical Admissions
              </p>
              <p className="text-sm text-slate-500 leading-relaxed max-w-lg mb-12 font-medium">
                Meet 15+ International Delegates. Get 1-on-1 expert counseling
                for MBBS & Nursing in India and Abroad.
              </p>
              <div className="flex flex-wrap gap-4 mb-12">
                {locations.map((city) => (
                  <div
                    key={city}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-100 text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]"
                  >
                    <MapPin size={12} className="text-blue-600" /> {city}
                  </div>
                ))}
              </div>
              <button
                onClick={() => navigate("/register")}
                className="group flex items-center gap-4 bg-blue-600 text-white px-8 py-5 text-xs font-black uppercase tracking-widest hover:bg-slate-900 transition-all"
              >
                Register Now{" "}
                <ArrowUpRight
                  size={18}
                  className="group-hover:rotate-45 transition-transform"
                />
              </button>
            </div>
            <div className="lg:w-2/5 relative bg-slate-50/50 flex items-end border-r border-slate-100">
              <div className="absolute top-10 left-10">
                <div className="text-[60px] font-black text-slate-200 leading-none select-none uppercase tracking-tighter">
                  Trusted
                  <br />
                  Guide
                </div>
              </div>
              <img
                src="https://i.ibb.co/k21zHwPX/Pngtree-female-doctor-portrait-smiling-in-23478820-1.png"
                className="relative -mb-10 md:mb-0 z-10 w-full h-[550px] object-contain hover:grayscale grayscale-0 transition-all duration-700"
                alt="Doctor"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row border-l border-slate-100">
            <motion.div
              className="lg:w-[55%] p-6 lg:p-16 border-r border-b border-slate-100"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-8 bg-blue-600" />
                <span className="text-blue-600 font-bold text-[10px] uppercase tracking-[0.3em]">
                  About the Expo
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-8 tracking-tighter uppercase leading-[1.1]">
                Gateway to{" "}
                <span className="text-slate-400 font-light italic">Global</span>{" "}
                Excellence.
              </h2>
              <p className="text-slate-500 leading-relaxed mb-12 text-lg">
                A medical education exhibition for NEET aspirants & parents
                offering clear guidance for MBBS & BSc Nursing admissions in
                India & Abroad.
              </p>
              <div className="grid sm:grid-cols-2 border-t border-l border-slate-100">
                {[
                  {
                    title: "Personalized Roadmap",
                    desc: "Based on NEET scores",
                    icon: <UserCheck size={20} />,
                  },
                  {
                    title: "Expert Counseling",
                    desc: "1-on-1 sessions",
                    icon: <GraduationCap size={20} />,
                  },
                  {
                    title: "Direct Admissions",
                    desc: "Meet university reps",
                    icon: <CheckCircle2 size={20} />,
                  },
                  {
                    title: "Global Recog.",
                    desc: "NMC & WHO approved",
                    icon: <Award size={20} />,
                  },
                ].map((f, i) => (
                  <div
                    key={i}
                    className="p-8 flex gap-2 items-center border-r border-b border-slate-100 group hover:bg-slate-50 transition-colors"
                  >
                    <div className="text-slate-300 group-hover:text-blue-600 mb-4 transition-colors">
                      {f.icon}
                    </div>
                    <div>
                      <h4 className="font-black text-[10px] uppercase tracking-widest text-slate-900 mb-2">
                        {f.title}
                      </h4>
                      <p className="text-slate-500 text-[11px] leading-relaxed font-medium uppercase">
                        {f.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div className="lg:w-[45%] p-6 lg:p-16 border-r border-b border-slate-100 bg-slate-50/30">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-12">
                Target Audience
              </h3>
              <div className="space-y-0 border-t border-slate-100">
                {targetAudience.map((item, index) => (
                  <div
                    key={index}
                    className="group flex items-center justify-between py-8 border-b border-slate-100"
                  >
                    <div className="flex items-center gap-6">
                      <span className="font-mono text-slate-300 group-hover:text-blue-600 transition-colors text-sm">
                        0{index + 1}
                      </span>
                      <div>
                        <h4 className="text-slate-900 font-bold text-lg group-hover:text-blue-600 transition-colors uppercase tracking-tight">
                          {item.title}
                        </h4>
                        <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">
                          {item.subtitle}
                        </p>
                      </div>
                    </div>
                    <ArrowUpRight
                      size={20}
                      className="opacity-0 group-hover:opacity-100 text-blue-600 transition-all translate-x-4 group-hover:translate-x-0"
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="countries" className="bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col border-l border-slate-100">
            <div className="p-6 lg:p-16 border-r border-b border-slate-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-8 bg-blue-600" />
                <span className="text-blue-600 font-bold text-[10px] uppercase tracking-[0.3em]">
                  Partner Nations
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tighter uppercase mb-6">
                Global{" "}
                <span className="text-slate-400 font-light italic">
                  Destinations
                </span>
              </h2>
              <p className="text-slate-500 text-sm leading-relaxed max-w-xl font-medium uppercase tracking-wide">
                Direct partnerships with top-tier medical universities across
                these nations ensuring globally recognized clinical training.
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 border-t border-slate-100">
              {countries.map((country, idx) => (
                <div
                  key={country}
                  className="group relative p-6 border-r border-b border-slate-100 transition-colors duration-500 hover:bg-slate-50/50 cursor-pointer overflow-hidden"
                  onClick={() => navigate("/register")}
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  <div className="flex justify-between items-start mb-4">
                    <Globe
                      size={28}
                      strokeWidth={1.5}
                      className="text-slate-300 group-hover:text-blue-600 transition-colors"
                    />
                    <span className="text-[10px] font-mono text-slate-200 group-hover:text-slate-400 italic">
                      0{idx + 1}
                    </span>
                  </div>
                  <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter">
                    {country}
                  </h3>
                  <div className="mt-4 flex items-center gap-2  md:opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-blue-600">
                      Register Now
                    </span>
                    <ArrowUpRight size={14} className="text-blue-600" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="benefits" className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col border-l border-slate-100">
            <div className="p-6 lg:p-16 border-r border-b border-slate-100 flex flex-col md:flex-row justify-between items-end gap-6">
              <div className="max-w-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-px w-8 bg-blue-600" />
                  <span className="text-blue-600 font-bold text-[10px] uppercase tracking-[0.3em]">
                    Expo Utility
                  </span>
                </div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tighter uppercase leading-none">
                  Why Choose{" "}
                  <span className="text-slate-400 font-light italic">Us</span>
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  title: "Official Partnerships",
                  desc: "Direct accreditation from NMC & WHO recognized universities globally.",
                  id: "01",
                  label: "DIRECT ACCESS",
                  icon: <ShieldCheck size={28} strokeWidth={1.5} />,
                },
                {
                  title: "Personalized Counseling",
                  desc: "Custom strategy roadmaps mapped to your specific NEET performance.",
                  id: "02",
                  label: "USER LOGIC",
                  icon: <Cpu size={28} strokeWidth={1.5} />,
                },
                {
                  title: "Visa & Admission Support",
                  desc: "Full-scale documentation protocol and visa management systems.",
                  id: "03",
                  label: "PROCEDURAL HUB",
                  icon: <FileSearch size={28} strokeWidth={1.5} />,
                },
                {
                  title: "Trusted Platform",
                  desc: "A proven history of securing medical futures since 2018.",
                  id: "04",
                  label: "NETWORK TRUST",
                  icon: <CheckCircle size={28} strokeWidth={1.5} />,
                },
              ].map((benefit, idx) => (
                <div
                  key={idx}
                  className="group relative p-6 border-r border-b border-slate-100 hover:bg-slate-50/50 transition-all duration-500 cursor-default overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                  <div className="absolute top-10 right-10 text-slate-100 font-black text-6xl select-none group-hover:text-blue-50/50 transition-colors duration-500">
                    {benefit.id}
                  </div>

                  <div className="relative z-10">
                    <div className="text-slate-300 group-hover:text-blue-600 mb-12 transition-all duration-500 transform group-hover:-translate-y-1">
                      {benefit.icon}
                    </div>

                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-px w-4 bg-blue-600" />
                      <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">
                        {benefit.label}
                      </span>
                    </div>

                    <h4 className="text-lg font-black uppercase tracking-tighter text-slate-900 mb-4 leading-tight">
                      {benefit.title}
                    </h4>

                    <p className="text-slate-500 text-[11px] font-bold uppercase leading-relaxed tracking-wider mb-8">
                      {benefit.desc}
                    </p>

                    <div
                      className="pt-6 border-t border-slate-100 flex justify-between items-center md:opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0 hover:cursor-pointer"
                      onClick={() => navigate("/register")}
                    >
                      <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-900">
                        Register Now
                      </span>
                      <ArrowUpRight size={14} className="text-blue-600" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white border-t border-slate-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col border-l border-slate-100">
            <div className="p-6 lg:p-16 border-r border-b border-slate-100 flex flex-col md:flex-row justify-between items-end gap-6">
              <div className="max-w-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-px w-8 bg-blue-600" />
                  <span className="text-blue-600 font-bold text-[10px] uppercase tracking-[0.3em]">
                    Verified Feedback
                  </span>
                </div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tighter uppercase leading-none">
                  Trust the{" "}
                  <span className="text-slate-400 font-light italic">
                    Experience
                  </span>
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3">
              {[
                {
                  name: "Arun Kumar",
                  role: "Parent, Chennai",
                  image:
                    "https://i.ibb.co/NnnRZtz6/Chat-GPT-Image-Feb-19-2026-10-22-14-PM.png",
                  text: "Transparent process. My daughter is happily studying in Georgia.",
                  track: "Georgia Track",
                  id: "ME-09",
                },
                {
                  name: "Dr. Meera",
                  role: "Parent, Coimbatore",
                  image:
                    "https://i.ibb.co/N6YmN1bt/Chat-GPT-Image-Feb-19-2026-10-22-11-PM.png",
                  text: "Delegates were professional and information was accurate.",
                  track: "Expert Review",
                  id: "ME-55",
                },
                {
                  name: "Siddharth S.",
                  image:
                    "https://i.ibb.co/RGsXv883/Chat-GPT-Image-Feb-19-2026-10-22-16-PM.png",
                  role: "Student, Uzbekistan",
                  text: "Got spot admission at the venue. Visa process was seamless.",
                  track: "Uzbek Track",
                  id: "ME-104",
                },
              ].map((t, idx) => (
                <div
                  key={idx}
                  className="group relative p-6 border-r border-b border-slate-100 hover:bg-slate-50/50 transition-all duration-500 cursor-default"
                >
                  <div className="absolute top-10 right-10 text-slate-50 font-black text-6xl select-none group-hover:text-blue-50/50 transition-colors duration-500">
                    0{idx + 1}
                  </div>

                  <div className="relative z-10">
                    <div className="text-blue-600/20 group-hover:text-blue-600 mb-8 transition-colors duration-500">
                      <svg
                        width="28"
                        height="20"
                        viewBox="0 0 32 24"
                        fill="currentColor"
                      >
                        <path d="M10 0C13 0 15 2 15 5C15 11 10 16 0 18L1 14C5 13 7 11 7 8H0V0H10ZM32 0C35 0 37 2 37 5C37 11 32 16 22 18L23 14C27 13 29 11 29 8H22V0H32Z" />
                      </svg>
                    </div>

                    <p className="text-slate-500 text-lg italic mb-12 leading-relaxed group-hover:text-slate-900 transition-colors duration-500">
                      "{t.text}"
                    </p>

                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-3">
                        <div className="h-px w-6 bg-blue-600" />
                        <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">
                          {t.track}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <img
                          src={t.image}
                          alt={t.name}
                          className="w-12 h-12 rounded-full object-cover "
                        />
                        <div>
                          <h4 className="text-sm font-black uppercase tracking-widest text-slate-900 leading-none mb-1">
                            {t.name}
                          </h4>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            {t.role}
                          </p>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-slate-100 flex justify-between items-center mt-2">
                        <span className="text-[9px] font-mono text-slate-300 uppercase tracking-tighter italic group-hover:text-slate-500 transition-colors">
                          REF ID: {t.id}
                        </span>
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500/40 group-hover:bg-green-500 transition-colors" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white" id="register">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="border-l border-slate-100">
            <div className="relative bg-slate-950 border border-slate-900 flex flex-col lg:flex-row ml-[-1px] overflow-hidden">
              <div
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                  backgroundImage: `radial-gradient(#1e293b 1px, transparent 1px)`,
                  backgroundSize: "24px 24px",
                }}
              />

              <div className="relative z-10 flex-1 p-6 lg:p-20 border-b lg:border-b-0 lg:border-r border-slate-900">
                <div className="flex items-center gap-4 mb-8">
                  <div className="h-px w-12 bg-blue-600" />
                  <span className="text-blue-500 font-black text-[10px] uppercase tracking-[0.4em]">
                    Event Registration 2026
                  </span>
                </div>

                <h2 className="text-5xl lg:text-8xl font-black text-white mb-10 tracking-tighter uppercase leading-[0.85]">
                  Access the <br />
                  <span className="text-slate-600 italic font-light">
                    Expo Floor.
                  </span>
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-10">
                  {[
                    { label: "Delegate Access", val: "15+ Nations", id: "01" },
                    { label: "Entry Protocol", val: "Free Pass", id: "02" },
                    { label: "Live Hubs", val: "Spot Offers", id: "03" },
                  ].map((item) => (
                    <div key={item.id} className="flex flex-col gap-2">
                      <span className="text-blue-600 font-mono text-sm font-bold">
                        [{item.id}]
                      </span>
                      <div>
                        <h4 className="text-white font-black text-xs uppercase tracking-widest">
                          {item.val}
                        </h4>
                        <p className="text-slate-600 text-[9px] font-bold uppercase tracking-wider mt-1">
                          {item.label}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative z-10 lg:w-[35%] p-10 lg:p-20 flex flex-col justify-center bg-slate-900/20 backdrop-blur-sm">
                <div className="mb-10 flex flex-col items-center lg:items-start">
                  <span className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] mb-2">
                    Registration Status
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-white font-mono text-sm uppercase tracking-tighter">
                      Live & Processing
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => navigate("/register")}
                  className="group relative w-full bg-blue-600 text-white py-8 text-[11px] font-black uppercase tracking-[0.3em] overflow-hidden transition-all duration-500 hover:bg-white hover:text-blue-600"
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    Get Expo Pass{" "}
                    <ArrowUpRight
                      size={18}
                      className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                    />
                  </span>

                  <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                </button>

                <p className="mt-8 text-slate-600 text-[10px] font-bold uppercase tracking-widest leading-relaxed text-center lg:text-left">
                  *Digital Pass will be issued via WhatsApp upon verification of
                  profile.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer id="contact" className="bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 border-l border-slate-100">
            <div className="p-6 md:p-10 border-r border-b border-slate-100">
              <span className="text-xl font-black text-slate-900 uppercase tracking-tighter">
                Medico<span className="text-slate-300 font-light">Expo</span>
              </span>
              <p className="mt-6 text-slate-500 text-[10px] leading-relaxed uppercase font-black tracking-widest">
                South India's Trusted Medical Education Fair since 2018.
              </p>
            </div>
            <div className="p-6 md:p-10 border-r border-b border-slate-100">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-8">
                Navigation
              </h4>
              <ul className="space-y-4 text-[11px] font-bold text-slate-600 uppercase tracking-tight">
                <li>
                  <a
                    href="#about"
                    className="hover:text-blue-600 transition-colors"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#benefits"
                    className="hover:text-blue-600 transition-colors"
                  >
                    Benefits
                  </a>
                </li>
                <li>
                  <a
                    href="#countries"
                    className="hover:text-blue-600 transition-colors"
                  >
                    Countries
                  </a>
                </li>
                <li>
                  <a
                    href="#register"
                    className="hover:text-blue-600 transition-colors"
                  >
                    Register
                  </a>
                </li>
              </ul>
            </div>
            <div className="p-6 md:p-10 border-r border-b border-slate-100">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-8">
                Contact Hub
              </h4>
              <p className="text-sm font-black text-slate-900 tracking-widest">
                +91 78081 10811
              </p>
              <p className="text-sm font-black text-slate-900 tracking-widest mt-2">
                info.tn@klickedu.com
              </p>
            </div>
            <div className="p-6 md:p-10 border-r border-b border-slate-100 bg-slate-50/50">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-8">
                Live Status
              </h4>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900">
                  Registration Active
                </span>
              </div>
            </div>
          </div>
          <div className="py-12 flex justify-center items-center text-[10px] font-black uppercase tracking-[0.3em] text-slate-300 border-l border-slate-100 pL-0 md:pl-10">
            <span>© 2026 Medico Expo</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
