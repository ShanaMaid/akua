
type TGlobalVarObj = {[index: string]: any};

interface IInject {
  condition: boolean;
  func: (globalVar?: TGlobalVarObj) => void;
  tag?: string;
}

interface IStack {
  condition: boolean;
  func: (globalVar?: TGlobalVarObj) => void;
  parent: string;
  self: string;
}


export default class Akua {
  private stack: IStack[] = [];

  private separator = '->';

  private globalVarObj = {};

  private isValidTag (tag: string)  {
    const reuslt = {
      self: '',
      parent: '',
    };

    const tagArr = tag.split(this.separator);
    if (tagArr.length === 1) {
      reuslt.self = tagArr[0];
    } else if (tagArr.length === 2) {
      if (tagArr.indexOf('') !== -1) {
        throw(new Error('tag !=== \'\'!!!!!'));
      }

      reuslt.parent = tagArr[0];
      reuslt.self = tagArr[1];

      if (this.getTagIndex(reuslt.parent) === -1) {
        throw(new Error(`tag '${reuslt.parent}' is not existed!`));
      }

      if (this.getTagIndex(reuslt.self) !== -1) {
        throw(new Error(`tag '${reuslt.self}'is existed!`));
      }

    } else {
      throw(new Error('tag is incorrect! eg: a or a->b'));
    }
    return reuslt;
  }

  checkParent(parent: string): boolean {
    const obj = this.stack[this.getTagIndex(parent)];
    if (obj.parent !== '' && obj.condition) {
      return this.checkParent(obj.parent);
    }
    return obj.condition;
  }

  // get tag index
  getTagIndex(parent: string) {
    for (let index = 0; index < this.stack.length; index++) {
      const element = this.stack[index];
      if (element.self === parent) {
        return index;
      }
    }
    return -1;
  }

  // parse if tree, then do action
  parse() {
    for (const injectObj of this.stack) {
      if (!injectObj.condition) {
        continue;
      }

      if (injectObj.parent === '') {
        injectObj.func(this.globalVarObj);
      } else {
        if (this.checkParent(injectObj.parent)) {
          injectObj.func(this.globalVarObj);
        }
      }
    }
    return this;
  }
  
  /**
   * inject if function
   * @param obj IInject
   */
  inject(condition: boolean, tag: string, func: (globalVar?: TGlobalVarObj) => void ) {
    const tagObj = this.isValidTag(tag);

    this.stack.push({
      func: func,
      condition: condition,
      parent: tagObj.parent,
      self: tagObj.self,
    });
    return this;
  }

  constructor() {
  }
}
