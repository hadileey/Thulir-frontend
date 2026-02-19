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
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const AdminDashboard = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

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
        if (result.success) setStudents(result.data);
      } catch (err) {
        console.error("Fetch Error:", err.message);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

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
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const fileData = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });

    saveAs(fileData, `Registrations_${Date.now()}.xlsx`);
  };

  const handleLogout = async () => {
    await fetch(
      "https://thulir-backend-798k.onrender.com/api/admin/logout",
      {
        method: "POST",
        credentials: "include",
      }
    );
    window.location.href = "/admin/login";
  };

  return (
    <div className="flex h-screen bg-slate-950 text-slate-400 font-sans selection:bg-blue-600 selection:text-white overflow-hidden">
      
      <style>{`
        /* Webkit Browsers (Chrome, Safari, Edge) */
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #020617; /* slate-950 */
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #1e293b; /* slate-800 */
          border-radius: 10px;
          border: 1px solid #020617;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #2563eb; /* blue-600 */
          box-shadow: 0 0 10px rgba(37, 99, 235, 0.5);
        }
        /* Firefox */
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #1e293b #020617;
        }
      `}</style>

      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 border-r border-slate-900 bg-slate-950 transition-transform duration-300 transform 
        lg:relative lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-8 border-b border-slate-900 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-6 bg-blue-600" />
            <span className="text-xl font-black text-white tracking-tighter uppercase">
              Admin<span className="font-light text-slate-500">Hub</span>
            </span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-slate-500"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <div className="text-[10px] font-black text-slate-700 uppercase tracking-[0.3em] px-4 mb-4">
            Menus
          </div>

          <button className="w-full flex items-center justify-between p-4 bg-slate-900 text-blue-400 border border-slate-800 transition-all">
            <div className="flex items-center gap-3 text-xs font-black uppercase tracking-widest">
              <Database size={16} /> Registrations
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
          </button>
        </nav>

        <div className="p-4 border-t border-slate-900">
          <button
            onClick={handleLogout}
            className="group w-full flex items-center justify-between p-4 hover:bg-red-500/10 transition-all border border-transparent hover:border-red-500/20"
          >
            <span className="text-xs font-black uppercase tracking-widest text-slate-600 group-hover:text-red-400 transition-colors flex items-center gap-3">
              <LogOut size={16} /> Logout
            </span>
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0 min-h-0">
        <header className="h-24 border-b border-slate-900 flex justify-between items-center px-4 md:px-10 bg-slate-950/50 backdrop-blur-md shrink-0">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-slate-400"
            >
              <Menu size={24} />
            </button>
            <h2 className="text-[10px] md:text-sm font-black text-white uppercase tracking-[0.1em] md:tracking-[0.3em]">
              Registration Details
            </h2>
          </div>

          <div className="flex items-center gap-4 md:gap-8">
            <div className="flex flex-col items-end">
              <span className="text-[8px] md:text-[10px] font-black text-slate-500 uppercase tracking-widest">
                Total
              </span>
              <span className="text-sm md:text-xl font-mono text-white font-bold tracking-tighter">
                {students.length.toString().padStart(3, "0")}
              </span>
            </div>

            <button
              onClick={exportToExcel}
              className="p-2 md:p-3 flex items-center gap-2 border hover:border-slate-800 hover:text-slate-400 text-blue-400 border-blue-600/30 transition-all duration-200 text-[10px] md:text-xs font-bold uppercase tracking-widest"
            >
              <span className="hidden sm:inline">Export Excel</span>
              <Download size={16} />
            </button>
          </div>
        </header>

        <div className="p-4 md:p-10 flex-1 min-h-0 overflow-hidden">
          {loading ? (
            <div className="h-full flex items-center justify-center">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-700 animate-pulse">
                Syncing_Records...
              </span>
            </div>
          ) : (
            <div className="border border-slate-900 bg-slate-950 h-full overflow-auto custom-scrollbar">
              <table className="w-full text-left border-collapse min-w-[1000px]">
                <thead className="sticky top-0 bg-slate-950 z-10">
                  <tr className="border-b border-slate-900 bg-slate-900/50">
                    <th className="p-6 text-[10px] font-black uppercase text-slate-500 w-16 text-center border-r border-slate-900">
                      ID
                    </th>
                    <th className="p-6 text-[10px] font-black uppercase text-slate-500 border-r border-slate-900">
                      Applicant Name
                    </th>
                    <th className="p-6 text-[10px] font-black uppercase text-slate-500 border-r border-slate-900">
                      Contact number
                    </th>
                    <th className="p-6 text-[10px] font-black uppercase text-slate-500 border-r border-slate-900">
                      City
                    </th>
                    <th className="p-6 text-[10px] font-black uppercase text-slate-500 border-r border-slate-900">
                      NEET profile
                    </th>
                    <th className="p-6 text-[10px] font-black uppercase text-slate-500 border-r border-slate-900">
                      Target Institution
                    </th>
                    <th className="p-6 text-[10px] font-black uppercase text-slate-500">
                      Loan Assistance
                    </th>
                  </tr>
                </thead>

                <tbody className="font-mono text-[12px]">
                  {students.map((st, i) => (
                    <tr
                      key={i}
                      className="border-b border-slate-900 hover:bg-slate-900/30 transition-colors group"
                    >
                      <td className="p-6 text-center text-slate-700 border-r border-slate-900 group-hover:text-blue-500">
                        {(i + 1).toString().padStart(3, "0")}
                      </td>
                      <td className="p-6 border-r border-slate-900 text-white font-bold uppercase">
                        {st.fullName}
                      </td>
                      <td className="p-6 border-r border-slate-900 text-slate-300">
                        {st.mobileNumber}
                      </td>
                      <td className="p-6 border-r border-slate-900">
                        <div className="flex items-center gap-2">
                          <MapPin size={12} className="text-blue-600" />
                          {st.city}
                        </div>
                      </td>
                      <td className="p-6 border-r border-slate-900 text-slate-300 uppercase">
                        {st.neetStatus}
                      </td>
                      <td className="p-6 border-r border-slate-900 text-[10px]">
                        <span className="border border-blue-500/20 px-2 py-1 text-blue-400">
                          [{st.collegePreference}]
                        </span>
                      </td>
                      <td className="p-6">
                        <span className={st.educationLoan === 'Yes' ? 'text-amber-500' : 'text-slate-600'}>
                          {st.educationLoan}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <footer className="h-12 border-t border-slate-900 bg-slate-950 flex justify-between items-center px-4 md:px-10 text-[9px] font-mono text-slate-700 tracking-widest uppercase shrink-0">
          <div>Last_Update: {new Date().toLocaleTimeString()}</div>
          <div className="hidden sm:block">
            System_Status: <span className="text-emerald-500">Online</span>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default AdminDashboard;