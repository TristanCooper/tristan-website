import FilterableProjects, { type Project } from "@/components/FilterableProjects";

const PROJECTS: Project[] = [
  {
    href: "/work",
    image: "/odoo-call-board.png",
    title: "Odoo Business Essentials",
    description:
      "A collection of practical Odoo CE addons built to solve real sales and CRM challenges for small businesses.",
    tags: ["ERP", "Odoo"],
  },
];

export default function WorkPage() {
  return (
    <div className="prose prose-zinc max-w-none">
      <FilterableProjects projects={PROJECTS} />
    </div>
  );
}
