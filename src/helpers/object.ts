export function isObject(target: unknown): boolean {
    return target && typeof target === 'object' && !Array.isArray(target);
}
