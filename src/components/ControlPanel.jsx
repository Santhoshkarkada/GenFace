"use client";
import { useState } from "react";

export default function ControlPanel({ sourceImage, setSourceImage, onGenerate, isGenerating }) {
  const [targetAge, setTargetAge] = useState(45);
  const [loraScale, setLoraScale] = useState(0.85);
  const [denoising, setDenoising] = useState(0.60);

  const handleImageUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSourceImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold border-b border-gray-700 pb-2 text-blue-400">Pipeline Config</h2>
      
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Query Face Image</label>
        <div className="flex items-center justify-center w-full">
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-900 border-gray-700 hover:border-gray-500 transition-colors">
            <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-2">
              <p className="text-sm text-gray-400"><span className="font-semibold text-blue-400">Click to upload</span> or drag and drop</p>
              <p className="text-xs text-gray-500 mt-1">PNG or JPG</p>
            </div>
            <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={isGenerating} />
          </label>
        </div>
      </div>

      <div>
        <div className="flex justify-between text-sm font-medium text-gray-300 mb-1">
          <span>Target Age Generation</span>
          <span className="text-blue-400 font-bold">{targetAge} yrs</span>
        </div>
        <input 
          type="range" min="1" max="100" value={targetAge} 
          onChange={(e) => setTargetAge(Number(e.target.value))}
          className="w-full accent-blue-500 h-1.5 bg-gray-700 rounded-lg cursor-pointer"
          disabled={isGenerating}
        />
      </div>

      <div>
        <div className="flex justify-between text-sm font-medium text-gray-300 mb-1">
          <span>LoRA Identity Weight</span>
          <span className="text-blue-400 font-bold">{loraScale.toFixed(2)}</span>
        </div>
        <input 
          type="range" min="0" max="1" step="0.05" value={loraScale} 
          onChange={(e) => setLoraScale(Number(e.target.value))}
          className="w-full accent-blue-500 h-1.5 bg-gray-700 rounded-lg cursor-pointer"
          disabled={isGenerating}
        />
      </div>

      <div>
        <div className="flex justify-between text-sm font-medium text-gray-300 mb-1">
          <span>Denoising Strength</span>
          <span className="text-blue-400 font-bold">{denoising.toFixed(2)}</span>
        </div>
        <input 
          type="range" min="0" max="1" step="0.05" value={denoising} 
          onChange={(e) => setDenoising(Number(e.target.value))}
          className="w-full accent-blue-500 h-1.5 bg-gray-700 rounded-lg cursor-pointer"
          disabled={isGenerating}
        />
      </div>

      <button
        onClick={() => onGenerate(targetAge, loraScale, denoising)}
        disabled={isGenerating || !sourceImage}
        className={`w-full py-3 rounded-lg font-medium tracking-wide transition-all ${
          !sourceImage ? "bg-gray-700 text-gray-500 cursor-not-allowed" : 
          isGenerating ? "bg-amber-600 text-white animate-pulse" : 
          "bg-blue-600 hover:bg-blue-500 text-white"
        }`}
      >
        {isGenerating ? "Executing Diffusion..." : "Generate & Verify"}
      </button>
    </div>
  );
}