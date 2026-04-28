class BiDirectionalPriorityQueue {
  constructor() {
    this.minHeap = [];
    this.maxHeap = [];
    this.insertCounter = 0;
    this.dequeMap = new Map();
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

  _heapPush(heap, node, compareFn) {
    heap.push(node);
    let i = heap.length - 1;
    while (i > 0) {
      const parent = Math.floor((i - 1) / 2);
      if (compareFn(heap[i], heap[parent]) < 0) {
        [heap[i], heap[parent]] = [heap[parent], heap[i]];
        i = parent;
      } else {
        break;
      }
    }
  }

  _heapPop(heap, compareFn) {
    if (heap.length === 0) return null;
    const top = heap[0];
    const last = heap.pop();
    if (heap.length > 0) {
      heap[0] = last;
      this._siftDown(heap, 0, compareFn);
    }
    return top;
  }

  _siftDown(heap, i, compareFn) {
    const n = heap.length;
    while (true) {
      let best = i;
      const left = 2 * i + 1;
      const right = 2 * i + 2;
      if (left < n && compareFn(heap[left], heap[best]) < 0) best = left;
      if (right < n && compareFn(heap[right], heap[best]) < 0) best = right;
      if (best === i) break;
      [heap[i], heap[best]] = [heap[best], heap[i]];
      i = best;
    }
  }
}