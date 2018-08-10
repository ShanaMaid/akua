

interface IInject {
  condition: boolean;
  func: () => void;
  tag?: string;
}

interface IStack {
  [index: string]: {
    condition: boolean;
    func: () => void;
    parent: string;
  };
}


export default class Akua {
  private stack: IStack = {};

  private separator = '->';

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

      if (!this.stack.hasOwnProperty(reuslt.parent)) {
        throw(new Error(`tag '${reuslt.parent}' is not existed!`));
      }

      if (this.stack.hasOwnProperty(reuslt.self)) {
        throw(new Error(`tag '${reuslt.self}'is existed!`));
      }

    } else {
      throw(new Error('tag is incorrect! eg: a or a->b'));
    }
    return reuslt;
  }

  checkParent(parent: string): boolean {
    const obj = this.stack[parent];
    if (obj.parent !== '' && obj.condition) {
      return this.checkParent(obj.parent);
    }
    return obj.condition;
  }

  // parse if tree, then do action
  parse() {
    for (const tag in this.stack) {
      if (this.stack.hasOwnProperty(tag)) {
        const injectObj = this.stack[tag];

        if (!injectObj.condition) {
          continue;
        }

        if (injectObj.parent === '') {
          injectObj.func();
        } else {
          if (this.checkParent(injectObj.parent)) {
            injectObj.func();
          }
        }
      }
    }
    return this;
  }
  
  /**
   * inject if function
   * @param obj IInject
   */
  inject(condition: boolean, tag: string, func: () => void ) {
    const tagObj = this.isValidTag(tag);

    this.stack[tagObj.self] = {
      func: func,
      condition: condition,
      parent: tagObj.parent,
    };
    return this;
  }

  constructor() {
  }
}
