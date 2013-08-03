// Generated by CoffeeScript 1.6.2
(function() {
  KISSY.add(function(S, Base, MenuButton) {
    var SelectUi;

    SelectUi = function(config) {
      return SelectUi.superclass.constructor.call(this, config);
    };
    S.extend(SelectUi, Base, {
      /*插件初始化
      */

      pluginInitializer: function(host) {
        this.set('host', host);
        return host.on('selectEach', this._selectEachHandler, this);
      },
      /*select元素循环后触发
      */

      _selectEachHandler: function(ev) {
        var $el;

        $el = ev.$el;
        if (!this._isRenderUi($el)) {
          return false;
        }
        this.set('target', $el);
        return this._renderUi(MenuButton.Select.decorate);
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
    requires: ['./base', 'menubutton']
  });

}).call(this);
