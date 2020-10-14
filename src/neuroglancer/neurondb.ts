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
import {TrackableValue, WatchableValueInterface} from 'neuroglancer/trackable_value';
import {NullarySignal} from 'neuroglancer/util/signal';
import {CompoundTrackable} from 'neuroglancer/util/trackable';
import {verifyString} from 'neuroglancer/util/json';
import {TrackableBoolean} from 'neuroglancer/trackable_boolean';



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

  dbNeuronPrefix = new TrackableValue('', verifyString,'');
  dbFindAnnotator = new TrackableValue('', verifyString,'');
  dbFindType = new TrackableValue('', verifyString,'');
  dbFindTags = new TrackableValue('', verifyString,'');
  dbFindFinished = new TrackableBoolean(false, false);
  dbFindReviewed = new TrackableBoolean(false, false);
  dbFindResult = new TrackableValue('', verifyString,'');
  dbLoadNeuronName = new TrackableValue('', verifyString,'');
  dbLoadNeuronName1 = new TrackableValue('', verifyString,'');
  dbLoadNeuronName2 = new TrackableValue('', verifyString,'');
  dbLoadNeuronName3 = new TrackableValue('', verifyString,'');
  dbLoadWithoutChildren = new TrackableBoolean(false, false);

  state = {
    dbNeuronPrefix: this.dbNeuronPrefix,
    dbFindAnnotator: this.dbFindAnnotator,
    dbFindType: this.dbFindType,
    dbFindTags: this.dbFindTags,
    dbFindFinished: this.dbFindFinished,
    dbFindReviewed: this.dbFindReviewed,
    dbFindResult: this.dbFindResult,
    dbLoadNeuronName: this.dbLoadNeuronName,
    dbLoadNeuronName1: this.dbLoadNeuronName1,
    dbLoadNeuronName2: this.dbLoadNeuronName2,
    dbLoadNeuronName3: this.dbLoadNeuronName3,
    dbLoadWithoutChildren: this.dbLoadWithoutChildren,
  };

  constructor() {
    // maybe you can add to same dictionary instead of array of dictionary
    super();
    super.add('dbNeuronPrefix', this.dbNeuronPrefix);
    super.add('dbFindAnnotator', this.dbFindAnnotator);
    super.add('dbFindType', this.dbFindType);
    super.add('dbFindTags', this.dbFindTags);
    super.add('dbFindFinished', this.dbFindFinished);
    super.add('dbFindReviewed', this.dbFindReviewed);
    super.add('dbFindResult', this.dbFindResult);
    super.add('dbLoadNeuronName', this.dbLoadNeuronName);
    super.add('dbLoadNeuronName1', this.dbLoadNeuronName1);
    super.add('dbLoadNeuronName2', this.dbLoadNeuronName2);
    super.add('dbLoadNeuronName3', this.dbLoadNeuronName3);
    super.add('dbLoadWithoutChildren', this.dbLoadWithoutChildren);
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
    super.reset();
  }

  /**
   * Returns the state of the Search DB tab as a JSON.
   */
  toJSON() {
    return super.toJSON();
  }

  restoreState(x: any) {
    if (x == null) {
      // this.reset();
      return;
    }
    try {
      this.state = x;
      super.restoreState(this.state);
      this.changed.dispatch();
    } catch(ignoredError) {
      this.reset();
    }

  }
}
