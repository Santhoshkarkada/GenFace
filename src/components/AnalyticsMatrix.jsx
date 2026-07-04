"use client";

export default function AnalyticsMatrix({ metrics, isGenerating }) {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold border-b border-gray-700 pb-2 text-blue-400">Verification Analytics</h2>

      {isGenerating && <div className="text-center py-12 text-gray-400 animate-pulse text-sm">Awaiting tensor validation...</div>}
      {!metrics && !isGenerating && <div className="text-center py-12 text-gray-500 text-sm">Run inference to generate metrics.</div>}

      {metrics && !isGenerating && (
        <div className="space-y-6">
          <div className={`p-4 rounded-lg border text-center ${metrics.isMatch ? "bg-green-950/40 text-green-400 border-green-800" : "bg-red-950/40 text-red-400 border-red-800"}`}>
            <span className="block text-xs uppercase tracking-widest font-semibold mb-1">System Confirmation</span>
            <span className="text-xl font-bold">{metrics.isMatch ? "IDENTITY VERIFIED" : "MATCH FAILURE"}</span>
          </div>

          <div className="flex flex-col items-center justify-center py-2">
            <div className="relative w-28 h-28 flex items-center justify-center rounded-full border-4 border-blue-500/30">
              <span className="text-2xl font-black text-white">{metrics.similarityScore}%</span>
            </div>
            <span className="text-xs text-gray-400 mt-2 font-medium">Biometric Similarity</span>
          </div>

          <div className="space-y-3 bg-gray-900/50 p-3 rounded-lg border border-gray-800 text-sm">
            <div className="flex justify-between py-1 border-b border-gray-800">
              <span className="text-gray-400">Euclidean Distance:</span>
              <span className="font-mono font-medium text-amber-400">{metrics.euclideanDistance}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-gray-800">
              <span className="text-gray-400">Landmarks Tracked:</span>
              <span className="font-medium text-gray-200">{metrics.landmarksMatched} / 68 dots</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-gray-400">Confidence Interval:</span>
              <span className="font-semibold text-green-400">{metrics.confidenceInterval}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}