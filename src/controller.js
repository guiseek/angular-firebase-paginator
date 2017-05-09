function FirebasePaginatorController() {
  let ctrl = this;

  let loaded = vals  => {
    ctrl.items = [];
    Object.keys(vals).map(key => {
      vals[key].$id = key
      ctrl.items.push(vals[key]);
    });
  }
  ctrl.prevPage = () => {
    ctrl.ref.prevPage(loaded);
  }
  ctrl.nextPage = () => {
    ctrl.ref.nextPage(loaded);
  }
  ctrl.$postLink = () => {
  }
  ctrl.$onInit = () => {
    ctrl.items = [];
    ctrl.ref.nextPage(loaded);
  }
}

export default FirebasePaginatorController