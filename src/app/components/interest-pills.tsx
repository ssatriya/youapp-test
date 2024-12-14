const InterestsPill = ({ interests }: { interests: string[] }) => {
  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {interests.map((interest, index) => {
        const label = interest.charAt(0).toUpperCase() + interest.slice(1);
        return (
          <div key={index} className="rounded-full px-4 py-2 bg-white/5">
            <span className="text-sm font-semibold">{label}</span>
          </div>
        );
      })}
    </div>
  );
};

export default InterestsPill;
