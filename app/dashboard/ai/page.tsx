"use client";

import { useState } from "react";

export default function AIToolsPage() {
  const [activeTool, setActiveTool] = useState("analyze");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const [jd, setJd] = useState("");
  const [resume, setResume] = useState("");

  const [coverRole, setCoverRole] = useState("");
  const [coverBg, setCoverBg] = useState("");

  const [intRole, setIntRole] = useState("");
  const [intType, setIntType] = useState("Behavioral");

  async function callAI(prompt: string) {
    setLoading(true);
    setResult("");
    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      setResult(data.text || "No response received.");
    } catch (e) {
      setResult("Error calling AI. Please try again.");
    }
    setLoading(false);
  }

  function runAnalyze() {
    if (!jd || !resume) return alert("Please fill in both fields.");
    callAI(`You are a career coach. Analyze this candidate's fit for the job.

JOB DESCRIPTION:
${jd}

CANDIDATE BACKGROUND:
${resume}

Provide:
1. Match score (0-100) with verdict
2. Top 3 strengths
3. Top 3 gaps
4. 3 resume improvements
Keep it concise and use plain text.`);
  }

  function runCoverLetter() {
    if (!coverRole || !coverBg) return alert("Please fill in all fields.");
    callAI(`Write a compelling cover letter for this application.

ROLE: ${coverRole}
CANDIDATE: ${coverBg}

Guidelines:
- 3 paragraphs, under 250 words
- No "I am writing to express my interest" openers
- Confident and specific
- Plain text only`);
  }

  function runInterview() {
    if (!intRole) return alert("Please enter a role.");
    callAI(`Generate 5 ${intType} interview questions for: ${intRole}

For each question provide:
1. The question
2. What the interviewer is evaluating
3. A model answer outline (3-4 points)

Make questions specific to the role. Plain text format.`);
  }

  const tools = [
    { id: "analyze", label: "Resume Fit" },
    { id: "cover", label: "Cover Letter" },
    { id: "interview", label: "Interview Coach" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <a href="/dashboard" className="text-sm text-gray-500 hover:text-gray-900">← Dashboard</a>
        <h1 className="text-base font-semibold text-gray-900">AI Tools</h1>
        <div />
      </nav>

      <main className="max-w-3xl mx-auto px-6 py-8">
        <div className="flex gap-2 mb-6">
          {tools.map((t) => (
            <button
              key={t.id}
              onClick={() => { setActiveTool(t.id); setResult(""); }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTool === t.id
                  ? "bg-gray-900 text-white"
                  : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col gap-4">
          {activeTool === "analyze" && (
            <>
              <h2 className="font-semibold text-gray-900">Resume Fit Analyzer</h2>
              <p className="text-sm text-gray-500">Paste a job description and your background to get a match score.</p>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Job Description</label>
                <textarea rows={4} value={jd} onChange={(e) => setJd(e.target.value)} placeholder="Paste the full job posting here..." className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 resize-none"/>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Your Background</label>
                <textarea rows={3} value={resume} onChange={(e) => setResume(e.target.value)} placeholder="e.g. 3 years React, Node.js, built 2 SaaS products..." className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 resize-none"/>
              </div>
              <button onClick={runAnalyze} disabled={loading} className="bg-gray-900 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors disabled:opacity-50">
                {loading ? "Analyzing..." : "Analyze Match ✦"}
              </button>
            </>
          )}

          {activeTool === "cover" && (
            <>
              <h2 className="font-semibold text-gray-900">Cover Letter Generator</h2>
              <p className="text-sm text-gray-500">Generate a tailored cover letter in seconds.</p>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Role & Company</label>
                <input value={coverRole} onChange={(e) => setCoverRole(e.target.value)} placeholder="e.g. Frontend Engineer at Razorpay" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"/>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Your Background</label>
                <textarea rows={3} value={coverBg} onChange={(e) => setCoverBg(e.target.value)} placeholder="e.g. I'm a fresher with strong React skills, built 3 projects..." className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 resize-none"/>
              </div>
              <button onClick={runCoverLetter} disabled={loading} className="bg-gray-900 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors disabled:opacity-50">
                {loading ? "Writing..." : "Generate Letter ✦"}
              </button>
            </>
          )}

          {activeTool === "interview" && (
            <>
              <h2 className="font-semibold text-gray-900">Interview Coach</h2>
              <p className="text-sm text-gray-500">Get tailored interview questions with model answers.</p>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Role</label>
                <input value={intRole} onChange={(e) => setIntRole(e.target.value)} placeholder="e.g. Frontend Engineer at Google" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"/>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Interview Type</label>
                <select value={intType} onChange={(e) => setIntType(e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900">
                  <option>Behavioral</option>
                  <option>Technical</option>
                  <option>Culture Fit</option>
                  <option>System Design</option>
                </select>
              </div>
              <button onClick={runInterview} disabled={loading} className="bg-gray-900 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors disabled:opacity-50">
                {loading ? "Generating..." : "Generate Questions ✦"}
              </button>
            </>
          )}

          {result && (
            <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-800 leading-relaxed whitespace-pre-wrap border border-gray-200">
              {result}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}