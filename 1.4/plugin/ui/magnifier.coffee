KISSY.add (S,Node,Base,TextMagnifier)->
  $ = Node.all
  TextMagnifierUi = (config)->
    TextMagnifierUi.superclass.constructor.call(@, config)
  S.extend TextMagnifierUi,Base,
    ###input元素循环后触发###
    _inputEachHandler:(ev)->
      $input = ev.$el
      unless @._isRenderUi($input)
        return true
      @.set 'target',$input
      id = $input.attr 'id'
      unless id
        id = 'bf-'+ S.guid()
        $input.attr 'id',id
      config = @.get 'config'
      S.mix(config,{id:'#'+id})
      @.set 'config',config
      @._renderUi(TextMagnifier,config)
    _renderUi:(UiClass,config)->
      cls = new UiClass config
      cls.render()
      @.set 'ui',cls
      return cls
  ,ATTRS:
      type:
        value:'magnifier'
      ###目标元素###
      target:
        value:''
      defaultConfig:
        value:
          align:"top"
          delimiter:''
  return TextMagnifierUi
,
  requires : ['node','./base','gallery/textMagnifier/1.0/']