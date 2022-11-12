export const splitByEndLine = (input: string) =>
  input
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter(Boolean);
