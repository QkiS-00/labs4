class BiDirectionalPriorityQueue {
    constructor() {
        this.queue = [];
    }

    enqueue(item, priority) {
        this.queue.push({ item, priority });
    }

    dequeue(type) {
        if (this.queue.length === 0) return null;

        let targetIndex = 0;

        if (type === 'highest' || type === 'lowest') {
            for (let i = 1; i < this.queue.length; i++) {
                const condition = type === 'highest' 
                    ? this.queue[i].priority > this.queue[targetIndex].priority
                    : this.queue[i].priority < this.queue[targetIndex].priority;
                if (condition) targetIndex = i;
            }
        } else if (type === 'oldest') {
            targetIndex = 0;
        } else if (type === 'newest') {
            targetIndex = this.queue.length - 1;
        }

        const removed = this.queue.splice(targetIndex, 1);
        return removed[0];
    }

    peek(type) {
        if (this.queue.length === 0) return null;

        if (type === 'oldest') return this.queue[0];
        if (type === 'newest') return this.queue[this.queue.length - 1];

        let found = this.queue[0];
        for (let i = 1; i < this.queue.length; i++) {
            const condition = type === 'highest' 
                ? this.queue[i].priority > found.priority
                : this.queue[i].priority < found.priority;
            if (condition) found = this.queue[i];
        }
        return found;
    }
}