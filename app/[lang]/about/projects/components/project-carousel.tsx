'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { projects } from '@/lib/projects-data'
import type { Locale } from '@/types'

/* ===== Project Block (thumbnail + name card) ===== */
function ProjectBlock({
  project,
  isZh,
  onClick,
}: {
  project: (typeof projects)[0]
  isZh: boolean
  onClick: () => void
}) {
  const displayName = isZh ? project.name.zh : project.name.en
  const [thumbFailed, setThumbFailed] = useState(false)

  return (
    <motion.div
      onClick={onClick}
      className="group relative flex-shrink-0 w-[280px] cursor-pointer select-none"
      whileHover={{ y: -6, scale: 1.03 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className="relative h-[180px] rounded-2xl border border-[var(--border-color)] bg-[var(--card-bg)] overflow-hidden transition-all duration-500 group-hover:border-[var(--accent)]/40 group-hover:shadow-lg">
        {/* Thumbnail */}
        {!thumbFailed && (
          <Image
            src={project.thumbnail}
            alt={displayName}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="280px"
            onError={() => setThumbFailed(true)}
          />
        )}
        {/* Gradient fallback when image fails */}
        {thumbFailed && (
          <div
            className="absolute inset-0"
            style={{ background: 'var(--gradient-1)' }}
          />
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Name label at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse-neon" />
            <h3 className="font-display font-semibold text-white text-sm tracking-wide drop-shadow-lg">
              {displayName}
            </h3>
          </div>
        </div>

        {/* Accent glow on hover */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[var(--accent)]/10 via-[var(--accent2)]/10 to-[var(--accent)]/10" />
        </div>
      </div>
    </motion.div>
  )
}

/* ===== Screenshot Item (with fallback) ===== */
function ScreenshotItem({
  src,
  alt,
  index,
  isZh,
}: {
  src: string
  alt: string
  index: number
  isZh: boolean
}) {
  const [failed, setFailed] = useState(false)

  return (
    <div className="relative aspect-video rounded-xl border border-[var(--border-color)] overflow-hidden bg-[var(--bg-tertiary)] group">
      {!failed && (
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, 50vw"
          onError={() => setFailed(true)}
        />
      )}
      {failed && (
        <div className="absolute inset-0 flex items-center justify-center text-[var(--text-muted)] text-xs font-mono bg-[var(--bg-tertiary)]">
          {isZh ? `截图 ${index + 1}` : `Screenshot ${index + 1}`}
        </div>
      )}
    </div>
  )
}

/* ===== Project Detail Modal ===== */
function ProjectDetailModal({
  project,
  isZh,
  onClose,
}: {
  project: (typeof projects)[0]
  isZh: boolean
  onClose: () => void
}) {
  const displayName = isZh ? project.name.zh : project.name.en
  const description = isZh ? project.description.zh : project.description.en

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/50 backdrop-blur-md"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Modal content */}
      <motion.div
        className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-2xl border border-[var(--border-color)] bg-[var(--bg-primary)] shadow-2xl"
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.95 }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-[var(--bg-tertiary)] border border-[var(--border-color)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--accent)] hover:border-[var(--accent)]/40 transition-all duration-300"
        >
          ✕
        </button>

        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-3 h-3 rounded-full bg-[var(--accent)] animate-pulse-neon" />
              <h2 className="font-display font-bold text-2xl text-[var(--text-primary)]">
                {displayName}
              </h2>
            </div>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              {description}
            </p>

            {/* URLs */}
            <div className="flex gap-3 mt-4">
              {project.urls.cn && (
                <Link
                  href={project.urls.cn}
                  target="_blank"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-[var(--accent-glow)] text-[var(--accent)] border border-[var(--accent)]/20 hover:bg-[var(--accent)]/20 transition-all duration-300"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                  中文站
                </Link>
              )}
              {project.urls.eng && (
                <Link
                  href={project.urls.eng}
                  target="_blank"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-[var(--accent2-glow)] text-[var(--accent2)] border border-[var(--accent2)]/20 hover:bg-[var(--accent2)]/20 transition-all duration-300"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent2)]" />
                  English Website
                </Link>
              )}
            </div>
          </div>

          {/* Functional Modules */}
          <div className="mb-8">
            <h3 className="font-display font-semibold text-lg text-[var(--text-primary)] mb-3 flex items-center gap-2">
              <span className="w-6 h-1 bg-[var(--accent)] rounded-full" />
              {isZh ? '功能模块' : 'Functional Modules'}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {project.modules.map((mod) => (
                <div
                  key={mod.en}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-sm text-[var(--text-secondary)] hover:border-[var(--accent)]/30 hover:text-[var(--text-primary)] transition-all duration-300"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent2)]" />
                  {isZh ? mod.zh : mod.en}
                </div>
              ))}
            </div>
          </div>

          {/* Screenshots */}
          {project.screenshots.length > 0 && (
            <div className="mb-8">
              <h3 className="font-display font-semibold text-lg text-[var(--text-primary)] mb-3 flex items-center gap-2">
                <span className="w-6 h-1 bg-[var(--accent2)] rounded-full" />
                {isZh ? '项目截图' : 'Screenshots'}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.screenshots.map((shot, i) => (
                  <ScreenshotItem
                    key={i}
                    src={shot}
                    alt={`${displayName} screenshot ${i + 1}`}
                    index={i}
                    isZh={isZh}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Tech Stack */}
          <div>
            <h3 className="font-display font-semibold text-lg text-[var(--text-primary)] mb-3 flex items-center gap-2">
              <span className="w-6 h-1 bg-[var(--accent)] rounded-full" />
              {isZh ? '技术栈' : 'Tech Stack'}
            </h3>
            <div className="flex flex-col gap-3">
              {project.techStack.map((tech) => (
                <div
                  key={tech.name}
                  className="group/item flex gap-3 p-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] hover:border-[var(--accent)]/30 transition-all duration-300"
                >
                  <span className="tag flex-shrink-0 self-start">{tech.name}</span>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed group-hover/item:text-[var(--text-primary)] transition-colors duration-300">
                    {isZh ? tech.description.zh : tech.description.en}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ===== Main Carousel Component ===== */
interface ProjectCarouselProps {
  lang: Locale
}

export default function ProjectCarousel({ lang }: ProjectCarouselProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [isPaused, setIsPaused] = useState(false)

  const isZh = lang === 'zh'
  const selected = projects.find((p) => p.id === selectedId)

  const handleSelect = useCallback((id: string) => {
    setIsPaused(true)
    setSelectedId(id)
  }, [])

  const handleClose = useCallback(() => {
    setSelectedId(null)
    setIsPaused(false)
  }, [])

  return (
    <div>
      {/* Carousel Section */}
      <div
        className="relative overflow-hidden py-4"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => !selectedId && setIsPaused(false)}
      >
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-r from-[var(--bg-primary)] to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-l from-[var(--bg-primary)] to-transparent pointer-events-none" />

        {/* Scrolling track */}
        <div
          className={`flex gap-6 ${
            isPaused ? '[animation-play-state:paused]' : ''
          } animate-[marquee_30s_linear_infinite]`}
        >
          {/* Original items */}
          {projects.map((project) => (
            <ProjectBlock
              key={project.id}
              project={project}
              isZh={isZh}
              onClick={() => handleSelect(project.id)}
            />
          ))}
          {/* Duplicated items for seamless loop */}
          {projects.map((project) => (
            <ProjectBlock
              key={`dup-${project.id}`}
              project={project}
              isZh={isZh}
              onClick={() => handleSelect(project.id)}
            />
          ))}
        </div>
      </div>

      {/* Instruction text */}
      <p className="text-center text-sm text-[var(--text-muted)] mt-2 font-mono">
        {isZh ? '← 点击项目查看详情 →' : '← Click a project to see details →'}
      </p>

      {/* Detail Modal */}
      <AnimatePresence>
        {selected && (
          <ProjectDetailModal
            project={selected}
            isZh={isZh}
            onClose={handleClose}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
