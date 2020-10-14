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
import {TrackableValue} from 'neuroglancer/trackable_value';
import {NullarySignal} from 'neuroglancer/util/signal';
import {TrackableBoolean} from 'neuroglancer/trackable_boolean';
import {CompoundTrackable} from 'neuroglancer/util/trackable';
import {verifyString} from 'neuroglancer/util/json';





/**
 * Model for the Color tab. Keeps track of the state of text boxes and checkboxes in the Color tab.
 */
export class Color extends CompoundTrackable {
  changed = new NullarySignal();

  set_color_val = new TrackableValue('', verifyString,'');
  clNeuronColor = new TrackableValue('', verifyString,'');
  clClearBeforeLoad = new TrackableBoolean(false, false);
  clAlsoLoadNeurons = new TrackableBoolean(false, false);


  state = {
    set_color_val: this.set_color_val,
    clNeuronColor: this.clNeuronColor,
    clClearBeforeLoad: this.clClearBeforeLoad,
    clAlsoLoadNeurons: this.clAlsoLoadNeurons
  };


  constructor() {
    super();
    super.add('set_color_val', this.state.set_color_val);
    super.add('clNeuronColor', this.state.clNeuronColor);
    super.add('clClearBeforeLoad', this.state.clClearBeforeLoad);
    super.add('clAlsoLoadNeurons', this.state.clAlsoLoadNeurons);
  }

  /**
   * Resets all values to their default values.
   */
  reset() {
    super.reset();
  }

  /**
   * Returns the state of the Color tab as a JSON.
   */
  toJSON() {
    return super.toJSON();
  }

  /**
   * Restores the state of the Color tab to the provided state.
   * @param x The state in which to restore the Color tab state to.
   */
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
