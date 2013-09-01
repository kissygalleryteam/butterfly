KISSY.add (S,Node,Base)->
  $ = Node.all
  ###是否是逻辑需要的tag名称###
  isTag = ($el,tagName)->
    if !$el or !$el.length
      return false
    tagName = $el.getDOMNode().tagName
    return tagName is tagName

  Bidi = (config)->
    Bidi.superclass.constructor.call(@,config)
    @.set 'config',config
  S.extend Bidi,Base,
    ###插件初始化###
    pluginInitializer:(host)->
      @.set('host',host)
      bidi = @.get('bidi')
      unless bidi
        return false
      model = bidi.model
      #选择框的联动，同步模拟选择框
      model.on "render:linkage",(ev)->
        $el = ev.el
        if isTag $el,'SELECT'
          ui = $el.data 'data-ui'
          ui.sync && ui.sync()
  ,
    ATTRS:
      ###插件id###
      pluginId:
        value:'bidi'
      ###bidi的实例###
      bidi:
        value:''
      ###目标元素###
      target:
        value:''
        getter:(v)->
          return $ v
      ###宿主实例（一般为Butterfly实例）###
      host:
        value:''
  return Bidi
,
  requires : ['node','base']