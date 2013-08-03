KISSY.add (S,Node,Base,Uploader,Auth,UrlsInput,ProBars,TagConfig,ImageUploader)->
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
      uploader = new Uploader($input,config)
      uploader.theme new ImageUploader({queueTarget:'#J_UploaderQueue'})
      unless config.plugins
        uploader.plug new Auth()
        uploader.plug new UrlsInput({target:'#refundImageUrls'})
        uploader.plug new ProBars()
        uploader.plug new TagConfig()
  ,ATTRS:
      type:
        value:'file'
      ###目标元素###
      target:
        value:''
  return UploaderUi
,
  requires : ['node','./base','gallery/uploader/1.4/','gallery/uploader/1.4/plugins/auth/auth','gallery/uploader/1.4/plugins/urlsInput/urlsInput','gallery/uploader/1.4/plugins/proBars/proBars','gallery/uploader/1.4/plugins/tagConfig/tagConfig','gallery/uploader/1.4/themes/imageUploader/index','gallery/uploader/1.4/themes/imageUploader/style.css']