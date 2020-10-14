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
import {CompoundTrackable} from 'neuroglancer/util/trackable';
import {verifyString} from 'neuroglancer/util/json';
import {TrackableBoolean} from 'neuroglancer/trackable_boolean';


/**
 * Model for the Proofread tab. Keeps track of the state of text boxes and checkboxes in the Proofread tab.
 */
export class Proofread extends CompoundTrackable {
  changed = new NullarySignal();

  prNeuronName = new TrackableValue('', verifyString,'');
  prCellType = new TrackableValue('', verifyString,'');
  prTags = new TrackableValue('', verifyString,'');
  prLocTags = new TrackableValue('', verifyString,'');
  prUncertainCon = new TrackableValue('', verifyString,'');
  prMergers = new TrackableValue('', verifyString,'');
  prAnnotator = new TrackableValue('', verifyString,'');
  prNotes = new TrackableValue('', verifyString,'');
  prFinished = new TrackableBoolean(false, false);
  prReviewed = new TrackableBoolean(false, false);
  prSomaLoc = new TrackableValue('', verifyString,'');
  prOverrideSuperSetCheck = new TrackableBoolean(false, false);
  prOverrideConflictCheck = new TrackableBoolean(false, false);
  prGrowThreshold = new TrackableValue('', verifyString,'');
  prSuperGrowThreshold = new TrackableValue('', verifyString,'');

  state = {
    prNeuronName: this.prNeuronName,
    prCellType: this.prCellType,
    prTags: this.prTags,
    prLocTags: this.prLocTags,
    prUncertainCon: this.prUncertainCon,
    prMergers: this.prMergers,
    prAnnotator: this.prAnnotator,
    prNotes: this.prNotes,
    prFinished: this.prFinished,
    prReviewed: this.prReviewed,
    prSomaLoc: this.prSomaLoc,
    prOverrideSuperSetCheck: this.prOverrideSuperSetCheck,
    prOverrideConflictCheck: this.prOverrideConflictCheck,
    prGrowThreshold: this.prGrowThreshold,
    prSuperGrowThreshold: this.prSuperGrowThreshold,
  };


  constructor() {
    super();
    super.add('prNeuronName', this.prNeuronName);
    super.add('prCellType', this.prCellType);
    super.add('prTags', this.prTags);
    super.add('prLocTags', this.prLocTags);
    super.add('prUncertainCon', this.prUncertainCon);
    super.add('prMergers', this.prMergers);
    super.add('prAnnotator', this.prAnnotator);
    super.add('prNotes', this.prNotes);
    super.add('prFinished', this.prFinished);
    super.add('prReviewed', this.prReviewed);
    super.add('prSomaLoc', this.prSomaLoc);
    super.add('prOverrideSuperSetCheck', this.prOverrideSuperSetCheck);
    super.add('prOverrideConflictCheck', this.prOverrideConflictCheck);
    super.add('prGrowThreshold', this.prGrowThreshold);
    super.add('prSuperGrowThreshold', this.prSuperGrowThreshold);
  }

  /**
   * Resets all values to their default values.
   */
  reset() {
    super.reset();
  }

  /**
   * Returns the state of the Proofread tab as a JSON.
   */
  toJSON() {
    return super.toJSON();
  }

  /**
   * Restores the state of the Proofread tab to the provided state.
   * @param x The state in which to restore the Proofread tab state to.
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
