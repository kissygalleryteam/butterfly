// Generated by CoffeeScript 1.6.3
KISSY.add(function(S, Base, Select) {
  var SelectUi;
  SelectUi = function(config) {
    return SelectUi.superclass.constructor.call(this, config);
  };
  S.extend(SelectUi, Base, {
    /*插件初始化*/

    pluginInitializer: function(host) {
      this.set('host', host);
      return host.on('selectEach', this._selectEachHandler, this);
    },
    /*select元素循环后触发*/

    _selectEachHandler: function(ev) {
      var $el, isShow, select;
      $el = ev.$el;
      if (!this._isRenderUi($el)) {
        return true;
      }
      this.set('target', $el);
      isShow = $el.css('display') !== 'none';
      select = this._renderUi(Select);
      if (!isShow) {
        return select.hide();
      }
    }
  }, {
    ATTRS: {
      type: {
        value: 'select'
      }
    }
  });
  return SelectUi;
}, {
  requires: ['./base', 'gallery/select/1.5/']
});
