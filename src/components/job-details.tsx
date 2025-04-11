"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { JobData } from "@/lib/types";
import { formatContent } from "@/utils/format-content";
import {
  BuildingIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  CircleDollarSign,
  Hash,
  MapPinIcon,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface JobDetailsProps {
  job: JobData;
  jobUrl: string;
}

export default function JobDetails({ job, jobUrl }: JobDetailsProps) {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const { description, employeeType, payRange, identifier, location, title } =
    job;

  const { contentPreview, fullContent } = formatContent(description);

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden border shadow">
        <CardContent className="p-6">
          <div className="flex flex-col gap-2 mb-4">
            <h1 className="text-2xl font-bold md:text-3xl text-slate-800">
              {title}
            </h1>
            <p className="text-lg text-slate-600">Datavant</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="flex items-center gap-2">
              <MapPinIcon className="h-5 w-5 text-slate-500" />
              <span>{location}</span>
            </div>
            <div className="flex items-center gap-2">
              <CircleDollarSign className="h-5 w-5 text-slate-500" />
              <span>{payRange}</span>
            </div>
            <div className="flex items-center gap-2">
              <BuildingIcon className="h-5 w-5 text-slate-500" />
              <span>Work Setting: {employeeType}</span>
            </div>
            <div className="flex items-center gap-2">
              <Hash className="h-5 w-5 text-slate-500" />
              <span>{identifier}</span>
            </div>
          </div>

          <Separator className="my-6" />

          <div>
            <h2 className="text-xl font-semibold mb-4">Job Description</h2>
            <div className="prose max-w-none dark:prose-invert">
              {showFullDescription ? (
                <div dangerouslySetInnerHTML={{ __html: fullContent }} />
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

          <div className="flex justify-center">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link
                href={`${jobUrl}#job-application`}
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
