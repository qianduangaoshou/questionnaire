/**
 * [创建标签]
 * @param  {[String]} tag [创建的标签名字]
 * @return {[object]}     [被创建的节点对象]
 */
let c = (tag) => {
  return document.createElement(tag);
};

/**
 * [获取到节点对象,类似于 jQuery 的写法]
 * @param  {[String]} context [传入的标签名]
 * @param  {[Object]} fnode   [上级节点对象]
 * @return {[Object]}         [获取到的对象节点]
 */
let $ = (context, fnode) => {
  context = context.trim();
  let strArr = context.split(' ');
  let len = strArr.length;
  let node = null;
  if (len > 1) {
    node = strArr.reduce((pev, next) => {
      return $(next, pev);
    }, '');
  }
  if (node) return node;
  switch (context.slice(0, 1)) {
    case '.':
      if (fnode) {
        fnode = [].slice.call(fnode).filter((node) => {
          if (node.getElementsByClassName(context.slice(1))) {
            return node.getElementsByClassName(context.slice(1))[0];
          }
        })
      }
      return document.getElementsByClassName(context.slice(1));
      // break; not reachable
    case '#':
      return document.getElementById(context.slice(1));
      // break; not-reachable
    default:
      return document.getElementsByTagName(context);
  }
};

class Storage {
  constructor(name = '', content, key) {
    this.name = name;
    this.content = content;
  }
  get () {
    let getContent = JSON.parse(sessionStorage.getItem(this.name));
    return getContent;
  }
  set () {
    let storeContent = this.get();
    if (storeContent === null) {
      storeContent = [];
    };
    storeContent.push(this.content);
    sessionStorage.setItem(this.name, JSON.stringify(storeContent));
  }
  del (index) {
    console.log('index', index);
    let store = this.get();
    console.log('storessss', index);
    store.splice(index, 1);
    console.log('stFDASore', store);
    sessionStorage.setItem(this.name, JSON.stringify(store));
  }
};

class Client {
  constructor() {
    this.doc = document.documentElement || document.body;
  }
  clientWidth () {
    return this.doc.clientWidth + 'px';
  }
  clientHeight () {
    return this.doc.clientHeight + 'px';
  }
};

export {c, $, Storage, Client};
