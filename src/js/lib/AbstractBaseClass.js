export default class AbstractBaseClass {

  construct() {
    this.observers = {}
  }
  addObserver(observerFunction, type) {
    if (!(type in this.observers)) {
      this.observers[type] = []
    }
    this.observers[type].push(observerFunction)
  }

  callObservers(type) {
    if (!(type in this.observers)) {
      return false
    }
    for (let observer of this.observers[type]) {
      observer(this)
    }
  }
}