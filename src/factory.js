class Paginator {
  constructor(ref, limit) {
    this.ref = ref;
    this.pageNumber = 0;
    this.limit = limit;
    this.lastPageNumber = null;
    this.currentSet = {};
  }
  nextPage(callback) {
    if (this.isLastPage()) {
      callback(this.currentSet);
    } else {
      let lastKey = this.getLastKey(this.currentSet),
          pri = lastKey ? null : undefined;
      this.ref.startAt(pri, lastKey)
        .limitToFirst(this.limit + (lastKey ? 1 : 0))
        .once('value', this._process.bind(this, {
          cb: callback,
          dir: 'next',
          key: lastKey
        }));
    }
  }
  prevPage(callback) {
    if (this.isFirstPage()) {
      callback(this.currentSet);
    } else {
      let firstKey = this.getFirstKey(this.currentSet);
      this.ref.endAt(null, firstKey)
        .limitToLast(this.limit + 1)
        .once('value', this._process.bind(this, {
          cb: callback,
          dir: 'prev',
          key: firstKey
        }));
    }
  }
  isFirstPage() {
    return this.pageNumber === 1;
  }
  isLastPage() {
    return this.pageNumber === this.lastPageNumber;
  }
  _process(opts, snap) {
    let vals = snap.val(), len = this.size(vals);
    if (len < this.limit) {
      this.lastPageNumber = this.pageNumber + (len > 0? 1 : 0);
    }
    if (len === 0) {
      opts.cb(this.currentSet);
    } else {
      if (opts.dir === 'next') {
        this.pageNumber++;
        if (opts.key) {
          this.dropFirst(vals);
        }
      } else {
        this.pageNumber--;
        if (opts.key) {
          this.dropLast(vals)
        }
      }
      this.currentSet = vals;
      opts.cb(vals);
    }
  }
  getLastKey(obj) {
    let key;
    if (obj) {
      this.each(obj, (v, k) => key = k);
    }
    return key;
  }
  getFirstKey(obj) {
    let key;
    if (obj) {
      this.each(obj, (v, k) => {
        key = k;
        return true;
      });
    }
    return key;
  }
  dropFirst(obj) {
    if (obj) delete obj[this.getFirstKey(obj)];
    return obj;
  }
  dropLast(obj) {
    if (obj) delete obj[this.getLastKey(obj)];
    return obj;
  }
  each(obj, cb) {
    if (obj) {
      for (let k in obj) if (obj.hasOwnProperty(k)) {
        if (cb(obj[k], k) === true) break;
      }
    }
  }
  size(obj) {
    let i = 0;
    this.each(obj, () => i++);
    return i;
  }
}

let firebasePaginator = function () {
  return Paginator;
};

export default firebasePaginator