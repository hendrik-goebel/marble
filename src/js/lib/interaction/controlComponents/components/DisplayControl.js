import BaseComponent from './BaseComponent.js';

/**
 * Displays a property od the state class
 */
export default class DisplayControl extends BaseComponent {

  constructor(elementId, stateProperty) {
    super();
    this.elementId = elementId
  }
}