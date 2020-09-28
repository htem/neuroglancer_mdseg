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

import {StatusMessage} from 'neuroglancer/status';
import {bindDefaultCopyHandler, bindDefaultPasteHandler} from 'neuroglancer/ui/default_clipboard_handling';
import {setDefaultInputEventBindings} from 'neuroglancer/ui/default_input_event_bindings';
import {makeDefaultViewer} from 'neuroglancer/ui/default_viewer';
import {UrlHashBinding} from 'neuroglancer/ui/url_hash_binding';
import {RemoteActionHandler} from 'neuroglancer/python_integration/remote_actions';
import {CompoundTrackable} from 'neuroglancer/util/trackable';

/**
 * Sets up the default neuroglancer viewer.
 */
export function setupDefaultViewer() {
  let viewer = (<any>window)['viewer'] = makeDefaultViewer();
  setDefaultInputEventBindings(viewer.inputEventBindings);

  const hashBinding = viewer.registerDisposer(new UrlHashBinding(viewer.state));
  viewer.registerDisposer(hashBinding.parseError.changed.add(() => {
    const {value} = hashBinding.parseError;
    if (value !== undefined) {
      const status = new StatusMessage();
      status.setErrorMessage(`Error parsing state: ${value.message}`);
      console.log('Error parsing state', value);
    }
    hashBinding.parseError;
  }));
  hashBinding.updateFromUrlHash();



  const configState = new CompoundTrackable();
  const remoteActionHandler = new RemoteActionHandler(viewer);
  (<any>window)['remoteActionHandler'] = remoteActionHandler;
  configState.add('actions', remoteActionHandler.actionSet);

  // document.addEventListener('clSetVal',()=> {
  //   remoteActionHandler.sendActionRequested.dispatch('set-color',JSON.parse(JSON.stringify(getCachedJson(viewer.state).value)));
  // });
  // document.addEventListener('clClear',()=> {
  //   remoteActionHandler.sendActionRequested.dispatch('clear-color',JSON.parse(JSON.stringify(getCachedJson(viewer.state).value)));
  // });
  // document.addEventListener('prSomaLocCopyLoc',()=> {
  //   remoteActionHandler.sendActionRequested.dispatch('prSomaLocCopyLocEvent',JSON.parse(JSON.stringify(getCachedJson(viewer.state).value)));
  // });
  // document.addEventListener('prSaveNeuron',()=> {
  //   remoteActionHandler.sendActionRequested.dispatch('save-neuron',JSON.parse(JSON.stringify(getCachedJson(viewer.state).value)));
  // });
  // document.addEventListener('dbLoadNeuronNameButton',()=> {
  //   remoteActionHandler.sendActionRequested.dispatch('dbLoadNeuronNameButtonEvent',JSON.parse(JSON.stringify(getCachedJson(viewer.state).value)));
  // });
  // document.addEventListener('dbLoadNeuronNameButton1',()=> {
  //   remoteActionHandler.sendActionRequested.dispatch('dbLoadNeuronNameButton1Event',JSON.parse(JSON.stringify(getCachedJson(viewer.state).value)));
  // });
  // document.addEventListener('dbLoadNeuronNameButton2',()=> {
  //   remoteActionHandler.sendActionRequested.dispatch('dbLoadNeuronNameButton2Event',JSON.parse(JSON.stringify(getCachedJson(viewer.state).value)));
  // });
  // document.addEventListener('dbLoadNeuronNameButton3',()=> {
  //   remoteActionHandler.sendActionRequested.dispatch('dbLoadNeuronNameButton3Event',JSON.parse(JSON.stringify(getCachedJson(viewer.state).value)));
  // });
  // document.addEventListener('dbSearchButton',()=> {
  //   remoteActionHandler.sendActionRequested.dispatch('search-neuron',JSON.parse(JSON.stringify(getCachedJson(viewer.state).value)));
  // });
  // document.addEventListener('clNeuronColorButton',()=> {
  //   remoteActionHandler.sendActionRequested.dispatch('clNeuronColorButton',JSON.parse(JSON.stringify(getCachedJson(viewer.state).value)));
  // });

  bindDefaultCopyHandler(viewer);
  bindDefaultPasteHandler(viewer);

  return viewer;
}
