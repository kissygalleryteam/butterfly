// Generated by CoffeeScript 1.6.3
KISSY.add(function(S, Node, Base, TextBox, TextMagnifier, Limiter) {
  var $, Text;
  $ = Node.all;
  Text = function(config) {
    return Text.superclass.constructor.call(this, config);
  };
  S.extend(Text, Base, {
    /*input元素循环后触发*/

    _inputEachHandler: function(ev) {
      var $input;
      $input = ev.$el;
      if (!this._isRenderUi($input)) {
        return true;
      }
      this.set('target', $input);
      return this._renderUi();
    },
    _renderUi: function() {
      var $input, Cls, cls, config, parent, tagConfigKeys, tagconfig;
      Cls = TextBox.TextBox;
      $input = this.get('target');
      if (!$input.length) {
        return true;
      }
      config = this.get('config');
      parent = $input.parent('').getDOMNode();
      tagConfigKeys = ['number'];
      tagconfig = Base.tagConfig($input, tagConfigKeys);
      S.mix(config, tagconfig);
      if (config.number) {
        Cls = TextBox.NumberTextBox;
      }
      cls = new Cls(parent, config);
      cls.render();
      this._renderTextMagnifier();
      this._renderLimiter();
      return cls;
    },
    /*
    实例化文本放大镜，data-magnifier="true"时才实例化
       * @return {TextMagnifier}
    */

    _renderTextMagnifier: function() {
      var $input, cls, config;
      $input = this.get('target');
      if (!this.isUseUi('magnifier')) {
        return true;
      }
      config = this.get('config');
      cls = new TextMagnifier($input, config);
      cls.render();
      return cls;
    },
    /*
    实例化数字统计器，data-limiter="true"时才实例化
       * @return {Limiter}
    */

    _renderLimiter: function() {
      var $input, ac, config, limiter;
      $input = this.get('target');
      if (!this.isUseUi('limiter')) {
        return true;
      }
      ac = ['max', 'wrapper', 'isCut', 'isEnToCn', 'isRejectTag', 'defaultTpl', 'exceedTpl'];
      ac = S.map(ac, function(c) {
        return "limiter-" + c;
      });
      config = Base.tagConfig($input, ac, 'limiter-');
      limiter = new Limiter($input, config);
      return limiter.render();
    }
  }, {
    ATTRS: {
      type: {
        value: 'text'
      }
    }
  });
  return Text;
}, {
  requires: ['node', './base', 'gallery/textbox/1.4/', 'gallery/textMagnifier/1.1/', 'gallery/limiter/1.4/']
});
