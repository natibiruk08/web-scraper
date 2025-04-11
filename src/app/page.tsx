"use client";

import type React from "react";

import JobDetails from "@/components/job-details";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { JobData } from "../lib/types.js";

// Sample job URL for demonstration
const SAMPLE_JOB_URL =
  "https://www.datavant.com/about/careers/open-roles/job?gh_jid=4534885008";

export default function Home() {
  const [jobUrl, setJobUrl] = useState("");
  const [jobData, setJobData] = useState<JobData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const url = new URL(jobUrl);

      const response = await fetch("/api/job", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch job data");
      }

      const data = await response.json();
      setJobData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch job data");
    } finally {
      setLoading(false);
    }
  };

  const handleUseSample = () => {
    setJobUrl(SAMPLE_JOB_URL);
  };

  return (
    <main className="container mx-auto py-10 px-4 max-w-4xl">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-semibold mb-2">Find Job Details</h2>
        <p className="text-slate-600">
          Enter a Datavant job URL to view comprehensive details
        </p>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div>
              <CardTitle>Enter Job URL</CardTitle>
              <CardDescription>
                Paste a Datavant job URL to view details
              </CardDescription>
            </div>
            <Button
              variant="outline"
              onClick={handleUseSample}
              className="text-sm"
              size="sm"
            >
              Try Sample
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-2"
          >
            <Input
              type="url"
              value={jobUrl}
              onChange={(e) => setJobUrl(e.target.value)}
              placeholder="https://www.datavant.com/about/careers/open-roles/job?gh_jid=4534885008"
              className="flex-1"
              required
            />
            <Button type="submit" disabled={loading || !jobUrl.trim()}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Loading...
                </>
              ) : (
                "View Job"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {jobData && <JobDetails job={jobData} jobUrl={jobUrl} />}
    </main>
  );
}
