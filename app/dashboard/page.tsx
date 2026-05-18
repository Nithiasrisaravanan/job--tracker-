import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const jobs = await db.job.findMany({
    where: { userId: session.user.id! },
    orderBy: { createdAt: "desc" },
  });

  const stats = {
    total: jobs.length,
    applied: jobs.filter((j) => j.status === "APPLIED").length,
    interview: jobs.filter((j) => j.status === "INTERVIEW").length,
    offer: jobs.filter((j) => j.status === "OFFER").length,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold text-gray-900">Job Tracker</h1>
        <div className="flex items-center gap-3">
          <img
            src={session.user.image ?? ""}
            alt={session.user.name ?? ""}
            className="w-8 h-8 rounded-full"
          />
          <span className="text-sm text-gray-600">{session.user.name}</span>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total", value: stats.total, color: "bg-blue-50 text-blue-700" },
            { label: "Applied", value: stats.applied, color: "bg-yellow-50 text-yellow-700" },
            { label: "Interview", value: stats.interview, color: "bg-green-50 text-green-700" },
            { label: "Offers", value: stats.offer, color: "bg-purple-50 text-purple-700" },
          ].map((stat) => (
            <div key={stat.label} className={`rounded-xl p-4 ${stat.color}`}>
              <div className="text-2xl font-semibold">{stat.value}</div>
              <div className="text-sm mt-1 opacity-80">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-base font-semibold text-gray-900">
              Applications
            </h2>
            <a href="/dashboard/add" className="bg-gray-900 text-white text-sm px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
  + Add Job
</a>
            
          </div>

          {jobs.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <p className="text-lg">No applications yet</p>
              <p className="text-sm mt-1">Add your first job to get started</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {jobs.map((job) => (
                <div key={job.id} className="py-4 flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900">{job.company}</div>
                    <div className="text-sm text-gray-500">{job.role}</div>
                  </div>
                  <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                    job.status === "OFFER" ? "bg-green-100 text-green-700" :
                    job.status === "INTERVIEW" ? "bg-blue-100 text-blue-700" :
                    job.status === "REJECTED" ? "bg-red-100 text-red-700" :
                    job.status === "APPLIED" ? "bg-yellow-100 text-yellow-700" :
                    "bg-gray-100 text-gray-600"
                  }`}>
                    {job.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}