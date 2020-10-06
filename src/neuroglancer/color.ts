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




export interface IValue {
  [details: string]: string;
}

/**
 * Model for the Color tab. Keeps track of the state of text boxes and checkboxes in the Color tab.
 */
export class Color implements WatchableValueInterface<IValue> {
  changed = new NullarySignal();

  private _value: IValue;
  // private emptyTextArea: IValue;

  constructor() {
    // maybe you can add to same dictionary instead of array of dictionary
    let textArea: IValue = {};
    textArea['set_color_val']='';
    textArea['clNeuronColor']='';
    textArea['clAlsoLoadNeurons']='0';
    textArea['clClearBeforeLoad']='0';

    this._value =textArea;
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
   let empty: IValue = {};

   empty['set_color_val']='';
   empty['clNeuronColor']='';
   empty['clAlsoLoadNeurons']='0';
   empty['clClearBeforeLoad']='0';
   this._value = empty;
   this.changed.dispatch();
  }

  /**
   * Returns the state of the Color tab as a JSON.
   */
  toJSON() {
    // if(JSON.stringify(this._value) === JSON.stringify(this.emptyTextArea)) {
    //   return {};
    // } else {
    //   return this._value;
    // }
    return this._value;
  }

  restoreState(x: IValue) {
    if (x == null) {
      this.reset();
      return;
    }

    try {
      this._value = x;
      this.changed.dispatch();
    } catch(ignoredError) {
      this.reset();
    }

  }
}
