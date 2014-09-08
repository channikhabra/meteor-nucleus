EventUtils = function($window) {
  this.$window = $window;

  this.getWindow = function() {
    window.test_window = this.$window;
    return this.$window;
  };

  this.getDocument = function() {
    return this.getWindow().document;
  };


  /**
   * Cross-browser scroll position
   * @returns {{x: number, y: number}}
   */
  this.getBrowserScrollPosition = function () {

    var $window   = this.getWindow();
    var $document = this.getDocument();
    var scrollX;
    var scrollY;
    var dElement = $document.documentElement;
    var dBody    = $document.body;

    if ($window.pageYOffset !== undefined) {
      scrollX = $window.pageXOffset;
      scrollY = $window.pageYOffset;
    } else {
      scrollX = dElement.scrollLeft || dBody.scrollLeft || 0;
      scrollY = dElement.scrollTop || dBody.scrollTop || 0;
    }

    return {
      x: scrollX,
      y: scrollY
    };
  },
  /**
   * @returns {{x: number, y: number}}
   */
  this.getScrollSpace = function () {
    var $document = this.getDocument();
    var dElement = $document.documentElement;
    var dBody    = $document.body;
    return {
      x: dBody.scrollHeight - dElement.clientWidth,
      y: dBody.scrollHeight - dElement.clientHeight
    };
  };

  /**
   * @param tagName
   * @param elem
   * @returns {*|number}
   */
  this.getElementIndex = function (tagName, elem) {
    var $document = this.getDocument();
    var allElems = $document.getElementsByTagName(tagName);
    return Array.prototype.indexOf.call(allElems, elem);
  };

  /**
   * Force Change event on radio & checkboxes (IE)
   */
  this.forceChange = function (elem) {
    elem.blur();
    elem.focus();
  };

  /**
   * @param elem
   * @returns {{tagName: (elem.tagName|*), index: *}}
   */
  this.getElementData = function (elem) {
    var tagName = elem.tagName;
    var index   = this.getElementIndex(tagName, elem);
    return {
      tagName: tagName,
      index: index
    };
  };

  /**
   * @param {string} tagName
   * @param {number} index
   */
  this.getSingleElement = function (tagName, index) {
    var $document = this.getDocument();
    var elems = $document.getElementsByTagName(tagName);
    return elems[index];
  };

  /**
   *
   */
  this.getBody = function () {
    var $document = this.getDocument();
    return $document.getElementsByTagName("body")[0];
  };
};
