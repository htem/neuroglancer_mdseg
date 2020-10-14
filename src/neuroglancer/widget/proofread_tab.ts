/**
 * @license
 * Copyright 2018 Google Inc.
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

/**
 * @file Tab for updating a coordinate transform.
 */

import './coordinate_transform.css';
import {Atab} from 'neuroglancer/ui/AbstractTab';
import {Proofread} from 'neuroglancer/proofread';


/**
 * View for the Proofread tab.
 */
export class ProofreadTab extends Atab {

  private prSomaLocCopyLoc = document.createElement('input');
  private prSaveNeuron = document.createElement('input');



  constructor(public transform: Proofread) {
    super(transform);
    const {element} = this;
    element.classList.add('neuroglancer-Proofread-widget');

    this.addTextArea('Neuron Name', transform.prNeuronName, 2);
    this.addTextArea('Cell Type', transform.prCellType);
    this.addTextArea('Tags', transform.prTags);
    this.addTextArea('Location Tags', transform.prLocTags, 2);
    this.addTextArea('Uncertain Continuation', transform.prUncertainCon, 4);
    this.addTextArea('Merge Locations', transform.prMergers, 4);
    this.addTextArea('Notes', transform.prNotes, 8, 28);
    this.addTextArea('Grow Threshold', transform.prGrowThreshold);
    this.addTextArea('Super Grow Threshold', transform.prSuperGrowThreshold);
    this.addCheckbox('Finished', transform.prFinished);
    this.addCheckbox('Reviewed', transform.prReviewed);
    this.addTextArea('Soma Location', transform.prSomaLoc);
    this.addInputElement(this.prSomaLocCopyLoc, 'Copy Location', 'button', 'prSomaLocCopyLoc');
    this.addCheckbox('Override Set Check', transform.prOverrideSuperSetCheck);
    this.addCheckbox('Override Conflict Check', transform.prOverrideConflictCheck);
    this.addTextArea('Annotator', transform.prAnnotator);
    this.addInputElement(this.prSaveNeuron, 'Save Neuron', 'button', 'prSaveNeuron');
  }

  /**
   * Uses the values in the text boxes and checkboxes to update the model for the Proofread tab.
   */
  updateModel() {
    // try {
    //   for (let key in this.transform.value) {
    //     let field = this.m.get(key)!;
    //     if(field.nodeName === 'TEXTAREA') {
    //       this.transform.value[key]= (<HTMLTextAreaElement>field).value;
    //     } else if(field.nodeName === 'INPUT' && (<HTMLInputElement>field).type === 'checkbox') {
    //
    //       if((<HTMLInputElement>field).checked) {
    //         this.transform.value[key] = '1';
    //       } else {
    //         this.transform.value[key] = '0';
    //       }
    //     }
    //   }
    //   this.transform.changed.dispatch();
    // } catch {
    //   this.updateView();
    // }
  }
}
