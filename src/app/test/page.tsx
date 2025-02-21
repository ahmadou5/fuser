import AnimatedCard from '@/components/base/AnimatedCard';

export default function TestPage() {
  return (
    <div className="h-screen container mt-10 grid place-items-center">
      <div className="p-5">
        <h1>Test Page</h1>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-3">
          <AnimatedCard />
          <AnimatedCard />
          <AnimatedCard />
        </div>
      </div>
    </div>
  );
}
