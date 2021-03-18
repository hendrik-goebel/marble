export let Observable = {
  observers: {},

  addObserver(observerFunction, type) {
    if (!(type in this.observers)) {
      this.observers[type] = []
    }
    this.observers[type].push(observerFunction)
  },

  callObservers(type, object) {
    if (!(type in this.observers)) {
      return false
    }
    for (let observer of this.observers[type]) {
      observer(object)
    }
  }
}