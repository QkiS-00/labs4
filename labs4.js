class BiDirectionalPriorityQueue {
  constructor() {
    this.minHeap = [];
    this.maxHeap = [];
    this.insertCounter = 0;
    this.dequeMap = new Map(); // для oldest/newest — O(1)
    this.headIndex = 0;
    this.tailIndex = 0;
  }

  enqueue(item, priority) {
    const order = this.insertCounter++;
    const node = { item, priority, order };

    this._heapPush(this.minHeap, node, (a, b) => a.priority - b.priority);
    this._heapPush(this.maxHeap, node, (a, b) => b.priority - a.priority);

    this.dequeMap.set(this.tailIndex++, node);
  }
}