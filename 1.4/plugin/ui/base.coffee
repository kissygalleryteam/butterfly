KISSY.add (S,Node,Base)->
  $ = Node.all
  TRUE = 'true'
  DATA = 'data-'
  Ui = (config)->
    Ui.superclass.constructor.call(@, config)
    @.set '_guid','bf-' + S.guid()
    @.set 'config',config
  S.extend Ui,Base,
    ###插件初始化###
    pluginInitializer:(host)->
      #Butterfly实例
      @.set 'host',host
      host.on 'inputEach',@._inputEachHandler,@
    ###
      将ui组件添加到宿主中
      核心目的是像radio或checkbox这种有组概念的Ui组件，防止多次实例化
    ###
    _appendToHost:(ui)->
      host = @.get 'host'
      unless host
        return false
      #ui组件实例集合
      uis = host.get 'uis'
      unless uis
        return false
      #表单元素id
      name = @.get 'name'
      #ui组件
      ui = ui || @.get 'ui'
      unless uis[name]
        uis[name] = ui
        host.set 'uis',uis
      return @
    ###是否运行Ui组件，主要根据type属性进行判断###
    _isRenderUi:($target)->
      isRender = false
      unless $target.length
        return isRender
      type = $target.attr 'type'
      isRender = type is @.get 'type'
      return isRender && !@._isExist()
    ###是否已经存在该Ui实例###
    _isExist:()->
      host = @.get 'host'
      unless host
        return false
      uis = host.get 'uis'
      name = @.get 'name'
      return S.isObject uis[name]
    ###
      实例化Ui组件
      UiClass:Ui类
    ###
    _renderUi:(UiClass)->
      $target = @.get 'target'
      config = @.get 'config'
      cls = new UiClass $target,config
      cls.render && cls.render()
      @.set 'ui',cls
      return cls
    ###
    合并标签上的配置
       * @param {String} attrs 目标元素上的属性(比如"max"取data-max="10")
       * @param {String} prefix 排除前缀，比如data-limiter-wrapper 要吧limiter-去掉
       * @return {Object}
    ###
    mergeTagConfig: (attrs,prefix)->
      config = @.get 'config'
      $target = @.get 'target'
      unless S.isString attrs
        return false
      attrs = attrs.split ','
      S.each attrs,(attr)->
        val = $target.attr(DATA + attr)
        if val
          if prefix
            attr = attr.replace prefix,''
          if val is 'true'
            val = true
          if val is 'false'
            val = false
          config[attr] = val
      @.set 'config',config
      return config
    ###
    根据data-{ui}的存在性来判断是否使用该ui组件
       * @param {String} uiName Ui组件名称
       * @param {String} $target 目标元素，可选
       * @return {Boolean}
    ###
    isUseUi:(uiName,$target)->
      $target = $target or @.get 'target'
      unless $target.length
        return false

      isUse = $target.attr(DATA + uiName)
      return isUse is TRUE
  ,
    ATTRS:
      ###插件id###
      pluginId:
        value:''
      ###目标元素###
      target:
        value:''
        getter:(v)->
          return $ v
      ###获取元素的name属性###
      name:
        value : ''
        getter : (v)->
          $el = @.get 'target'
          v = $el.attr('name') || @.get('_guid')
          return v
      ###ui组件的实例###
      ui:
        value:'',
        setter:(v)->
          unless S.isObject v
            return v
          $el = @.get 'target'
          #将实例写入元素的data
          $el.data 'data-ui',v
          #将实例添加到宿主
          @._appendToHost(v)
          return v
      ###Ui对应的元素type的值###
      type:
        value:''
      ###宿主实例（一般为Butterfly实例）###
      host:
        value:''
      ###默认配置###
      defaultConfig:
        value : {}
      ###UI组件配置###
      config:
        value : {}
        getter : (v)->
          defaultConfig = @.get 'defaultConfig'
          return S.merge defaultConfig,v
      ###随机数###
      _guid:
        value:''
  return Ui
,
  requires : ['node','base']