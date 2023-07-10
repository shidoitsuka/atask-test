const RepoSkeleton: React.FC = () => {
  return (
    <>
      {[...Array(5).keys()].map((i) => (
        <div key={i} className="mb-2 bg-slate-500 p-2">
          <div className="flex justify-between">
            <div className="h-4 w-1/2 animate-pulse bg-slate-200"></div>
            <div className="h-4 w-4 animate-pulse bg-slate-200"></div>
          </div>
          <div className="mt-2 h-8 w-full animate-pulse bg-slate-200"></div>
        </div>
      ))}
    </>
  );
};
export default RepoSkeleton;
