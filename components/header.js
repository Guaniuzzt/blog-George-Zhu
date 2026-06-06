import Navigation from "./navigation"
import Link from "next/link"
import DarkMode from "./dark-mode"
import useServerDarkMode from "@/hooks/use-server-dark-mode"

export default function Header() {
  const theme = useServerDarkMode()
  return (
    <header className="flex justify-between md:items-center mt-4">
      <div className="flex items-center md:space-x-12">
        <div className="hidden md:block">
          <Link href="/" className="text-xl">George Zhu</Link>
        </div>
        <Navigation />
      </div>
      <div>
        <DarkMode defaultTheme={theme} />
      </div>
    </header>
  )
}