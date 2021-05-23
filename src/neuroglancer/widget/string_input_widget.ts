/**
 * @license
 * Copyright 2017 Google Inc.
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

import {TrackableValue, WatchableValue} from 'neuroglancer/trackable_value';
import {RefCounted} from 'neuroglancer/util/disposable';
import {removeFromParent} from 'neuroglancer/util/dom';

export class StringInputWidget extends RefCounted {
  element = document.createElement('label');
  inputElement = document.createElement('textarea');
  validator: (x: string) => string;

  constructor(public model: WatchableValue<string>, rows: number, cols: number, options: {
    validator?: (x: string) => string,
    label?: string
  } = {}) {
    super();
    let {validator, label} = options;
    const {element, inputElement} = this;
    if (validator === undefined) {
      if (model instanceof TrackableValue) {
        validator = model.validator;
      } else {
        validator = x => x;
      }
    }
    this.validator = validator;
    if (label !== undefined) {
      element.textContent = label;
    }
    element.appendChild(inputElement);
    element.className = 'neuroglancer-string-input';
    inputElement.rows = rows;
    inputElement.cols = cols;
    // inputElement.type = 'input';
    this.registerDisposer(this.model.changed.add(() => this.updateView()));
    this.registerEventListener(inputElement, 'change', () => this.updateModel());
    this.updateView();
  }

  private updateView() {
    this.inputElement.value = '' + this.model.value;
  }

  private updateModel() {
    let value = this.inputElement.value.trim();
    if (typeof value !== 'string') {
      this.updateView();
      return;
    }
    try {
      value = this.validator(value);
      this.model.value = value;
    } catch {
      this.updateView();
    }
  }

  disposed() {
    removeFromParent(this.element);
    super.disposed();
  }
}