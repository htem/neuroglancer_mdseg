/**
 * @license
 * Copyright 2016 Google Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import {WatchableValueInterface} from 'neuroglancer/trackable_value';
import {NullarySignal} from 'neuroglancer/util/signal';
import {TrackableBoolean} from 'neuroglancer/trackable_boolean';
import {CompoundTrackable} from 'neuroglancer/util/trackable';




export interface IValue {
  [details: string]: string;
}

/**
 * Model for the Color tab. Keeps track of the state of text boxes and checkboxes in the Color tab.
 */
export class Color extends CompoundTrackable implements WatchableValueInterface<IValue> {
  changed = new NullarySignal();

  clClearBeforeLoad = new TrackableBoolean(false, false);
  clAlsoLoadNeurons = new TrackableBoolean(false, false);


  private _value: IValue;
  // private emptyTextArea: IValue;

  constructor() {
    super();
    console.log('constructing new color model');
    super.add('clClearBeforeLoad', this.clClearBeforeLoad);
    super.add('clAlsoLoadNeurons', this.clAlsoLoadNeurons);


    // maybe you can add to same dictionary instead of array of dictionary
    // let textArea: IValue = {};
    // textArea['set_color_val']='';
    // textArea['clNeuronColor']='';
    // textArea['clAlsoLoadNeurons']='0';
    // textArea['clClearBeforeLoad']='0';
    //
    // this._value =textArea;
    // this.emptyTextArea = textArea;
  }

  /**
   * Getter for _value.
   */
  get value() {
    return this._value;
  }

  /**
   * Resets all values to either an empty string or 0.
   */
  reset() {
   // let empty: IValue = {};
   //
   // empty['set_color_val']='';
   // empty['clNeuronColor']='';
   // empty['clAlsoLoadNeurons']='0';
   // empty['clClearBeforeLoad']='0';
   // this._value = empty;
   // this.changed.dispatch();
    super.reset();
  }

  /**
   * Returns the state of the Color tab as a JSON.
   */
  toJSON() {
    console.log('color value: ' + JSON.stringify(this._value));
    console.log('compund trackable children (super): ' + JSON.stringify(super.children));
    console.log('compund trackable children (this): ' + this.children);

    // let result: IValue = {};
    // for(let key in this._value) {
    //   let label = key;
    //   let value = this._value[key];
    //
    //   if(value !== '' &&
    //       label !== 'clAlsoLoadNeurons' &&
    //       label !== 'clClearBeforeLoad' ||
    //       ((label === 'clAlsoLoadNeurons' && value === '1') ||
    //           (label === 'clClearBeforeLoad' && value === '1'))) {
    //     result[label] = value;
    //   }
    // }
    // console.log('result in toJSON (color): ' + JSON.stringify(result));
    // return result;

    // if(JSON.stringify(this._value) === JSON.stringify(this.emptyTextArea)) {
    //   return {};
    // } else {
    //   return this._value;
    // }
    // return this._value;

    return super.toJSON();
  }


  // addCheckbox = (label: string, value: TrackableBoolean) => {
  //   const div_inpArea = document.createElement('DIV');
  //   div_inpArea.setAttribute('align','right');
  //   const labelElement = document.createElement('label');
  //   labelElement.textContent = label;
  //   const checkbox = this.registerDisposer(new TrackableBooleanCheckbox(value));
  //   labelElement.appendChild(checkbox.element);
  //   div_inpArea.appendChild(labelElement);
  // }

  restoreState(x: any) {
    console.log('color restoreState called');
    super.restoreState(x);
    // if (x == null) {
    //   this.reset();
    //   return;
    // }
    //
    // try {
    //   this.children = x;
    //   this.changed.dispatch();
    // } catch(ignoredError) {
    //   this.reset();
    // }

  }
}
