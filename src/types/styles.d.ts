declare module '*.scss' {
  // 1.
  // const content: {[className: string]: string};
  // export = content;

  // 2.
  const content: Record<string, string>
  export default content
}

declare module '*.css' {
  const content: Record<string, string>
  export default content
}

/**
 * Reference:
 * 1. Typescript Record
 * https://developer-talk.tistory.com/296
 */
