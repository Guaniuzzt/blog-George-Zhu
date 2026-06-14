declare module '*.mdx' {
  import type { MDXProps } from 'mdx/types'
  // @types/react 19 移除了全局 JSX 命名空间，统一使用 React.JSX
  const MDXComponent: (props: MDXProps) => React.JSX.Element
  export default MDXComponent
  export const frontmatter: import('./index').PostFrontmatter
}