declare module '*.mdx' {
  import type { MDXProps } from 'mdx/types';
  let MDXComponent: (props: MDXProps) => JSX.Element;
  export default MDXComponent;
  export const frontmatter: import('./index').PostFrontmatter;
}