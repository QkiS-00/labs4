class BiDirectionalPriorityQueue {
  constructor() {
    this.minHeap = [];
    this.maxHeap = [];
    this.insertCounter = 0;
    this.dequeMap = new Map();
    this.headIndex = 0;
    this.tailIndex = 0;
    this.deletedOrders = new Set();
  }

  enqueue(item, priority) {
    const order = this.insertCounter++;
    const node = { item, priority, order };
    this._heapPush(this.minHeap, node, (a, b) => a.priority - b.priority);
    this._heapPush(this.maxHeap, node, (a, b) => b.priority - a.priority);
    this.dequeMap.set(this.tailIndex++, node);
  }

  dequeue(type) {
    if (this.dequeMap.size === 0) return null;

    if (type === 'oldest') {
      while (
        this.headIndex < this.tailIndex &&
        this.deletedOrders.has(this.dequeMap.get(this.headIndex)?.order)
      ) {
        this.dequeMap.delete(this.headIndex++);
      }
      const node = this.dequeMap.get(this.headIndex);
      if (!node) return null;
      this.deletedOrders.add(node.order);
      this.dequeMap.delete(this.headIndex++);
      return node;
    }

    if (type === 'newest') {
      while (
        this.tailIndex > this.headIndex &&
        this.deletedOrders.has(this.dequeMap.get(this.tailIndex - 1)?.order)
      ) {
        this.dequeMap.delete(--this.tailIndex);
      }
      const node = this.dequeMap.get(this.tailIndex - 1);
      if (!node) return null;
      this.deletedOrders.add(node.order);
      this.dequeMap.delete(--this.tailIndex);
      return node;
    }

    if (type === 'highest') {
      return this._heapPopSkipDeleted(
        this.maxHeap,
        (a, b) => b.priority - a.priority
      );
    }

    if (type === 'lowest') {
      return this._heapPopSkipDeleted(
        this.minHeap,
        (a, b) => a.priority - b.priority
      );
    }

    return null;
  }

  peek(type) {
    if (this.dequeMap.size === 0) return null;
    if (type === 'oldest') return this.dequeMap.get(this.headIndex) ?? null;
    if (type === 'newest') return this.dequeMap.get(this.tailIndex - 1) ?? null;
    if (type === 'highest') return this.maxHeap[0] ?? null;
    if (type === 'lowest') return this.minHeap[0] ?? null;
    return null;
  }

  _heapPopSkipDeleted(heap, compareFn) {
    while (heap.length > 0) {
      const node = this._heapPop(heap, compareFn);
      if (!node) return null;
      if (!this.deletedOrders.has(node.order)) {
        this.deletedOrders.add(node.order);
        for (const [k, v] of this.dequeMap.entries()) {
          if (v.order === node.order) {
            this.dequeMap.delete(k);
            break;
          }
        }
        return node;
      }
    }
    return null;
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

get size() {
    return this.dequeMap.size;
  }
}