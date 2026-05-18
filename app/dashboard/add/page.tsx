import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { addJob } from "./actions";

export default async function AddJobPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 px-6 py-4">
        <a href="/dashboard" className="text-sm text-gray-500 hover:text-gray-900">
          ← Back to Dashboard
        </a>
      </nav>
      <main className="max-w-xl mx-auto px-6 py-8">
        <h1 className="text-xl font-semibold text-gray-900 mb-6">Add Application</h1>
        <form action={addJob} className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Company *</label>
            <input name="company" required placeholder="e.g. Google" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"/>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Role *</label>
            <input name="role" required placeholder="e.g. Frontend Engineer" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"/>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Location</label>
            <input name="location" placeholder="e.g. Remote / Bangalore" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"/>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Status</label>
            <select name="status" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900">
              <option value="WISHLIST">Wishlist</option>
              <option value="APPLIED">Applied</option>
              <option value="INTERVIEW">Interview</option>
              <option value="OFFER">Offer</option>
              <option value="REJECTED">Rejected</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Job URL</label>
            <input name="url" placeholder="https://..." className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"/>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Salary Range</label>
            <input name="salary" placeholder="e.g. ₹8-12 LPA" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"/>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Notes</label>
            <textarea name="notes" rows={3} placeholder="Recruiter name, referral, anything useful..." className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 resize-none"/>
          </div>
          <button type="submit" className="w-full bg-gray-900 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors">
            Save Application
          </button>
        </form>
      </main>
    </div>
  );
}