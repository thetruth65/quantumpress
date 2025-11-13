// src/logic/PriorityQueue.ts
import type { HuffmanNode } from '../types';

// A simple Priority Queue implementation using a min-heap.
export class PriorityQueue {
  private heap: HuffmanNode[] = [];

  enqueue(node: HuffmanNode): void {
    this.heap.push(node);
    this.bubbleUp();
  }

  dequeue(): HuffmanNode | undefined {
    const min = this.heap[0];
    const end = this.heap.pop();
    if (this.heap.length > 0 && end) {
      this.heap[0] = end;
      this.sinkDown();
    }
    return min;
  }

  private bubbleUp(): void {
    let index = this.heap.length - 1;
    const element = this.heap[index];
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      const parent = this.heap[parentIndex];
      if (element.frequency >= parent.frequency) break;
      this.heap[parentIndex] = element;
      this.heap[index] = parent;
      index = parentIndex;
    }
  }

  private sinkDown(): void {
    let index = 0;
    const length = this.heap.length;
    const element = this.heap[0];
    while (true) {
      const leftChildIndex = 2 * index + 1;
      const rightChildIndex = 2 * index + 2;
      let leftChild: HuffmanNode | undefined, rightChild: HuffmanNode | undefined;
      let swap: number | null = null;

      if (leftChildIndex < length) {
        leftChild = this.heap[leftChildIndex];
        if (leftChild.frequency < element.frequency) {
          swap = leftChildIndex;
        }
      }

      if (rightChildIndex < length) {
        rightChild = this.heap[rightChildIndex];
        if (
          (swap === null && rightChild.frequency < element.frequency) ||
          (swap !== null && leftChild && rightChild.frequency < leftChild.frequency)
        ) {
          swap = rightChildIndex;
        }
      }

      if (swap === null) break;
      this.heap[index] = this.heap[swap];
      this.heap[swap] = element;
      index = swap;
    }
  }

  size(): number {
    return this.heap.length;
  }
}