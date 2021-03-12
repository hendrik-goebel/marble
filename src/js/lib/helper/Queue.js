export default class Queue {

  constructor(items) {
    this.items = items
  }

  enqueue(item) {
    return this.items.push(item)
  }

  dequeue() {
    return this.items.shift()
  }

  toArray() {
    return this.items
  }
}