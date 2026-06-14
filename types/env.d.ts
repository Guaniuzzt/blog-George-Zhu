declare module '*.png' {
  const content: import('next/dist/shared/lib/image-external').StaticImageData
  export default content
}

declare module '*.jpg' {
  const content: import('next/dist/shared/lib/image-external').StaticImageData
  export default content
}

declare module '*.svg' {
  const content: import('next/dist/shared/lib/image-external').StaticImageData
  export default content
}

declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_SUPABASE_URL?: string
    NEXT_PUBLIC_SUPABASE_ANON_KEY?: string
    DATABASE_URL?: string
    GITHUB_TOKEN?: string
  }
}