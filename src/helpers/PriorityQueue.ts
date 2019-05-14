export interface QueueElement<T> {
    value: T;
    priority: number;
}

/**
 * @T Type of the objects to enqueue
 */
export default class PriorityQueue<T> {
    private _elements: QueueElement<T>[] = [];

    public enqueue(value: T, priority: number): void {
        this._elements.push({
            value,
            priority
        });

        this._elements.sort((a, b) => {
            if (a.priority > b.priority) return 1;
            if (a.priority < b.priority) return -1;
            return 0;
        });
    }

    public dequeue(): T {
        return this._elements[0] && this._elements.shift().value;
    }

    public removeAll(): void {
        this._elements = [];
    }

    public isEmpty(): boolean {
        return this._elements.length === 0;
    }
}