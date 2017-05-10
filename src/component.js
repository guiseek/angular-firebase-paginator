let component = {
  bindings: {
    ref: '<',
    items: '=',
    prevText: '@',
    nextText: '@'
  },
  controller: 'FirebasePaginatorController',
  template: `
    <nav aria-label="paginator">
      <a
        class="btn btn-default"
        ng-click="$ctrl.prevPage()"
        ng-bind="$ctrl.prevText"
        ng-disabled="$ctrl.ref.isFirstPage()">
      </a>
      <a
        class="btn btn-default"
        disabled="true"
        ng-bind="$ctrl.ref.pageNumber">
      </a>
      <a
        class="btn btn-default"
        ng-click="$ctrl.nextPage()"
        ng-bind="$ctrl.nextText"
        ng-disabled="$ctrl.ref.isLastPage()">
      </a>
    </nav>
  `
};

export default component