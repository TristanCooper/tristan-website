import Link from "next/link";
import Image from "next/image";
import * as motion from "motion/react-client";

const ProjectCard = ({ href, title, description, image, tags = [] }: { href?: string; title: string; description: string; image?: string; tags?: string[]; }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="h-full flex flex-col p-4 bg-dark-navy-700 border border-dark-navy-600 shadow-sm">
            {image ? (
            <div className="relative w-full aspect-[4/3] overflow-hidden rounded">
                <Image
                  src={image}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
            </div>
            ) : null}
            <div className="mt-3 flex-1">
                <h2 className="text-xl font-normal tracking-tight sm:text-2xl">{title}</h2>
                <p className="mt-2 text-foreground/80">{description}</p>
                {tags.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                        {tags.map((t) => (
                            <span key={t} className="px-2 py-0.5 text-xs ring-1 ring-inset ring-foreground/15">
                                {t}
                            </span>
                        ))}
                    </div>
                )}
            </div>
            {href ? (
            <Link href={href} className="inline-block bg-brand px-2 py-1 mt-2 sm:w-fit text-dark-navy-950 hover:bg-brand-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand">View Project</Link>
            ) : null}
        </motion.div>
    )
}

export default ProjectCard