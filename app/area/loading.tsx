export default function Loading() {
  return (
    // h-screen = 100vh , h-full = 100% , animate-spin = tailwindCSS animation
    <div className="flex justify-center items-center h-screen"> 
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
    </div>
  );
}