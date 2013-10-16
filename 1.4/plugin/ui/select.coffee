KISSY.add (S,Base,Select)->
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
          return true
        @.set 'target',$el
        isShow = $el.css('display') != 'none'
        config = @.get 'config'
        #合并html tag上的配置
        tagConfigKeys = ['width']
        tagconfig = Base.tagConfig($el,tagConfigKeys)
        S.mix(config,tagconfig)
        select = @._renderUi(Select)
        unless isShow
          select.hide()
    ,ATTRS:
      type:
        value:'select'
    return SelectUi
  ,
    requires : ['./base','gallery/select/1.4/']