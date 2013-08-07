KISSY.add (S,Node,Base,TextBox,TextMagnifier,Limiter)->
  $ = Node.all
  Text = (config)->
    Text.superclass.constructor.call(@, config)
  S.extend Text,Base,
    ###input元素循环后触发###
    _inputEachHandler:(ev)->
      $input = ev.$el
      unless @._isRenderUi($input)
        return true
      @.set 'target',$input
      @._renderUi()
    _renderUi:()->
      $input = @.get 'target'
      unless $input.length
        return true
      config = @.get 'config'
      parent = $input.parent('').getDOMNode()
      cls = new TextBox.TextBox parent,config
      cls.render()
      @._renderTextMagnifier()
      @._renderLimiter()
      #TODO UI
      return cls
    ###
    实例化文本放大镜，data-magnifier="true"时才实例化
       * @return {TextMagnifier}
    ###
    _renderTextMagnifier:()->
      $input = @.get 'target'
      #data-magnifier是否使用文本放大镜标识
      unless @.isUseUi('magnifier')
        return true
      #获取文本框的id
      #TODO:需要修改TextMagnifier组件
      id = $input.attr 'id'
      unless id
        id = 'bf-'+ S.guid()
        $input.attr 'id',id

      config = @.get 'config'
      S.mix(config,{id:'#'+id})
      @.set 'config',config

      cls = new TextMagnifier config
      cls.render()
      return cls
    ###
    实例化数字统计器，data-limiter="true"时才实例化
       * @return {Limiter}
    ###
    _renderLimiter:()->
      $input = @.get 'target'
      #data-limiter是否使用limiter组件
      unless @.isUseUi('limiter')
        return true
      #合并html tag上的配置
      ac = ['max','wrapper','isCut','isEnToCn','isRejectTag','defaultTpl','exceedTpl']
      ac = S.map ac,(c)->
        return "limiter-#{c}"
      config = @.mergeTagConfig(ac.join(','),'limiter-')
      #实例化Limiter组件
      limiter = new Limiter($input,config)
      limiter.render()
  ,ATTRS:
      type:
        value:'text'
  return Text
,
  requires : ['node','./base','gallery/textbox/1.4/','gallery/textMagnifier/1.0/','gallery/limiter/1.4/']