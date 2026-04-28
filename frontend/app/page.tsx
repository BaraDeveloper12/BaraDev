import CameraScanner from "@/components/CameraScanner";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <CameraScanner />
    </main>
  );
}