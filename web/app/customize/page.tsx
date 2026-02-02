import CustomizationForm from "@/components/CustomizationForm";

export default function CustomizePage() {
  return (
    <main className="min-h-screen bg-black py-20 px-4 flex flex-col items-center justify-center">
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-600 mb-4">
          預約您的設計檔期
        </h1>
        <p className="text-gray-400 max-w-lg mx-auto">
          確保您的專屬席位。每一雙作品都是我們全心投入的專案。
        </p>
      </div>
      
      <CustomizationForm />
    </main>
  );
}
