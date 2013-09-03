KISSY.add((S, Node, RichBase)->
  $ = Node.all
  Butterfly = RichBase.extend({
    constructor: (target, config = {})->
      self = this
      Butterfly.superclass.constructor.call self, config
      self.set 'target', target
    ###
    运行组件
    ###
    render: ()->
      @._eachEl()
    field:()->

    ###遍历表单元素###
    _eachEl: ()->
      self = @
      $target = self.get 'target'
      unless $target.length
        return false
      $inputs = $target.all 'input'
      $inputs.each ($el)->
        self.fire('inputEach',{$el:$el})

      $selects = $target.all 'select'
      $selects.each ($el)->
        $el.attr 'type','select'
        self.fire('selectEach',{$el:$el})

      $textareas = $target.all 'textarea'
      $textareas.each ($el)->
        unless $el.attr 'type'
          $el.attr 'type','textarea'
        self.fire('textareaEach',{$el:$el})
  }, {ATTRS:
    ###目标元素###
    target:
      value: ''
      getter: (v)->
        return $ v
    ###Ui实例集合###
    uis:
      value: {}
  })
, {requires: ['node', 'rich-base']})

