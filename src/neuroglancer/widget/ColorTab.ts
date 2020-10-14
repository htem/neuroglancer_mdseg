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
import {Color} from 'neuroglancer/color';
import {Atab} from 'neuroglancer/ui/AbstractTab';


/**
 * View for the Color tab.
 */
export class ColorTab extends Atab {

  private clSetVal = document.createElement('input');
  private clClear = document.createElement('input');
  private clNeuronColorButton = document.createElement('input');

  constructor(public transform: Color) {
    super(transform);
    const {element} = this;
    element.classList.add('neuroglancer-Color-widget');

    this.addTextArea('Color value', transform.set_color_val);
    this.addButton(this.clSetVal, 'Set color to selections', 'button', 'clSetVal');
    this.addButton(this.clClear,'Clear colors','button','clClear');
    this.addTextArea('Neuron color mapping', transform.clNeuronColor, 14, 28);
    this.addButton(this.clNeuronColorButton,'Set color','button','clNeuronColorButton');
    this.addCheckbox('Also load neurons', transform.clAlsoLoadNeurons);
    this.addCheckbox('Clear segments before load', transform.clClearBeforeLoad);
  }
}
