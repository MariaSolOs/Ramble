//For deepcloning map in availabilities
export const copyMap = (map) => {
    const copy = new Map();
    Array.from(map.keys()).forEach(key => {
        const content = map.get(key).slice(0);
        copy.set(key, content);
    });
    return copy;
}