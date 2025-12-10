export default function MovieCardSkeleton() {
  return (
    <div className="shrink-0 w-40 sm:w-44 md:w-48 animate-pulse">
      {/* Image Skeleton */}
      <div className="w-full h-56 bg-white/10 rounded-lg mb-2" />

      {/* Title Skeleton */}
      <div className="h-3 bg-white/10 rounded w-3/4 mb-2" />
      <div className="h-3 bg-white/10 rounded w-1/2" />
    </div>
  )
}
