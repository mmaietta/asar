'use strict';
const Transform = require('stream').Transform;
const basename = require('path').basename;

class Reverser extends Transform {
  constructor() {
    super();
    this._data = '';
  }

  _transform(buf: any, enc: any, cb: () => any) {
    this._data += buf;
    return cb();
  }

  _flush(cb: () => any) {
    const txt = this._data.toString().split('').reverse().join('');
    this.push(txt);
    return cb();
  }
}

export default function (filename: any) {
  if (basename(filename) === 'file0.txt') {
    return new Reverser();
  }
}
