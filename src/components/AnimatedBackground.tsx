export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#1800AD]/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-1/3 -right-32 w-80 h-80 bg-[#4D3AFF]/10 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-[#1800AD]/5 rounded-full blur-3xl animate-pulse delay-500" />
    </div>
  );
}
