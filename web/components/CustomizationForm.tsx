"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronRight, ChevronLeft, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = [
  { id: 1, title: "基本資料" },
  { id: 2, title: "選擇鞋款" },
  { id: 3, title: "設計構想" },
];

const SHOE_TYPES = [
  "Nike Air Force 1",
  "Nike Dunk",
  "Converse Chuck 70",
  "Vans Old Skool",
  "Other",
];

export default function CustomizationForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    social_handle: "",
    shoe_type: "",
    description: "",
    budget_range: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => setStep((prev) => Math.min(prev + 1, STEPS.length));
  const handleBack = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      setErrorMsg("");
      const response = await fetch("http://localhost:8000/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSuccess(true);
      } else {
        const errorData = await response.json();
        // Parse Pydantic validation errors
        let message = "Something went wrong.";
        if (errorData.detail) {
            if (Array.isArray(errorData.detail)) {
                message = errorData.detail.map((err: any) => `${err.loc.join('.')} - ${err.msg}`).join('\n');
            } else {
                message = errorData.detail;
            }
        }
        setErrorMsg(message);
      }
    } catch (error) {
      console.error(error);
      setErrorMsg("Failed to connect to server. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-20 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-8 max-w-lg mx-auto"
      >
        <div className="mx-auto w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-6">
          <Check className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-serif text-white mb-4">預約已確認</h2>
        <p className="text-gray-400 mb-8">
          感謝您，{formData.name}。我們已收到您的預約請求。
          <br />
          我們將盡快透過 {formData.social_handle || formData.email} 與您聯繫，確認您的專屬檔期。
        </p>
        <button 
            onClick={() => window.location.href = '/'}
            className="px-6 py-3 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition-colors"
        >
            返回首頁
        </button>
      </motion.div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="flex items-center justify-between mb-12 relative">
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/10 -z-10" />
        <div 
            className="absolute top-1/2 left-0 h-0.5 bg-amber-500 -z-10 transition-all duration-500"
            style={{ width: `${((step - 1) / (STEPS.length - 1)) * 100}%` }} 
        />
        
        {STEPS.map((s) => (
          <div key={s.id} className="flex flex-col items-center gap-2 px-2 z-10 bg-black/20 backdrop-blur-sm rounded-full py-1">
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors duration-300 border-2",
              step >= s.id ? "bg-amber-500 border-amber-500 text-black" : "bg-black border-white/20 text-white/40"
            )}>
              {s.id}
            </div>
            <span className={cn(
              "text-xs uppercase tracking-wider transition-colors duration-300",
              step >= s.id ? "text-amber-500" : "text-white/20"
            )}>{s.title}</span>
          </div>
        ))}
      </div>

      {/* Form Content */}
      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl">
        <form onSubmit={(e) => e.preventDefault()}>
          <AnimatePresence mode="wait">
            
            {/* Step 1: Details */}
            {step === 1 && (
            <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
            >
                <h2 className="text-2xl font-serif text-white mb-6">請填寫您的資料</h2>
                <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">真實姓名</label>
                    <input 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                        placeholder="Brady Chen"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">電子郵件</label>
                    <input 
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                        placeholder="brady@example.com"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">社群帳號 (IG/Line)</label>
                    <input 
                        name="social_handle"
                        value={formData.social_handle}
                        onChange={handleChange}
                        className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                        placeholder="@line_id"
                    />
                </div>
                </div>
            </motion.div>
            )}

            {/* Step 2: Shoe Selection */}
            {step === 2 && (
            <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
            >
                <h2 className="text-2xl font-serif text-white mb-6">選擇您的畫布 (鞋款)</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {SHOE_TYPES.map((type) => (
                    <div 
                    key={type}
                    onClick={() => setFormData({...formData, shoe_type: type})}
                    className={cn(
                        "cursor-pointer p-4 rounded-xl border transition-all duration-200 flex items-center justify-between group",
                        formData.shoe_type === type 
                        ? "bg-amber-500/10 border-amber-500" 
                        : "bg-black/50 border-white/10 hover:border-white/30"
                    )}
                    >
                    <span className={cn(
                        "font-medium",
                        formData.shoe_type === type ? "text-amber-500" : "text-white"
                    )}>{type}</span>
                    {formData.shoe_type === type && <Check className="w-5 h-5 text-amber-500" />}
                    </div>
                ))}
                </div>
            </motion.div>
            )}

            {/* Step 3: Design Vision */}
            {step === 3 && (
            <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
            >
                <h2 className="text-2xl font-serif text-white mb-6">描述您的設計構想</h2>
                {errorMsg && (
                    <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm">
                        {errorMsg}
                    </div>
                )}
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">設計想法 / 靈感描述 (至少 10 字)</label>
                    <textarea 
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={5}
                        className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                        placeholder="請告訴我們您的故事、喜歡的風格、顏色，或是任何靈感..."
                    />
                    <div className="text-right text-xs mt-1 text-gray-500">
                      {formData.description.length}/10 字元
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">預算範圍 (選填)</label>
                    <input 
                        name="budget_range"
                        value={formData.budget_range}
                        onChange={handleChange}
                        className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                        placeholder="例如: 5000 - 8000 TWD"
                    />
                </div>
            </motion.div>
            )}

          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-10 pt-6 border-t border-white/10">
             {step > 1 ? (
                <button
                    onClick={handleBack}
                    className="flex items-center text-white/50 hover:text-white transition-colors"
                >
                    <ChevronLeft className="w-5 h-5 mr-1" /> 上一步
                </button>
             ) : (<div />)}

             {step < STEPS.length ? (
                <button
                    onClick={handleNext}
                    disabled={
                        (step === 1 && (!formData.name || !formData.email)) ||
                        (step === 2 && !formData.shoe_type)
                    }
                    className="flex items-center bg-white text-black px-6 py-2 rounded-full font-medium hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    下一步 <ChevronRight className="w-5 h-5 ml-1" />
                </button>
             ) : (
                <button
                    onClick={handleSubmit}
                    disabled={isSubmitting || formData.description.length < 10}
                    className="flex items-center bg-amber-500 text-black px-8 py-2 rounded-full font-medium hover:bg-amber-400 transition-colors disabled:opacity-50"
                >
                    {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "確認預約"}
                </button>
             )}
          </div>
        </form>
      </div>
    </div>
  );
}
