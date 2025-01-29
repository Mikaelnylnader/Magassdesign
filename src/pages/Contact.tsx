import { Button } from '@/components/ui/Button'

export default function Contact() {
  return (
    <div className="section-padding">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-primary mb-8">
          Get in Touch
        </h1>
        <form className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-primary mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-4 py-2 bg-secondary border border-primary/20 rounded-md text-primary focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-primary mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 bg-secondary border border-primary/20 rounded-md text-primary focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-primary mb-2">
              Message
            </label>
            <textarea
              id="message"
              rows={6}
              className="w-full px-4 py-2 bg-secondary border border-primary/20 rounded-md text-primary focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
          <Button type="submit" className="w-full">
            Send Message
          </Button>
        </form>
      </div>
    </div>
  )
} 