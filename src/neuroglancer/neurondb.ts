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
import {CompoundTrackable} from 'neuroglancer/util/trackable';



export interface IValue {
  [details: string]: string;
}

/**
 * Model for the Search DB tab. Keeps track of the state of text boxes and checkboxes in the Search DB tab.
 */
export class Neurondb extends CompoundTrackable implements WatchableValueInterface<IValue> {
  changed = new NullarySignal();
  private _value: IValue;
  // private emptyTextArea: IValue;

  constructor() {
    // maybe you can add to same dictionary instead of array of dictionary
    super();
    console.log('constructing new neurondb');
    let textArea: IValue = {};
    textArea['dbNeuronPrefix']= '';
    textArea['dbFindAnnotator']='';
    textArea['dbFindType']='';
    textArea['dbFindTags']='';
    textArea['dbFindFinished']='0';
    textArea['dbFindReviewed']='0';
    textArea['dbFindResult']='';
    textArea['dbLoadNeuronName']='';
    textArea['dbLoadNeuronName1']='';
    textArea['dbLoadNeuronName2']='';
    textArea['dbLoadNeuronName3']='';
    textArea['dbLoadWithoutChildren']='0';

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
   let textArea: IValue = {};
   textArea['dbNeuronPrefix']= '';
   textArea['dbFindAnnotator']='';
   textArea['dbFindType']='';
   textArea['dbFindTags']='';
   textArea['dbFindFinished']='0';
   textArea['dbFindReviewed']='0';
   textArea['dbFindResult']='';
   textArea['dbLoadNeuronName']='';
   textArea['dbLoadNeuronName1']='';
   textArea['dbLoadNeuronName2']='';
   textArea['dbLoadNeuronName3']='';
   textArea['dbLoadWithoutChildren']='0';
   this._value = textArea;
   this.changed.dispatch();
  }

  /**
   * Returns the state of the Search DB tab as a JSON.
   */
  toJSON() {
    let result: IValue = {};
    for(let key in this._value) {
      let label = key;
      let value = this._value[key];

      if(value !== '' &&
          label !== 'dbFindFinished' &&
          label !== 'dbFindReviewed' &&
          label !== 'dbLoadWithoutChildren' ||
          ((label === 'dbFindFinished' && value === '1') ||
              (label === 'dbFindReviewed' && value === '1') ||
              (label === 'dbLoadWithoutChildren' && value === '1'))) {
        result[label] = value;
      }
    }
    return result;

    // if(JSON.stringify(this._value) === JSON.stringify(this.emptyTextArea)) {
    //   return {};
    // } else {
    //   return this._value;
    // }
    // return this._value;
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
