import { NextResponse } from "next/server";
import puppeteer from "puppeteer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const jobUrl = body.url;

    if (!jobUrl) {
      return NextResponse.json(
        { error: "Job URL is required" },
        { status: 400 }
      );
    }

    const browser = await puppeteer.launch({
      headless: "shell",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();
    await page.goto(jobUrl, { waitUntil: "networkidle0" });

    const rawJobData = await page.evaluate(() => {
      const title = document.querySelector("h1")?.textContent?.trim() || "";
      const identifier =
        document.querySelector(".identifier")?.textContent?.trim() || "";
      const location =
        document.querySelector(".location")?.textContent?.trim() || "";
      const employeeType =
        document.querySelector(".employee-type")?.textContent?.trim() || "";
      const description =
        document.getElementById("job-description")?.innerHTML || "";

      const payRangeEl = document.querySelector(".pay-range");
      let payRange = "";

      if (payRangeEl) {
        const spans = Array.from(payRangeEl.querySelectorAll("span")).map(
          (el) => el.textContent?.trim()
        );
        payRange = spans.filter(Boolean).join(" ");
      }
      return {
        title,
        identifier,
        location,
        employeeType,
        description,
        payRange,
      };
    });

    await browser.close();

    console.log({ rawJobData: rawJobData.payRange });

    const jobData = {
      ...rawJobData,
    };

    return NextResponse.json(jobData);
  } catch (error) {
    console.error("Puppeteer scraping error:", error);
    return NextResponse.json(
      {
        error: "Failed to scrape job data. Try again later.",
      },
      { status: 500 }
    );
  }
}
