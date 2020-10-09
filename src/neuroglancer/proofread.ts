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
 * Model for the Proofread tab. Keeps track of the state of text boxes and checkboxes in the Proofread tab.
 */
export class Proofread extends CompoundTrackable implements WatchableValueInterface<IValue> {
  changed = new NullarySignal();

  private _value: IValue;
  // private emptyTextArea: IValue;

  constructor() {
    super();
    // maybe you can add to same dictionary instead of array of dictionary
    let textArea: IValue = {};
    textArea['prNeuronName']= '';
    textArea['prCellType']='';
    textArea['prTags']='';
    textArea['prLocTags']='';
    textArea['prUncertainCon']='';
    textArea['prMergers']='';
    textArea['prAnnotator']='';
    textArea['prNotes']='';
    textArea['prFinished']='0';
    textArea['prReviewed']='0';
    textArea['prSomaLoc']='';
    textArea['prOverrideSuperSetCheck']='0';
    textArea['prOverrideConflictCheck']='0';
    textArea['prGrowThreshold']='';
    textArea['prSuperGrowThreshold']='';

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
   textArea['prNeuronName']= '';
   textArea['prCellType']='';
   textArea['prTags']='';
   textArea['prLocTags']='';
   textArea['prUncertainCon']='';
   textArea['prMergers']='';
   textArea['prAnnotator']='';
   textArea['prNotes']='';
   textArea['prFinished']='0';
   textArea['prReviewed']='0';
   textArea['prSomaLoc']='';
   textArea['prOverrideSuperSetCheck']='0';
   textArea['prOverrideConflictCheck']='0';
   textArea['prGrowThreshold']='';
   textArea['prSuperGrowThreshold']='';
   this._value = textArea;
   this.changed.dispatch();
  }


  toJSON() {
    console.log('pr value: ' + JSON.stringify(this._value));
    let result: IValue = {};
    for(let key in this._value) {
      let label = key;
      let value = this._value[key];

      if(value !== '' &&
        label !== 'prFinished' &&
        label !== 'prReviewed' &&
        label !== 'prOverrideSuperSetCheck' &&
        label !== 'prOverrideConflictCheck' ||
          ((label === 'prFinished' && value === '1') ||
          (label === 'prReviewed' && value === '1') ||
          (label === 'prOverrideSuperSetCheck' && value === '1') ||
          (label === 'prOverrideConflictCheck' && value === '1'))) {
        result[label] = value;
      }
    }
    console.log('result in toJSON (pr): ' + JSON.stringify(result));
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
