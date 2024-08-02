import { Skeleton } from "./ui/skeleton";

function LoadingSkeleton() {
  return (
    <div className="flex flex-col space-y-3 ">
      <Skeleton className="w-[200px] h-[200px] rounded-md" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-4 w-[150px]" />
      </div>
    </div>
  );
}

export default LoadingSkeleton;
