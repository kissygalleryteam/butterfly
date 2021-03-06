// Generated by CoffeeScript 1.6.3
KISSY.add(function(S, Node, Base, AliUploader, plugins, ImageUploader) {
  var $, UploaderUi;
  $ = Node.all;
  UploaderUi = function(config) {
    return UploaderUi.superclass.constructor.call(this, config);
  };
  S.extend(UploaderUi, Base, {
    /*input元素循环后触发*/

    _inputEachHandler: function(ev) {
      var $input;
      $input = ev.$el;
      if (!this._isRenderUi($input)) {
        return true;
      }
      this.set('target', $input);
      return this._renderUi(AliUploader);
    },
    _renderUi: function(Uploader) {
      var $input, config, tagConfigKeys, tagconfig, uploader;
      $input = this.get('target');
      config = this.get('config');
      tagConfigKeys = ['restore', 'urlsHook', 'queueHook', 'useName', 'ali'];
      tagconfig = Base.tagConfig($input, tagConfigKeys);
      S.mix(config, tagconfig);
      Uploader = AliUploader.Uploader;
      if (config.ali) {
        Uploader = AliUploader;
      }
      uploader = new Uploader($input, config);
      uploader.theme(new ImageUploader({
        queueTarget: config.queueHook || ''
      }));
      if (!config.plugins) {
        uploader.plug(new plugins.Auth());
        uploader.plug(new plugins.UrlsInput({
          target: config.urlsHook || '',
          useName: config.useName || false
        }));
        uploader.plug(new plugins.ProBars());
        uploader.plug(new plugins.TagConfig());
        uploader.plug(new plugins.ImageZoom());
      }
      if (config.restore) {
        uploader.restore(config.restore);
      }
      return this.set('ui', uploader);
    }
  }, {
    ATTRS: {
      type: {
        value: 'file'
      },
      /*目标元素*/

      target: {
        value: ''
      }
    }
  });
  return UploaderUi;
}, {
  requires: ['node', './base', 'gallery/uploader/1.5/aliUploader', 'gallery/uploader/1.5/plugins/plugins', 'gallery/uploader/1.5/themes/grayUploader/index', 'gallery/uploader/1.5/themes/grayUploader/style.css']
});
