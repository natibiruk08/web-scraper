"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  BriefcaseIcon,
  BuildingIcon,
  CalendarIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  MapPinIcon,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type JobMetadata = {
  name: string;
  value: string | { name: string };
  value_type: string;
};

type JobData = {
  id: number;
  title: string;
  company_name: string;
  location: { name: string };
  requisition_id: string;
  absolute_url: string;
  content: string;
  metadata: JobMetadata[];
  departments: Array<{ name: string }>;
  offices: Array<{ name: string }>;
  updated_at: string;
  first_published: string;
};

interface JobDetailsProps {
  job: JobData;
}

export default function JobDetails({ job }: JobDetailsProps) {
  const [showFullDescription, setShowFullDescription] = useState(false);

  // Helper function to get metadata value
  const getMetadataValue = (name: string): string => {
    const item = job.metadata.find((m) => m.name === name);
    if (!item) return "Not specified";

    if (typeof item.value === "string") {
      return item.value;
    } else if (
      item.value &&
      typeof item.value === "object" &&
      "name" in item.value
    ) {
      return item.value.name;
    }

    return "Not specified";
  };

  // Decode HTML content
  const decodeHtml = (html: string) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  const decodedContent = decodeHtml(job.content);

  // Get a preview of the content (first 300 characters)
  const contentPreview = decodedContent.substring(0, 300) + "...";

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden border shadow">
        <CardContent className="p-6">
          <div className="flex flex-col gap-2 mb-4">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-slate-100">
                ID: {job.requisition_id}
              </Badge>
              {job.departments[0]?.name && (
                <Badge variant="outline" className="bg-slate-100">
                  {job.departments[0].name
                    .replace("x", "")
                    .replace(" - Do Not Use", "")}
                </Badge>
              )}
            </div>
            <h1 className="text-2xl font-bold md:text-3xl text-slate-800">
              {job.title}
            </h1>
            <p className="text-lg text-slate-600">{job.company_name}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="flex items-center gap-2">
              <MapPinIcon className="h-5 w-5 text-slate-500" />
              <span>{job.location.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <BriefcaseIcon className="h-5 w-5 text-slate-500" />
              <span>{getMetadataValue("Assignment Category")}</span>
            </div>
            <div className="flex items-center gap-2">
              <BuildingIcon className="h-5 w-5 text-slate-500" />
              <span>Work Setting: {getMetadataValue("Work Setting")}</span>
            </div>
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5 text-slate-500" />
              <span>Posted: {formatDate(job.first_published)}</span>
            </div>
          </div>

          <Separator className="my-6" />

          <div>
            <h2 className="text-xl font-semibold mb-4">Job Description</h2>
            <div className="prose max-w-none dark:prose-invert">
              {showFullDescription ? (
                <div dangerouslySetInnerHTML={{ __html: decodedContent }} />
              ) : (
                <div dangerouslySetInnerHTML={{ __html: contentPreview }} />
              )}

              <Button
                variant="ghost"
                className="mt-4 flex items-center gap-1 text-slate-600"
                onClick={() => setShowFullDescription(!showFullDescription)}
              >
                {showFullDescription ? (
                  <>
                    Show Less <ChevronUpIcon className="h-4 w-4" />
                  </>
                ) : (
                  <>
                    See More <ChevronDownIcon className="h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="flex flex-col gap-2 text-sm text-slate-500 mb-6">
            <p>Job ID: {job.id}</p>
            <p>Last Updated: {formatDate(job.updated_at)}</p>
          </div>

          <div className="flex justify-center">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link
                href={`${job.absolute_url}#job-application`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Apply Now
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
