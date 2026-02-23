import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import {
  LogOut,
  MapPin,
  Database,
  Download,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const AdminDashboard = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  
  const [startIndex, setStartIndex] = useState(0);
  const rowsPerPage = 5;

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(
          "https://thulir-backend-798k.onrender.com/api/admin/registrations",
          {
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          }
        );
        const result = await response.json();
        if (result.success) {
          const sorted = result.data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
          setStudents(sorted);
        }
      } catch (err) {
        console.error("Fetch Error:", err.message);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  const currentViewData = students.slice(startIndex, startIndex + rowsPerPage);

  const handleNext = () => {
    if (startIndex + rowsPerPage < students.length) {
      setStartIndex(startIndex + rowsPerPage);
    }
  };

  const handlePrev = () => {
    if (startIndex - rowsPerPage >= 0) {
      setStartIndex(startIndex - rowsPerPage);
    }
  };

  const exportToExcel = () => {
    if (students.length === 0) return;
    const formattedData = students.map((st, i) => ({
      ID: i + 1,
      Name: st.fullName,
      "Mobile Number": st.mobileNumber,
      City: st.city,
      "NEET Status": st.neetStatus,
      "Target Institution": st.collegePreference,
      "Education Loan": st.educationLoan,
      "Created At": new Date(st.createdAt).toLocaleString(),
    }));
    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Registrations");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const fileData = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8" });
    saveAs(fileData, `Registrations_${Date.now()}.xlsx`);
  };

  const handleLogout = async () => {
    await fetch("https://thulir-backend-798k.onrender.com/api/admin/logout", { method: "POST", credentials: "include" });
    window.location.href = "/admin/login";
  };

  return (
    <div className="flex h-screen bg-slate-950 text-slate-400 font-sans selection:bg-blue-600 selection:text-white overflow-hidden">
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #020617; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #2563eb; }
      `}</style>

      <aside className={`fixed inset-y-0 left-0 z-50 w-72 border-r border-slate-900 bg-slate-950 transition-transform duration-300 transform lg:relative lg:translate-x-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="p-8 border-b border-slate-900 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-6 bg-blue-600" />
            <span className="text-xl font-black text-white tracking-tighter uppercase">Admin Hub</span>
          </div>
        </div>
        <nav className="flex-1 p-4">
          <button className="w-full flex items-center justify-between p-4 bg-slate-900 text-blue-400 border border-slate-800">
            <div className="flex items-center gap-3 text-xs font-black uppercase tracking-widest">
              <Database size={16} /> Registrations
            </div>
          </button>
        </nav>
        <div className="p-4 border-t border-slate-900">
          <button onClick={handleLogout} className="group w-full flex items-center justify-between p-4 hover:bg-red-500/10 transition-all border border-transparent hover:border-red-500/20">
            <span className="text-xs font-black uppercase tracking-widest text-slate-600 group-hover:text-red-400 flex items-center gap-3">
              <LogOut size={16} /> Logout
            </span>
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-24 border-b border-slate-900 flex justify-between items-center px-10 bg-slate-950/50 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 text-slate-400"><Menu size={24} /></button>
            <h2 className="text-sm font-black text-white uppercase tracking-[0.3em]">Registration Details</h2>
          </div>
          <div className="flex items-center gap-8">
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Total Records</span>
              <span className="text-xl font-mono text-white font-bold tracking-tighter">{students.length.toString().padStart(3, "0")}</span>
            </div>
            <button onClick={exportToExcel} className="p-3 flex items-center gap-2 border border-blue-600/30 text-blue-400 hover:bg-blue-600 hover:text-white transition-all text-xs font-bold uppercase tracking-widest">
              Export Excel <Download size={16} />
            </button>
          </div>
        </header>

        <div className="p-10 flex-1 flex flex-col min-h-0">
          {loading ? (
            <div className="h-full flex items-center justify-center">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-700 animate-pulse">Syncing_Records...</span>
            </div>
          ) : (
            <>
              <div className="border border-slate-900 bg-slate-950 overflow-hidden flex-1">
                <table className="w-full text-left border-collapse min-w-250">
                  <thead className="sticky top-0 bg-slate-950 z-10">
                    <tr className="border-b border-slate-900 bg-slate-900/50">
                      <th className="p-6 text-[10px] font-black uppercase text-slate-500 w-16 text-center border-r border-slate-900">ID</th>
                      <th className="p-6 text-[10px] font-black uppercase text-slate-500 border-r border-slate-900">Applicant Name</th>
                      <th className="p-6 text-[10px] font-black uppercase text-slate-500 border-r border-slate-900">Contact</th>
                      <th className="p-6 text-[10px] font-black uppercase text-slate-500 border-r border-slate-900">City</th>
                      <th className="p-6 text-[10px] font-black uppercase text-slate-500 border-r border-slate-900">NEET Profile</th>
                      <th className="p-6 text-[10px] font-black uppercase text-slate-500">Institution Preference</th>
                    </tr>
                  </thead>
                  <tbody className="font-mono text-[12px]">
                    {currentViewData.map((st, i) => {
                        const actualID = startIndex + i + 1;
                        return (
                      <tr key={i} className="border-b border-slate-900 hover:bg-slate-900/30 transition-colors">
                        <td className="p-5.5 text-center text-slate-700 border-r border-slate-900 font-bold">
                          {actualID.toString().padStart(3, "0")}
                        </td>
                        <td className="p-5.5 border-r border-slate-900 text-white font-bold uppercase">{st.fullName}</td>
                        <td className="p-5.5 border-r border-slate-900 text-slate-300">{st.mobileNumber}</td>
                        <td className="p-6 border-r border-slate-900 flex items-center gap-2 mt-4">
                          <MapPin size={12} className="text-blue-600" /> {st.city}
                        </td>
                        <td className="p-5.5 border-r border-slate-900 text-slate-300 uppercase">{st.neetStatus}</td>
                        <td className="p-5.5">
                           <span className="border border-blue-500/20 px-2 py-1 text-blue-400">[{st.collegePreference}]</span>
                        </td>
                      </tr>
                    )})}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 flex justify-between items-center bg-slate-950 border border-slate-900 p-4">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-600">
                  Showing {startIndex + 1} to {Math.min(startIndex + rowsPerPage, students.length)} of {students.length}
                </span>

                <div className="flex gap-4">
                  <button 
                    onClick={handlePrev} 
                    disabled={startIndex === 0}
                    className={`flex items-center gap-2 px-4 py-2 border text-[10px] font-black uppercase tracking-widest transition-all ${
                      startIndex === 0 ? "border-slate-900 text-slate-800 cursor-not-allowed" : "border-slate-800 text-slate-400 hover:border-blue-600 hover:text-blue-400"
                    }`}
                  >
                    <ChevronLeft size={16} /> Prev
                  </button>
                  
                  <button 
                    onClick={handleNext} 
                    disabled={startIndex + rowsPerPage >= students.length}
                    className={`flex items-center gap-2 px-4 py-2 border text-[10px] font-black uppercase tracking-widest transition-all ${
                      startIndex + rowsPerPage >= students.length ? "border-slate-900 text-slate-800 cursor-not-allowed" : "border-slate-800 text-slate-400 hover:border-blue-600 hover:text-blue-400"
                    }`}
                  >
                    Next <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;