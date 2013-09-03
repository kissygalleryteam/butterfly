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
      elFields = $target.getDOMNode().elements
      S.each(elFields,(el)->
        $el = $(el)
        type = $el.attr 'type'
        switch el.tagName
          when 'INPUT'
            exclude = ['button','submit']
            unless S.isArray(type,exclude)
              self.fire('inputEach',{$el:$el})
          when 'SELECT'
            $el.attr 'type','select'
            self.fire('selectEach',{$el:$el})
          when 'TEXTAREA'
            $el.attr 'type','textarea'
            self.fire('textareaEach',{$el:$el})
      )
      return @
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

