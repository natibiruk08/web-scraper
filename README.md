# Datavant Job Viewer

A clean, modern web application built with Next.js that allows users to view job details from Datavant's career page by simply entering a job URL.

![Datavant Job Viewer Screenshot](/placeholder.svg?height=400&width=800)

## Features

- **URL-based Job Lookup**: Enter a Datavant job URL to view detailed information
- **Sample URL Button**: Try the application instantly with a pre-filled sample job URL
- **Clean, Modern UI**: Minimalist design with clear information hierarchy
- **Responsive Layout**: Works seamlessly on mobile, tablet, and desktop devices
- **Collapsible Description**: View a preview of the job description with option to expand
- **Web Scraping with Puppeteer**: Uses Puppeteer to dynamically scrape job data from the Datavant careers page

## Technologies Used

- **Next.js 15**: React framework with App Router
- **TypeScript**: For type safety and better developer experience
- **Tailwind CSS**: For styling and responsive design
- **shadcn/ui**: Component library for UI elements
- **Lucide React**: For icons
- **Puppeteer**: Headless browser used for scraping job content from dynamic pages

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/natibiruk08/web-scraper.git
   cd web-scraper
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Install shadcn/ui components:

   ```bash
   pnpx shadcn@latest init
   pnpx shadcn@latest add button card input badge separator
   ```

4. Run the development server:

   ```bash
   pnpm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. Enter a Datavant job URL in the format: `https://www.datavant.com/about/careers/open-roles/job?gh_jid=4534885008`
2. Click "View Job" to fetch and display the job details
3. Use the "See More" button to expand the job description
4. Click "Apply Now" to go to the official application page

## API Endpoints

The application includes a simple API route:

- **GET /api/job**: Fetches job data from the Greenhouse API
  - Query Parameters:
    - `id`: The Greenhouse job ID (extracted from the URL)
  - Response: JSON object containing job details

## Project Structure

```
datavant-job-viewer/
├── app/
│ ├── api/
│ │ └── job/
│ │ └── route.ts # API endpoint for fetching job data
│ ├── page.tsx # Main application page
│ └── layout.tsx # Root layout
├── components/
│ ├── job-details.tsx # Job details display component
│ └── ui/ # shadcn/ui components
├── public/
└── README.md
```

## Key Components

### `app/page.tsx`

The main page component that handles:

- URL input form
- API request state management
- Error handling
- Rendering the JobDetails component

### `components/job-details.tsx`

Displays the job information with:

- Job title, company, and metadata
- Collapsible job description
- Apply button
- Formatted dates and organized information

### `app/api/job/route.ts`

API route that:

- Accepts a job ID
- Fetches data from the Greenhouse API
- Returns formatted job data

## Dependencies

- **Next.js**: `^15.3.0`
- **React**: `^19.0.0`
- **React DOM**: `^19.0.0`
- **TypeScript**: `^5`
- **Tailwind CSS**: `^4`
- **Lucide React**: `^0.294.0`
- **Puppeteer**: `^24.6.1`

## Future Improvements

- Add caching for job data to reduce API calls
- Implement search functionality for finding jobs by keyword
- Add pagination for browsing multiple job listings
- Create a favorites system for saving interesting job postings
- Add authentication for personalized experiences
- Implement analytics to track popular job listings

## License

MIT

---

Created with ❤️ using Next.js and shadcn/ui
