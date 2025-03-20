export default function DashboardLoading() {
  return (
    <div className="grid gap-6 animate-pulse">
      <div className="h-24 rounded-lg bg-gray-200" />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-32 rounded-lg bg-gray-200" />
        ))}
      </div>
    </div>
  )
} 