

import {Tab} from 'neuroglancer/widget/tab_view';
import {CompoundTrackable} from 'neuroglancer/util/trackable';
import {TrackableBoolean, TrackableBooleanCheckbox} from 'neuroglancer/trackable_boolean';
import {TrackableValue} from 'neuroglancer/trackable_value';
import {StringInputWidget} from 'neuroglancer/widget/string_input_widget';


/**
 * Represents a tab for Proofread, Search DB, and Color.
 */
export abstract class Atab extends Tab {

  constructor(public model: CompoundTrackable) {
    super();
  }

  /**
   * Adds an HTML button element to the tab.
   * @param inp the HTML input element to add.
   * @param title The title of the input element.
   * @param type The type of input element to add.
   * @param id The id the of input element.
   */
  addButton(inp:HTMLInputElement, title:string, type:string, id?:string) {
    const linebreak = document.createElement('br');
    const input = inp;
    const div_inpArea = document.createElement('DIV');
    div_inpArea.setAttribute('align','right');
    input.type = type;

    input.name = title;
    input.value = title;
    input.textContent = title;
    input.title = title;
    div_inpArea.appendChild(input);
    div_inpArea.appendChild(linebreak);
    div_inpArea.appendChild(linebreak);
    this.element.appendChild(div_inpArea);

    if(id) {
      input.id= id;
    }

    input.addEventListener('mousedown',()=> {
      document.dispatchEvent(new Event(input.id));
    });
  }


  /**
   * Adds a Trackable Boolean Checkbox to the tab.
   * @param label The label for the checkbox.
   * @param value The Trackable Boolean object to add.
   */
  addCheckbox(label: string, value: TrackableBoolean) {
    const linebreak = document.createElement('br');
    const div_inpArea = document.createElement('DIV');
    div_inpArea.setAttribute('align','right');

    const labelElement = document.createElement('label');
    labelElement.textContent = label;

    const checkbox = this.registerDisposer(new TrackableBooleanCheckbox(value));
    labelElement.appendChild(checkbox.element);
    div_inpArea.appendChild(labelElement);
    div_inpArea.appendChild(linebreak);
    div_inpArea.appendChild(linebreak);
    this.element.appendChild(div_inpArea);
  }


  /**
   * Adds a String Input Widget to the tab.
   * @param label The label for the text area.
   * @param value The Trackable Value to add.
   * @param rows The height of the text area.
   * @param cols The width of the text area.
   */
  addTextArea(label: string, value: TrackableValue<string>, rows:number=1, cols:number=24) {
    const div_textArea = document.createElement('DIV');
    div_textArea.setAttribute('align','right');

    const labelElement = document.createElement('H3');
    labelElement.textContent = label;
    labelElement.style.padding = '0';
    labelElement.style.margin='0';

    const inputField = this.registerDisposer(new StringInputWidget(value, rows, cols));
    div_textArea.appendChild(labelElement);
    div_textArea.appendChild(inputField.element);
    this.element.appendChild(div_textArea);
  }

 // public abstract updateModel():void ;
 // public abstract updateView():void;
}
