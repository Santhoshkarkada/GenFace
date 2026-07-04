"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ControlPanel from "@/components/ControlPanel";
import ImageWorkspace from "@/components/ImageWorkspace";

export default function Dashboard() {
  const router = useRouter();
  
  // 1. Auth state to prevent the dashboard from flashing before redirect
  const [isAuthorized, setIsAuthorized] = useState(false);
  
  const [sourceImage, setSourceImage] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = 20;

  // 2. The Auth Check: Runs the moment the page loads
  useEffect(() => {
    const token = sessionStorage.getItem("aifr_auth_token");
    if (!token) {
      // No token found? Kick them to the login page
      router.push("/login");
    } else {
      // Token found! Unhide the dashboard
      setIsAuthorized(true);
    }
  }, [router]);

  const handleStartInference = async (targetAge, loraScale, denoising) => {
    if (!sourceImage) return;
    setIsGenerating(true);
    setCurrentStep(0);

    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= totalSteps - 1) {
          clearInterval(interval);
          setIsGenerating(false);
          
          const resultData = {
            sourceImage: sourceImage,
            generatedImage: sourceImage, // Mock fallback
            metrics: {
              similarityScore: 89.42,
              isMatch: true,
              euclideanDistance: 0.312,
              confidenceInterval: "High",
              landmarksMatched: 68,
            }
          };

          sessionStorage.setItem("aifr_latest_result", JSON.stringify(resultData));
          router.push("/results");
          return totalSteps;
        }
        return prev + 1;
      });
    }, 200); 
  };

  // 3. Keep the screen blank while checking auth to prevent UI flashing
  if (!isAuthorized) {
    return <div className="min-h-screen bg-gray-900"></div>; 
  }

  return (
    <main className="min-h-screen bg-gray-900 text-gray-100 p-6">
      <header className="mb-8 border-b border-gray-800 pb-4">
        <h1 className="text-2xl font-bold tracking-tight">AIFR Diffusion Workspace</h1>
        <p className="text-sm text-gray-400 mt-1">Age-Invariant Face Recognition Matrix</p>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
        <div className="xl:col-span-1 bg-gray-800 p-5 rounded-xl border border-gray-700 shadow-xl space-y-6">
          <ControlPanel 
            sourceImage={sourceImage} 
            setSourceImage={setSourceImage}
            onGenerate={handleStartInference}
            isGenerating={isGenerating}
          />
        </div>
        <div className="xl:col-span-2 bg-gray-800 p-5 rounded-xl border border-gray-700 shadow-xl min-h-[500px]">
          <ImageWorkspace 
            sourceImage={sourceImage}
            generatedImage={null}
            isGenerating={isGenerating}
            currentStep={currentStep}
            totalSteps={totalSteps}
          />
        </div>
      </div>
    </main>
  );
}