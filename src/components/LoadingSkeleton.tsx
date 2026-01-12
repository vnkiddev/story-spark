export default function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {Array.from({ length: 10 }).map((_, index) => (
        <div key={index} className="child-card p-4">
          <div className="loading-skeleton aspect-[3/4] mb-4"></div>
          <div className="loading-skeleton h-4 mb-2"></div>
          <div className="loading-skeleton h-4 w-3/4"></div>
        </div>
      ))}
    </div>
  )
}