KISSY.add (S,Node,Base,Spinbox)->
    $ = Node.all
    Number = (config)->
      Number.superclass.constructor.call(@, config)
    S.extend Number,Base,
      ###input元素循环后触发###
      _inputEachHandler:(ev)->
        $input = ev.$el
        unless @._isRenderUi($input)
          return true
        @.set 'target',$input
        @._renderUi(Spinbox)
    ,ATTRS:
      type:
        value:'spinbox'
      ###目标元素###
      target:
        value:''
      defaultConfig:
        value:cssUrl:''
    return Number
  ,
    requires : ['node','./base','gallery/spinbox/1.4/']