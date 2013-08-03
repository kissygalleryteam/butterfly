KISSY.add (S,Node,Base,Radio)->
    $ = Node.all
    RadioUi = (config)->
      RadioUi.superclass.constructor.call(@, config)
    S.extend RadioUi,Base,
      ###input元素循环后触发###
      _inputEachHandler:(ev)->
        $input = ev.$el
        unless @._isRenderUi($input)
          return true
        @.set 'target',$input
        @._renderUi(Radio)
    ,ATTRS:
      type:
        value:'radio'
      ###radio目标元素###
      target:
        value:''
        setter:(v)->
          $target = $ v
          name = $target.attr 'name'
          #radio获取同名radio作为目标元素
          if name
            $target = $(document.getElementsByName(name))
          else
            hook = $target.attr('data-field')
            if hook
              $target = $ hook
          return $target
      defaultConfig:
        value:cssUrl:''
    return RadioUi
  ,
    requires : ['node','./base','gallery/radio/1.4/']