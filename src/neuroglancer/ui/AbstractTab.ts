

import {Tab} from 'neuroglancer/widget/tab_view';
import {CompoundTrackable} from 'neuroglancer/util/trackable';
import {TrackableBoolean} from 'neuroglancer/trackable_boolean';

type titleType = 'H3' | 'label';
type buttonType = 'checkbox'|'button';

export interface IValue {
  [details: string]: string;
}

/**
 * Represents a tab for Proofread, Search DB, and Color.
 */
export abstract class Atab extends Tab {

    m:Map<string,HTMLElement> = new Map();

    // constructor(public model: WatchableValueInterface<IValue>) {
    //     super();
    // }
  constructor(public model: CompoundTrackable) {
    super();
  }

  /**
   * Adds an HTML input element to the tab.
   * @param inp the HTML input element to add.
   * @param title The title of the input element.
   * @param type The type of input element to add.
   * @param id The id the of input element.
   */
  addInputElement(inp:HTMLInputElement, title:string, type:buttonType = 'checkbox', id?:string) {
    const linebreak = document.createElement('br');
    const input = inp;
    const div_inpArea = document.createElement('DIV');
    div_inpArea.setAttribute('align','right');
    input.type = type;

    if(type === 'checkbox') {
      const inputlabel = document.createElement('label');
      inputlabel.textContent = title;
      inputlabel.appendChild(input);
      div_inpArea.appendChild(inputlabel);
    } else {
      input.name = title;
      input.value = title;
      input.textContent = title;
      input.title = title;
      div_inpArea.appendChild(input);
    }
    div_inpArea.appendChild(linebreak);
    div_inpArea.appendChild(linebreak);
    this.element.appendChild(div_inpArea);
    // this.registerDisposer(this.model.changed.add(() => this.updateView()));
    // this.registerDisposer(this.visibility.changed.add(() => this.updateView()));
    if(id) {
      input.id= id;
    }

    if (type === 'button') {
      input.addEventListener('mousedown',()=> {
        document.dispatchEvent(new Event(input.id));
      });
    } else {
      input.addEventListener('change',() => {
        this.updateModel();
      });
    }
    this.updateView();
  }

  /**
   * Adds an HTML text area element to the tab.
   * @param tarea The HTML text area element to add.
   * @param title The title of the text area to add.
   * @param type The type of text to use for the title of the text area.
   * @param rows The height of the text area to add.
   * @param cols The width of the text area to add.
   */
   addTextField(tarea:HTMLTextAreaElement, title:string, type:titleType, rows:number=1, cols:number=24) {
    const txarea = tarea;
    const div_textArea = document.createElement('DIV');
    div_textArea.setAttribute('align','right');
    if(type === 'label') {
    const textAreaLabel=document.createElement('label');
    textAreaLabel.textContent = title;
    textAreaLabel.appendChild(txarea);
    div_textArea.appendChild(textAreaLabel);
    }
    if(type === 'H3') {
      const title_label = document.createElement('H3');
      title_label.style.padding = '0';
      title_label.style.margin='0';
      title_label.appendChild(document.createTextNode(title));
      div_textArea.appendChild(title_label);
      div_textArea.appendChild(txarea);
    }
    this.element.appendChild(div_textArea);
    // this.registerDisposer(this.model.changed.add(() => this.updateView()));
    // this.registerDisposer(this.visibility.changed.add(() => this.updateView()));
    txarea.addEventListener('save', () => this.updateModel());
    txarea.addEventListener('blur', () => this.updateModel());
    // txarea.addEventListener('change', () => this.updateModel());
    txarea.rows = rows;
    txarea.cols = cols;
    this.updateView();
  }



 public abstract updateModel():void ;
 // public abstract updateView():void;

getKeyByValue(object:Map<string, HTMLElement>, value:HTMLElement) {
  return Object.keys(object).find(key => object.get(key) === value);
}

// updateView() {
//     console.log('running updateView');
//     for (let key in this.model.value) {
//       let field = this.m.get(key)!;
//       let txt: string = this.model.value[key];
//       if (field.nodeName === 'TEXTAREA') {
//         (<HTMLTextAreaElement>field).value = ''+txt;
//       } else if(field.nodeName === 'INPUT' && (<HTMLInputElement>field).type === 'checkbox') {
//         if(JSON.parse(txt) === '1') {
//           console.log('updateView: is checked');
//           (<HTMLInputElement>field).checked = true;
//         } else {
//           console.log('updateView: not checked');
//           (<HTMLInputElement>field).checked = false;
//         }
//       }
//     }
//   }

  /**
   * Updates the view of a tab using the tab's model.
   */
  updateView() {
    console.log('updateView called');
    for (let [key, value] of this.model.children) {
      console.log(key + '' + value);
      let field = this.m.get(key)!;
      // let txt = this.model.children.get(key);
      if (field.tagName === 'TEXTAREA') {
        (<HTMLTextAreaElement>field).value = ''+value;
      } else if(field.tagName === 'INPUT') {
        console.log('updateView: field is input');
        console.log('value is: ' + (<TrackableBoolean>value).value);
        if((<TrackableBoolean>value).value) {
          console.log(key + ' is checked');
          (<HTMLInputElement>field).checked = true;
        } else {
          (<HTMLInputElement>field).checked = false;
        }
      }
    }
  }



}
