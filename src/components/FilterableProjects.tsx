"use client";

import { useMemo, useState } from "react";
import ProjectCard from "@/components/navigation/ProjectCard";

export type Project = {
  href: string;
  image: string;
  title: string;
  description: string;
  tags: string[];
};

export default function FilterableProjects({ projects }: { projects: Project[] }) {
  const allTags = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => p.tags.forEach((t) => set.add(t)));
    return Array.from(set).sort();
  }, [projects]);

  const [active, setActive] = useState<Set<string>>(new Set());

  const toggleTag = (tag: string) => {
    setActive((prev) => {
      const next = new Set(prev);
      if (next.has(tag)) next.delete(tag);
      else next.add(tag);
      return next;
    });
  };

  const clearAll = () => setActive(new Set());

  const filtered = useMemo(() => {
    if (active.size === 0) return projects;
    return projects.filter((p) => p.tags.some((t) => active.has(t)));
  }, [active, projects]);

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={clearAll}
          className={`px-2 py-0.5 text-sm ring-1 ring-inset ring-foreground/15 ${
            active.size === 0 ? "bg-brand" : ""
          }`}
        >
          All
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => toggleTag(tag)}
            className={`px-2 py-0.5 text-sm ring-1 ring-inset ring-foreground/15 ${
              active.has(tag) ? "bg-brand" : ""
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((p) => (
          <ProjectCard
            key={p.title}
            href={p.href}
            image={p.image}
            title={p.title}
            description={p.description}
            tags={p.tags}
          />
        ))}
      </div>
    </div>
  );
}
