KISSY.add (S,Node,Auth)->
  $ = Node.all
  BfAuth = (config)->
    BfAuth.superclass.constructor.call(@,'',config)
    @.set 'config',config
  S.extend BfAuth,Auth,
    ###插件初始化###
    pluginInitializer:(host)->
      @.set('host',host)
      host.on 'inputEach',@._EachHandler,@
      host.on 'selectEach',@._EachHandler,@
      host.on 'textareaEach',@._EachHandler,@
    _EachHandler: (ev)->
      $el = ev.$el
      @.add($el)
  ,
    ATTRS:
      ###插件id###
      pluginId:
        value:'auth'
      ###目标元素###
      target:
        value:''
        getter:(v)->
          return $ v
      ###宿主实例（一般为Butterfly实例）###
      host:
        value:''
  return BfAuth
,
  requires : ['node','gallery/auth/1.5/']