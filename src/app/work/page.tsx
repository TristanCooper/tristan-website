import ProjectCard from "@/components/navigation/ProjectCard";

export default function WorkPage() {
  return (
    <div className="prose prose-zinc max-w-none">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <ProjectCard href="" image="/launchpad.png" title="Launchpad" description="A no-code SaaS platform for generating amazing looking splash pages. Plus the ability to export code and deploy easily!" />
        <ProjectCard href="" image="/odoo-call-board.png" title="Odoo Business Essentials" description="A collection of practical Odoo CE addons built to solve real sales and CRM challenges for small businesses." />
      </div>
    </div>
  );
}
