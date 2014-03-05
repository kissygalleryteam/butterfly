// Generated by CoffeeScript 1.6.3
KISSY.add(function(S, Node, RichBase) {
  var $, Butterfly;
  $ = Node.all;
  return Butterfly = RichBase.extend({
    constructor: function(target, config) {
      var self;
      if (config == null) {
        config = {};
      }
      self = this;
      Butterfly.superclass.constructor.call(self, config);
      return self.set('target', target);
    },
    /*
    运行组件
    */

    render: function() {
      return this._eachEl();
    },
    field: function() {},
    /*遍历表单元素*/

    _eachEl: function() {
      var $target, elFields, self;
      self = this;
      $target = self.get('target');
      if (!$target.length) {
        return false;
      }
      elFields = $target.getDOMNode().elements;
      S.each(elFields, function(el) {
        var $el, exclude, type;
        $el = $(el);
        type = $el.attr('type');
        if (el) {
          switch (el.tagName) {
            case 'INPUT':
              exclude = ['button', 'submit'];
              if (!S.isArray(type, exclude)) {
                return self.fire('inputEach', {
                  $el: $el
                });
              }
              break;
            case 'SELECT':
              $el.attr('data-type', 'select');
              return self.fire('selectEach', {
                $el: $el
              });
            case 'TEXTAREA':
              $el.attr('data-type', 'textarea');
              return self.fire('textareaEach', {
                $el: $el
              });
          }
        }
      });
      return this;
    }
  }, {
    ATTRS: {
      /*目标元素*/

      target: {
        value: '',
        getter: function(v) {
          return $(v);
        }
      },
      /*Ui实例集合*/

      uis: {
        value: {}
      }
    }
  });
}, {
  requires: ['node', 'rich-base']
});
