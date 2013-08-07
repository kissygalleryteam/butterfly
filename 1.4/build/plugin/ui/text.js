/*
combined files : 

gallery/butterfly/1.4/plugin/ui/base
gallery/butterfly/1.4/plugin/ui/text

*/
// Generated by CoffeeScript 1.6.2
KISSY.add('gallery/butterfly/1.4/plugin/ui/base',function(S, Node, Base) {
  var $, DATA, TRUE, Ui;

  $ = Node.all;
  TRUE = 'true';
  DATA = 'data-';
  Ui = function(config) {
    Ui.superclass.constructor.call(this, config);
    this.set('_guid', 'bf-' + S.guid());
    return this.set('config', config);
  };
  S.extend(Ui, Base, {
    /*插件初始化
    */

    pluginInitializer: function(host) {
      this.set('host', host);
      return host.on('inputEach', this._inputEachHandler, this);
    },
    /*
      将ui组件添加到宿主中
      核心目的是像radio或checkbox这种有组概念的Ui组件，防止多次实例化
    */

    _appendToHost: function(ui) {
      var host, name, uis;

      host = this.get('host');
      if (!host) {
        return false;
      }
      uis = host.get('uis');
      if (!uis) {
        return false;
      }
      name = this.get('name');
      ui = ui || this.get('ui');
      if (!uis[name]) {
        uis[name] = ui;
        host.set('uis', uis);
      }
      return this;
    },
    /*是否运行Ui组件，主要根据type属性进行判断
    */

    _isRenderUi: function($target) {
      var isRender, type;

      isRender = false;
      if (!$target.length) {
        return isRender;
      }
      type = $target.attr('type');
      isRender = type === this.get('type');
      return isRender && !this._isExist();
    },
    /*是否已经存在该Ui实例
    */

    _isExist: function() {
      var host, name, uis;

      host = this.get('host');
      if (!host) {
        return false;
      }
      uis = host.get('uis');
      name = this.get('name');
      return S.isObject(uis[name]);
    },
    /*
      实例化Ui组件
      UiClass:Ui类
    */

    _renderUi: function(UiClass) {
      var $target, cls, config;

      $target = this.get('target');
      config = this.get('config');
      cls = new UiClass($target, config);
      cls.render && cls.render();
      this.set('ui', cls);
      return cls;
    },
    /*
    合并标签上的配置
       * @param {String} attrs 目标元素上的属性(比如"max"取data-max="10")
       * @param {String} prefix 排除前缀，比如data-limiter-wrapper 要吧limiter-去掉
       * @return {Object}
    */

    mergeTagConfig: function(attrs, prefix) {
      var $target, config;

      config = this.get('config');
      $target = this.get('target');
      if (!S.isString(attrs)) {
        return false;
      }
      attrs = attrs.split(',');
      S.each(attrs, function(attr) {
        var val;

        val = $target.attr(DATA + attr);
        if (val) {
          if (prefix) {
            attr = attr.replace(prefix, '');
          }
          if (val === 'true') {
            val = true;
          }
          if (val === 'false') {
            val = false;
          }
          return config[attr] = val;
        }
      });
      this.set('config', config);
      return config;
    },
    /*
    根据data-{ui}的存在性来判断是否使用该ui组件
       * @param {String} uiName Ui组件名称
       * @param {String} $target 目标元素，可选
       * @return {Boolean}
    */

    isUseUi: function(uiName, $target) {
      var isUse;

      $target = $target || this.get('target');
      if (!$target.length) {
        return false;
      }
      isUse = $target.attr(DATA + uiName);
      return isUse === TRUE;
    }
  }, {
    ATTRS: {
      /*插件id
      */

      pluginId: {
        value: ''
      },
      /*目标元素
      */

      target: {
        value: '',
        getter: function(v) {
          return $(v);
        }
      },
      /*获取元素的name属性
      */

      name: {
        value: '',
        getter: function(v) {
          var $el;

          $el = this.get('target');
          v = $el.attr('name') || this.get('_guid');
          return v;
        }
      },
      /*ui组件的实例
      */

      ui: {
        value: '',
        setter: function(v) {
          var $el;

          if (!S.isObject(v)) {
            return v;
          }
          $el = this.get('target');
          $el.data('data-ui', v);
          this._appendToHost(v);
          return v;
        }
      },
      /*Ui对应的元素type的值
      */

      type: {
        value: ''
      },
      /*宿主实例（一般为Butterfly实例）
      */

      host: {
        value: ''
      },
      /*默认配置
      */

      defaultConfig: {
        value: {}
      },
      /*UI组件配置
      */

      config: {
        value: {},
        getter: function(v) {
          var defaultConfig;

          defaultConfig = this.get('defaultConfig');
          return S.merge(defaultConfig, v);
        }
      },
      /*随机数
      */

      _guid: {
        value: ''
      }
    }
  });
  return Ui;
}, {
  requires: ['node', 'base']
});

// Generated by CoffeeScript 1.6.2
KISSY.add('gallery/butterfly/1.4/plugin/ui/text',function(S, Node, Base, TextBox, TextMagnifier, Limiter) {
  var $, Text;

  $ = Node.all;
  Text = function(config) {
    return Text.superclass.constructor.call(this, config);
  };
  S.extend(Text, Base, {
    /*input元素循环后触发
    */

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
      var $input, cls, config, parent;

      $input = this.get('target');
      if (!$input.length) {
        return true;
      }
      config = this.get('config');
      parent = $input.parent('').getDOMNode();
      cls = new TextBox.TextBox(parent, config);
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
      var $input, cls, config, id;

      $input = this.get('target');
      if (!this.isUseUi('magnifier')) {
        return true;
      }
      id = $input.attr('id');
      if (!id) {
        id = 'bf-' + S.guid();
        $input.attr('id', id);
      }
      config = this.get('config');
      S.mix(config, {
        id: '#' + id
      });
      this.set('config', config);
      cls = new TextMagnifier(config);
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
      config = this.mergeTagConfig(ac.join(','), 'limiter-');
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
  requires: ['node', './base', 'gallery/textbox/1.4/', 'gallery/textMagnifier/1.0/', 'gallery/limiter/1.4/']
});

