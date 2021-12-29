export default class BaseComponent
{
  constructor(elementId) {

    if (!elementId) {
      console.warn('Element Id is not set.')
    }
  }
}