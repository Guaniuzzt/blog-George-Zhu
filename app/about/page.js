import H1 from "@/components/h1"
import { MotionItem } from "@/components/page-transition"
import Link from "next/link"
import Card from "@/components/card"

export const metadata = {
  title: 'About'
}

const skills = [
  { name: 'React / Next.js', level: 90, color: '#61dafb' },
  { name: 'Node.js', level: 85, color: '#68a063' },
  { name: 'TypeScript', level: 80, color: '#3178c6' },
  { name: 'Tailwind CSS', level: 92, color: '#38bdf8' },
  { name: 'PostgreSQL', level: 75, color: '#336791' },
  { name: 'Docker', level: 70, color: '#2496ed' },
]

export default function AboutPage() {
  return (
    <div>
      <H1>About Me</H1>

      <MotionItem delay={0.1}>
        <p className="text-lg text-[var(--text-secondary)] mb-4 leading-relaxed">
          Hi, I&apos;m <span className="text-[var(--accent)] font-semibold">George Zhu</span> — a full-stack developer passionate about building beautiful, performant web applications.
        </p>
      </MotionItem>

      <MotionItem delay={0.15}>
        <p className="text-[var(--text-muted)] mb-12 leading-relaxed max-w-2xl">
          With a focus on modern JavaScript ecosystems, I create end-to-end solutions
          from database design to pixel-perfect UI. I believe code should be both
          elegant and accessible, and I&apos;m always exploring the intersection of
          technology and creative expression.
        </p>
      </MotionItem>

      {/* Skills Section */}
      <MotionItem delay={0.2}>
        <h2 className="font-['Clash_Display'] text-2xl font-semibold mb-6">
          Skills & Tools
        </h2>
      </MotionItem>

      <div className="space-y-4 mb-12">
        {skills.map((skill, i) => (
          <MotionItem key={skill.name} delay={0.05 * i}>
            <div className="flex items-center gap-4">
              <span className="w-28 text-sm text-[var(--text-secondary)] font-mono flex-shrink-0">
                {skill.name}
              </span>
              <div className="flex-1 h-2 rounded-full bg-[var(--bg-tertiary)] overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-1000 ease-out"
                  style={{
                    width: `${skill.level}%`,
                    backgroundColor: skill.color,
                    boxShadow: `0 0 10px ${skill.color}40`,
                  }}
                />
              </div>
              <span className="text-xs text-[var(--text-muted)] font-mono w-8 text-right">
                {skill.level}%
              </span>
            </div>
          </MotionItem>
        ))}
      </div>

      {/* Connect Section */}
      <MotionItem delay={0.5}>
        <Card className="text-center">
          <h3 className="font-['Clash_Display'] text-xl font-semibold mb-3">
            Let&apos;s Connect
          </h3>
          <p className="text-[var(--text-secondary)] mb-4 text-sm max-w-md mx-auto">
            I&apos;m always open to discussing new projects, creative ideas, or opportunities.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/about/projects"
              className="px-5 py-2 rounded-xl bg-[var(--accent)] text-white text-sm font-medium hover:shadow-lg hover:shadow-[var(--accent)]/25 transition-all duration-300 hover:-translate-y-0.5"
            >
              View Projects
            </Link>
            <a
              href="https://github.com/Guaniuzzt"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 rounded-xl border border-[var(--border-color)] text-sm font-medium text-[var(--text-secondary)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all duration-300 hover:-translate-y-0.5"
            >
              GitHub Profile
            </a>
          </div>
        </Card>
      </MotionItem>
    </div>
  )
}
