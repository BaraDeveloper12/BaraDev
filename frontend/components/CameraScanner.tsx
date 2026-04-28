"use client";

import { useEffect, useRef, useState } from "react";

export default function CameraScanner() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [status, setStatus] = useState("Waiting camera access...");
  const [height, setHeight] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    startCamera();
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: 1280,
          height: 720,
          facingMode: "user"
        }
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setStatus("Stand straight inside green box");
      }
    } catch (error) {
      setStatus("Camera permission denied");
    }
  };

  const startScan = async () => {
    setLoading(true);
    setStatus("Scanning full body...");

    try {
      const response = await fetch("http://127.0.0.1:8000/scan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          body_ratio: 1.02
        })
      });

      const data = await response.json();
      setHeight(data.estimated_height_cm);
      setStatus("Scan complete");
    } catch (error) {
      setStatus("Backend connection failed");
    }

    setLoading(false);
  };

  return (
    <div className="w-full max-w-4xl space-y-5">
      <h1 className="text-3xl font-bold text-center">
        AI Height Scanner
      </h1>

      <div className="relative rounded-2xl overflow-hidden border border-white">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full"
        />

        <canvas
          ref={canvasRef}
          className="absolute inset-0 pointer-events-none"
        />

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[300px] h-[520px] border-4 border-green-400 rounded-2xl" />
        </div>
      </div>

      <p className="text-center text-lg">{status}</p>

      <div className="flex justify-center">
        <button
          onClick={startScan}
          disabled={loading}
          className="px-8 py-3 rounded-xl bg-green-500 hover:bg-green-600 font-bold"
        >
          {loading ? "Scanning..." : "Start Scan"}
        </button>
      </div>

      {height && (
        <div className="text-center text-2xl font-bold">
          Estimated Height: {height} CM
        </div>
      )}
    </div>
  );
}
