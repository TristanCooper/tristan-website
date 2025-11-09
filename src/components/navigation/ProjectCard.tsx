import Link from "next/link";
import Image from "next/image";
import * as motion from "motion/react-client";

const ProjectCard = ({ href, title, description, image }: { href: string; title: string; description: string; image: string; }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="h-full flex flex-col p-4 bg-dark-navy-700 border border-dark-navy-600 shadow-sm">
            <div className="relative w-full aspect-[4/3] overflow-hidden rounded">
                <Image src={image} alt={title} fill className="object-cover" />
            </div>
            <div className="mt-3 flex-1">
                <h1 className="text-xl font-normal tracking-tight sm:text-2xl">{title}</h1>
                <p className="mt-2 text-foreground/80">{description}</p>
            </div>
            <Link href={href} className="inline-block bg-brand px-2 py-1 mt-2 sm:w-fit">View Project</Link>
        </motion.div>
    )
}

export default ProjectCard