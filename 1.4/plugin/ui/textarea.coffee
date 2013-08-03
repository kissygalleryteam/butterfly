KISSY.add (S,Node,Text)->
  $ = Node.all
  Textarea = (config)->
    Textarea.superclass.constructor.call(@, config)
  S.extend Textarea,Text,
    ###插件初始化###
    pluginInitializer:(host)->
      #Butterfly实例
      @.set 'host',host
      host.on 'textareaEach',@._textareaEachHandler,@
    ###textarea元素循环后触发###
    _textareaEachHandler: (ev)->
      $el = ev.$el
      unless @._isRenderUi($el)
        return false
      @.set 'target',$el
      @._renderLimiter()
  ,ATTRS:
      type:
        value:'textarea'
  return Textarea
,
  requires : ['node','./text']