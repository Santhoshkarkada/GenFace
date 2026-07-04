"use client";

export default function ImageWorkspace({ sourceImage, generatedImage, isGenerating, currentStep, totalSteps }) {
  const progressPercent = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className="flex flex-col h-full justify-between space-y-4">
      <h2 className="text-lg font-semibold border-b border-gray-700 pb-2 text-blue-400">Visual Comparison View</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-grow items-center">
        <div className="relative aspect-square bg-gray-900 rounded-lg overflow-hidden flex items-center justify-center border border-gray-700">
          {sourceImage ? (
            <img src={sourceImage} alt="Source query" className="w-full h-full object-cover" />
          ) : (
            <span className="text-sm text-gray-500">Awaiting historical photo</span>
          )}
          <div className="absolute top-2 left-2 bg-black/70 px-2 py-0.5 rounded text-xs text-gray-300">Historical Image</div>
        </div>

        <div className="relative aspect-square bg-gray-900 rounded-lg overflow-hidden flex items-center justify-center border border-gray-700">
          {isGenerating && (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-gray-900/90 z-10">
              <span className="text-sm font-semibold tracking-wider text-amber-400 mb-2">Denoising Execution Loop</span>
              <div className="w-3/4 bg-gray-700 rounded-full h-2">
                <div className="bg-amber-500 h-2 rounded-full transition-all duration-300" style={{ width: `${progressPercent}%` }}></div>
              </div>
              <span className="text-xs text-gray-400 mt-2">Step {currentStep} / {totalSteps}</span>
            </div>
          )}

          {generatedImage ? (
            <img src={generatedImage} alt="Generated output" className="w-full h-full object-cover filter contrast-125 hue-rotate-15" />
          ) : (
            !isGenerating && <span className="text-sm text-gray-500">Awaiting target output</span>
          )}
          <div className="absolute top-2 left-2 bg-black/70 px-2 py-0.5 rounded text-xs text-gray-300">Target LoRA Output</div>
        </div>
      </div>
    </div>
  );
}