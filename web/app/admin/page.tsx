"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

interface Consultation {
  id: string;
  name: string;
  email: string;
  shoe_type: string;
  description: string;
  social_handle?: string;
  budget_range?: string;
  status: string;
  created_at: string;
}

export default function AdminPage() {
  const [data, setData] = useState<Consultation[]>([]);
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  useEffect(() => {
    fetch(`${API_URL}/api/consultations`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleStatusChange = async (id: string, newStatus: string) => {
     try {
        const res = await fetch(`${API_URL}/api/consultation/${id}/status`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: newStatus })
        });
        if (res.ok) {
            setData(prev => prev.map(item => item.id === id ? { ...item, status: newStatus } : item));
        }
     } catch (err) {
        console.error("Failed to update status", err);
     }
  };

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-serif mb-8 text-amber-500">Consultation Requests</h1>
      
      {loading ? (
        <div className="flex justify-center">
            <Loader2 className="animate-spin w-8 h-8 text-white/50" />
        </div>
      ) : (
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-white/20 text-gray-400">
                        <th className="p-4">Status</th>
                        <th className="p-4">Name</th>
                        <th className="p-4">Contact</th>
                        <th className="p-4">Shoe</th>
                        <th className="p-4">Description</th>
                        <th className="p-4">Budget</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, i) => (
                        <tr key={i} className="border-b border-white/10 hover:bg-white/5">
                            <td className="p-4">
                                <select 
                                    value={item.status} 
                                    onChange={(e) => handleStatusChange(item.id, e.target.value)}
                                    className={`bg-transparent border rounded px-2 py-1 text-sm focus:outline-none ${
                                        item.status === 'pending' ? 'text-yellow-500 border-yellow-500/50' :
                                        item.status === 'in_progress' ? 'text-blue-500 border-blue-500/50' :
                                        item.status === 'completed' ? 'text-green-500 border-green-500/50' :
                                        'text-red-500 border-red-500/50'
                                    }`}
                                >
                                    <option value="pending">Pending</option>
                                    <option value="in_progress">In Progress</option>
                                    <option value="completed">Completed</option>
                                    <option value="rejected">Rejected</option>
                                </select>
                            </td>
                            <td className="p-4">{item.name}</td>
                            <td className="p-4">
                                {item.email}
                                <br />
                                <span className="text-sm text-gray-500">{item.social_handle}</span>
                            </td>
                            <td className="p-4">{item.shoe_type}</td>
                            <td className="p-4 max-w-xs truncate">{item.description}</td>
                            <td className="p-4">{item.budget_range}</td>
                        </tr>
                    ))}
                    {data.length === 0 && (
                        <tr>
                            <td colSpan={5} className="p-8 text-center text-gray-500">No requests found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
      )}
    </main>
  );
}
