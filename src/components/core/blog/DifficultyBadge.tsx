const DifficultyBadge = ({ difficulty }: { difficulty: string }) => {
  const colors = {
    Beginner: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    Intermediate: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    Advanced: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${
        colors[difficulty as keyof typeof colors]
      }`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {difficulty}
    </span>
  );
};
export default DifficultyBadge;
