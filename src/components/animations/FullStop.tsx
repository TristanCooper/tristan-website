import * as motion from "motion/react-client"

export default function FullStop() {
    return <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        className="inline-block w-1 h-1 rounded-full bg-red-500"
    />
}