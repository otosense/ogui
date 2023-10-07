export class Graph {
    private adjacencyList: Map<string, string[]>;

    constructor() {
        this.adjacencyList = new Map();
    }

    addEdge(from: string, to: string): void {
        if (!this.adjacencyList.has(from)) {
            this.adjacencyList.set(from, []);
        }
        this.adjacencyList.get(from)!.push(to);
    }

    isReachable(source: string, target: string, visited: Set<string>): boolean {
        if (visited.has(source)) {
            return false;
        }

        visited.add(source);

        if (source === target) {
            return true;
        }

        if (this.adjacencyList.has(source)) {
            const neighbors: string[] = this.adjacencyList.get(source)!;
            for (const neighbor of neighbors) {
                if (this.isReachable(neighbor, target, visited)) {
                    return true;
                }
            }
        }

        return false;
    }

    willFormCycle(u: string, v: string): boolean {
        const visited: Set<string> = new Set();
        return this.isReachable(v, u, visited);
    }
}