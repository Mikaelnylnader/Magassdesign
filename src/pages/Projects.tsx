import { motion } from 'framer-motion'

interface Project {
  id: number
  title: string
  description: string
  image: string
  tags: string[]
}

const projects: Project[] = [
  {
    id: 1,
    title: "Project One",
    description: "A beautiful web application built with React and TailwindCSS",
    image: "/project1.jpg", // Add your image path
    tags: ["React", "TailwindCSS", "TypeScript"]
  },
  // Add more projects as needed
]

export default function Projects() {
  return (
    <div className="section-padding">
      <h1 className="text-4xl md:text-5xl font-display font-bold text-primary mb-8">
        Our Projects
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            className="hover-project bg-secondary/50 rounded-lg p-4"
            whileHover={{ y: -10 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="aspect-video bg-primary/10 rounded-md mb-4" />
            <h3 className="text-xl font-display font-bold text-primary">
              {project.title}
            </h3>
            <p className="text-primary/80 mt-2">{project.description}</p>
            <div className="flex flex-wrap gap-2 mt-4">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-sm bg-accent/10 text-accent px-2 py-1 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
} 