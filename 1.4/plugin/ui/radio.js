// Generated by CoffeeScript 1.6.2
(function() {
  KISSY.add(function(S, Node, Base, Radio) {
    var $, RadioUi;

    $ = Node.all;
    RadioUi = function(config) {
      return RadioUi.superclass.constructor.call(this, config);
    };
    S.extend(RadioUi, Base, {
      /*input元素循环后触发
      */

      _inputEachHandler: function(ev) {
        var $input;

        $input = ev.$el;
        if (!this._isRenderUi($input)) {
          return true;
        }
        this.set('target', $input);
        return this._renderUi(Radio);
      }
    }, {
      ATTRS: {
        type: {
          value: 'radio'
        },
        /*radio目标元素
        */

        target: {
          value: '',
          setter: function(v) {
            var $target, hook, name;

            $target = $(v);
            name = $target.attr('name');
            if (name) {
              $target = $(document.getElementsByName(name));
            } else {
              hook = $target.attr('data-field');
              if (hook) {
                $target = $(hook);
              }
            }
            return $target;
          }
        },
        defaultConfig: {
          value: {
            cssUrl: ''
          }
        }
      }
    });
    return RadioUi;
  }, {
    requires: ['node', './base', 'gallery/radio/1.4/']
  });

}).call(this);
