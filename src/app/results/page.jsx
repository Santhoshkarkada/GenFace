"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ImageWorkspace from "@/components/ImageWorkspace";
import AnalyticsMatrix from "@/components/AnalyticsMatrix";

export default function Results() {
  const router = useRouter();
  const [data, setData] = useState(null);

  useEffect(() => {
    const savedData = sessionStorage.getItem("aifr_latest_result");
    if (savedData) {
      setData(JSON.parse(savedData));
    } else {
      router.push("/");
    }
  }, [router]);

  if (!data) return <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">Loading Report...</div>;

  return (
    <main className="min-h-screen bg-gray-900 text-gray-100 p-6">
      <header className="mb-8 border-b border-gray-800 pb-4 flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Inference Results Report</h1>
          <p className="text-sm text-gray-400 mt-1">Final matrix output and confirmation</p>
        </div>
        <button onClick={() => router.push("/")} className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg border border-gray-700 text-sm">
          ← Back to Generator
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-2 bg-gray-800 p-5 rounded-xl border border-gray-700 shadow-xl min-h-[500px]">
          <ImageWorkspace 
            sourceImage={data.sourceImage}
            generatedImage={data.generatedImage}
            isGenerating={false}
            currentStep={20}
            totalSteps={20}
          />
        </div>
        <div className="lg:col-span-1 bg-gray-800 p-5 rounded-xl border border-gray-700 shadow-xl">
          <AnalyticsMatrix metrics={data.metrics} isGenerating={false} />
        </div>
      </div>
    </main>
  );
}