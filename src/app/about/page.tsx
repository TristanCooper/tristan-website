import type { Metadata } from "next";
import AboutTimeline, { type TimelineItem } from "@/components/AboutTimeline";

export const metadata: Metadata = {
  title: "About",
  description: "About Tristan Cooper - software engineer with a decade building accessible, customer-facing platforms.",
};

const ITEMS: TimelineItem[] = [
  {
    year: "2025",
    title: "Sales and Business ERP Development",
    subtitle: "JICG",
    description: "Working to grow sales by improving the efficiency of the sales process and streamlining the business operations with the development of an ERP system.",
  },
  {
    year: "2019 - 2025",
    title: "Software Engineer",
    subtitle: "Peacock/NBCU",
    description: "After Sky was acquired by NBCUniversal, the new US streaming service was created from the codebase of NowTV with an aim on scalability and localisation as key priorities due to the ambition to launch in multiple countries.",
  },
  {
    year: "2017 - 2018",
    title: "Associate Software Engineer",
    subtitle: "NowTV",
    description: "Part of the original team to build the entirely new NowTV Web account management platform after business pivoted to focus on streaming, internet and phone. A large emphasis was placed on accessibility and pixel-perfect design.",
  },
  {
    year: "2014 - 2017",
    title: "Apprentice Software Engineer",
    subtitle: "BSkyB",
    description: "Developed and maintained internal tools for the company to aid in the development of new features, such as an API Explorer and a service health check dashboard.",
  },
  {
    year: "2012 - 2014",
    title: "A-Levels",
    subtitle: "Shaftesbury",
    description: "Studied Computing at Shaftesbury with end of year project deployed at local dairy firm to help manage machine maintenance.",
  },
];

export default function AboutPage() {
  return (
    <div>
      <h1 className="sr-only">About</h1>
      <div className="max-w-none grid grid-cols-6 gap-6">
        <div className="space-y-3 col-span-6 md:col-span-2 order-2 md:order-1">
          <p>
            I grew up in rural Dorset taking apart computers before I&rsquo;d learned to properly put them back together. That curiosity led me to programming, and by the time I finished school, I&rsquo;d built a maintenance tracking system for a local dairy - solving real problems with code felt natural.
          </p>
          <p>
            At 18, I moved to London for a software engineering apprenticeship at Sky, where I&rsquo;d spend the next decade building customer-facing platforms. I worked across NowTV, Sky, and Peacock - account management systems, subscription flows, help sites, and retention features. These platforms served millions of users daily, and getting them right meant balancing complex business requirements with polished, accessible interfaces.
          </p>
          <p>
            I ensure accessibility without compromising aesthetics. Poring over the details: transitions, spacing, micro-interactions. <span className="font-bold text-brand">Providing the polish that makes something feel premium.</span>
          </p>
        </div>

        <AboutTimeline items={ITEMS} />
      </div>
    </div>
  );
}
