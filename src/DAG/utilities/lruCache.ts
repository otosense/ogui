export class LRUCache<K, V> {
    private capacity: number;
    private cache: Map<K, V>;

    constructor(capacity: number) {
        this.capacity = capacity;
        this.cache = new Map<K, V>();
    }

    get(key: K): V | undefined {
        if (this.cache.has(key)) {
            // Cache hit, move the item to the end to indicate it was recently used
            const value = this.cache.get(key)!;
            this.cache.delete(key);
            this.cache.set(key, value);
            return value;
        }
        // Cache miss
        return undefined;
    }

    set(key: K, value: V): void {
        if (this.cache.has(key)) {
            // If the key is already in the cache, update its value and move it to the end
            this.cache.delete(key);
        } else if (this.cache.size >= this.capacity) {
            // If the cache is full, remove the least recently used item (first item in the map)
            const iterator = this.cache.keys();
            const firstKey = iterator.next().value;
            if (firstKey !== undefined) {
                this.cache.delete(firstKey);
            }
        }
        // Add the new item to the cache
        this.cache.set(key, value);
    }
}
