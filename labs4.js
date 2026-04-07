class BiDirectionalPriorityQueue {
    constructor() {
        this.queue = [];
    }

    enqueue(item, priority) {
        const element = {
            item,
            priority,
            addedAt: Date.now()
        };
        this.queue.push(element);
    }

    dequeue(type) {
        if (this.queue.length === 0) return null;

        let targetIndex = 0;

        if (type === 'highest') {
            for (let i = 1; i < this.queue.length; i++) {
                if (this.queue[i].priority > this.queue[targetIndex].priority) {
                    targetIndex = i;
                }
            }
        } else if (type === 'lowest') {
            for (let i = 1; i < this.queue.length; i++) {
                if (this.queue[i].priority < this.queue[targetIndex].priority) {
                    targetIndex = i;
                }
            }
        } else if (type === 'oldest') {
            for (let i = 1; i < this.queue.length; i++) {
                if (this.queue[i].addedAt < this.queue[targetIndex].addedAt) {
                    targetIndex = i;
                }
            }
        } else if (type === 'newest') {
            for (let i = 1; i < this.queue.length; i++) {
                if (this.queue[i].addedAt > this.queue[targetIndex].addedAt) {
                    targetIndex = i;
                }
            }
        }

        const removed = this.queue.splice(targetIndex, 1);
        return removed[0];
    }

    peek(type) {
        if (this.queue.length === 0) return null;

        let targetIndex = 0;

        if (type === 'highest') {
            for (let i = 1; i < this.queue.length; i++) {
                if (this.queue[i].priority > this.queue[targetIndex].priority) {
                    targetIndex = i;
                }
            }
        } else if (type === 'lowest') {
            for (let i = 1; i < this.queue.length; i++) {
                if (this.queue[i].priority < this.queue[targetIndex].priority) {
                    targetIndex = i;
                }
            }
        } else if (type === 'oldest') {
            for (let i = 1; i < this.queue.length; i++) {
                if (this.queue[i].addedAt < this.queue[targetIndex].addedAt) {
                    targetIndex = i;
                }
            }
        } else if (type === 'newest') {
            for (let i = 1; i < this.queue.length; i++) {
                if (this.queue[i].addedAt > this.queue[targetIndex].addedAt) {
                    targetIndex = i;
                }
            }
        }

        return this.queue[targetIndex];
    }
}