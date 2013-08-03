KISSY.add (S,Node,Base,Checkbox)->
    $ = Node.all
    CheckboxUi = (config)->
      CheckboxUi.superclass.constructor.call(@, config)
    S.extend CheckboxUi,Base,
      ###input元素循环后触发###
      _inputEachHandler:(ev)->
        $input = ev.$el
        unless @._isRenderUi($input)
          return true
        @.set 'target',$input
        @._renderUi(Checkbox)
    ,ATTRS:
      type:
        value:'checkbox'
      defaultConfig:
        value:cssUrl:''
    return CheckboxUi
  ,
    requires : ['node','./radio','gallery/checkbox/1.4/']