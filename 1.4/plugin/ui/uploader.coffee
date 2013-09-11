KISSY.add (S,Node,Base,Uploader,ImageUploader)->
  $ = Node.all
  UploaderUi = (config)->
    UploaderUi.superclass.constructor.call(@, config)
  S.extend UploaderUi,Base,
    ###input元素循环后触发###
    _inputEachHandler:(ev)->
      $input = ev.$el
      unless @._isRenderUi($input)
        return true
      @.set 'target',$input
      @._renderUi(Uploader)
    _renderUi:(Uploader)->
      $input = @.get('target')
      config = @.get 'config'
      #合并html tag上的配置
      tagConfigKeys = ['restore','urlsHook','queueHook']
      tagconfig = Base.tagConfig($input,tagConfigKeys)
      S.mix(config,tagconfig)

      uploader = new Uploader($input,config)
      uploader.theme new ImageUploader({queueTarget:config.queueHook || ''})
      plugins = Uploader.plugins
      unless config.plugins
        uploader.plug new plugins.Auth()
        uploader.plug new plugins.UrlsInput({target:config.urlsHook || ''})
        uploader.plug new plugins.ProBars()
        uploader.plug new plugins.TagConfig()
      if(config.restore)
        uploader.restore config.restore
      @.set 'ui',uploader
  ,ATTRS:
      type:
        value:'file'
      ###目标元素###
      target:
        value:''
  return UploaderUi
,
  requires : ['node','./base','gallery/uploader/1.4/aliUploader','gallery/uploader/1.4/themes/grayUploader/index','gallery/uploader/1.4/themes/grayUploader/style.css']