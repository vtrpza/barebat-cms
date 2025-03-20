export default function DashboardPage() {
  return (
    <div className="grid gap-6">
      <div className="rounded-lg border bg-white p-6">
        <h2 className="text-lg font-semibold">Welcome to Barebat</h2>
        <p className="mt-2 text-gray-600">
          Start managing your events and guest lists from here.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border bg-white p-6">
          <h3 className="font-medium">Active Events</h3>
          <p className="mt-2 text-2xl font-semibold">0</p>
        </div>
        <div className="rounded-lg border bg-white p-6">
          <h3 className="font-medium">Total Guests</h3>
          <p className="mt-2 text-2xl font-semibold">0</p>
        </div>
        <div className="rounded-lg border bg-white p-6">
          <h3 className="font-medium">Gift Registry Items</h3>
          <p className="mt-2 text-2xl font-semibold">0</p>
        </div>
      </div>
    </div>
  )
} 