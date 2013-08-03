KISSY.add (S,Base,MenuButton)->
    SelectUi = (config)->
      SelectUi.superclass.constructor.call(@, config)
    S.extend SelectUi,Base,
      ###插件初始化###
      pluginInitializer:(host)->
        #Butterfly实例
        @.set 'host',host
        host.on 'selectEach',@._selectEachHandler,@
      ###select元素循环后触发###
      _selectEachHandler:(ev)->
        $el = ev.$el
        unless @._isRenderUi($el)
          return false
        @.set 'target',$el
        @._renderUi(MenuButton.Select.decorate)
    ,ATTRS:
      type:
        value:'select'
    return SelectUi
  ,
    requires : ['./base','menubutton']