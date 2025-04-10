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

type JobData = {
  id: number;
  title: string;
  company_name: string;
  location: { name: string };
  requisition_id: string;
  absolute_url: string;
  content: string;
  metadata: Array<{
    name: string;
    value: string | { name: string };
    value_type: string;
  }>;
  departments: Array<{ name: string }>;
  offices: Array<{ name: string }>;
  updated_at: string;
  first_published: string;
};

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
      // Extract job ID from URL
      const url = new URL(jobUrl);
      const jobId = url.searchParams.get("gh_jid");

      if (!jobId) {
        throw new Error(
          "Invalid job URL. Please ensure it contains a gh_jid parameter."
        );
      }

      const response = await fetch(`/api/job?id=${jobId}`);

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

  return (
    <main className="container mx-auto py-10 px-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Datavant Job Viewer
      </h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Enter Job URL</CardTitle>
          <CardDescription>
            Paste a Datavant job URL to view details
          </CardDescription>
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

      {jobData && <JobDetails job={jobData} />}
    </main>
  );
}
