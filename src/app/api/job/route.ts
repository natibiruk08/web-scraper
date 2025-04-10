import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const jobId = searchParams.get("id");

  if (!jobId) {
    return NextResponse.json({ error: "Job ID is required" }, { status: 400 });
  }

  try {
    const response = await fetch(
      `https://boards-api.greenhouse.io/v1/boards/datavant2/jobs/${jobId}`
    );

    if (!response.ok) {
      return NextResponse.json(
        {
          error: `Failed to fetch job data: ${response.status} ${response.statusText}`,
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching job data:", error);
    return NextResponse.json(
      {
        error:
          "Failed to fetch job data. Please check the job ID and try again.",
      },
      { status: 500 }
    );
  }
}
