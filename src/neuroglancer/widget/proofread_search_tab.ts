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
import {Neurondb} from 'neuroglancer/neurondb';

/**
 * View for the Search DB tab.
 */
export class ProofreadSearchTab extends Atab {

  private dbSearchButton = document.createElement('input');
  private dbLoadNeuronNameButton = document.createElement('input');
  private dbLoadNeuronNameButton1 = document.createElement('input');
  private dbLoadNeuronNameButton2 = document.createElement('input');
  private dbLoadNeuronNameButton3 = document.createElement('input');

  constructor(public transform: Neurondb) {
    super(transform);
    const {element} = this;
    element.classList.add('neuroglancer-Proofread-widget');

    this.addTextArea('Prefix', transform.dbNeuronPrefix);
    this.addTextArea('Annotator', transform.dbFindAnnotator);
    this.addTextArea('Type', transform.dbFindType);
    this.addTextArea('Tags', transform.dbFindTags);
    this.addCheckbox('Finished', transform.dbFindFinished);
    this.addCheckbox('Reviewed', transform.dbFindReviewed);

    this.addInputElement(this.dbSearchButton,'Search','button','dbSearchButton');
    this.addTextArea('Result', transform.dbFindResult, 14, 28);

    this.addTextArea('Load Neuron', transform.dbLoadNeuronName);
    this.addInputElement(this.dbLoadNeuronNameButton,'Load','button','dbLoadNeuronNameButton');

    this.addTextArea('', transform.dbLoadNeuronName1);
    this.addInputElement(this.dbLoadNeuronNameButton1,'Load','button','dbLoadNeuronNameButton1');

    this.addTextArea('', transform.dbLoadNeuronName2);
    this.addInputElement(this.dbLoadNeuronNameButton2,'Load','button','dbLoadNeuronNameButton2');

    this.addTextArea('', transform.dbLoadNeuronName3);
    this.addInputElement(this.dbLoadNeuronNameButton3,'Load','button','dbLoadNeuronNameButton3');

    this.addCheckbox('Load without children', transform.dbLoadWithoutChildren);

  }


  /**
   * Uses the values in the text boxes and checkboxes to update the model for the Search DB tab.
   */
  updateModel() {
  // try {
  //     for (let key in this.transform.value) {
  //       let field = this.m.get(key)!;
  //       field.id = key;
  //       if(field.nodeName === 'TEXTAREA') {
  //         this.transform.value[key]= (<HTMLTextAreaElement>field).value;
  //       } else if(field.nodeName === 'INPUT' && (<HTMLInputElement>field).type === 'checkbox') {
  //
  //         if((<HTMLInputElement>field).checked) {
  //           this.transform.value[key] = '1';
  //           } else {
  //           this.transform.value[key] = '0';
  //           }
  //       }
  //     }
  //     this.transform.changed.dispatch();
  //   } catch {
  //     this.updateView();
  //   }
  }
}
