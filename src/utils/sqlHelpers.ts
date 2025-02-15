export function replaceNamedParams(query: string, params: Record<string, unknown>): { text: string; values: unknown[] } {
    const values: unknown[] = [];
    const text = query.replace(/:(\w+)/g, (match, key) => {
        if (!(key in params)) {
        throw new Error(`Missing parameter: ${key}`);
        }
        values.push(params[key]);
        return `$${values.length}`;
    });
    return { text, values };
}