export function createScopedClassNames(scope: string): Record<string, string> {
  return new Proxy({}, {
    get: (_target, property) => `${scope}__${String(property)}`,
  }) as Record<string, string>;
}
