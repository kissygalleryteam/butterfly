/*! butterfly - v1.4 - 2014-03-05 10:46:54 AM
* Copyright (c) 2014 明河; Licensed  */
KISSY.add("gallery/butterfly/1.4/plugin/ui/base",function(a,b,c){var d,e,f,g;return d=b.all,f="true",e="data-",g=function(b){return g.superclass.constructor.call(this,b),this.set("_guid","bf-"+a.guid()),this.set("config",b)},a.mix(g,{tagConfig:function(b,c,d){var f;return f={},b.length?a.isArray(c)?(a.each(c,function(a){var c;return c=b.attr(e+a),c?(d&&(a=a.replace(d,"")),"true"===c&&(c=!0),"false"===c&&(c=!1),f[a]=c):void 0}),f):f:f}}),a.extend(g,c,{pluginInitializer:function(a){return this.set("host",a),a.on("inputEach",this._inputEachHandler,this)},_appendToHost:function(a){var b,c,d;return(b=this.get("host"))?(d=b.get("uis"))?(c=this.get("name"),a=a||this.get("ui"),d[c]||(d[c]=a,b.set("uis",d)),this):!1:!1},_isRenderUi:function(a){var b,c;return b=!1,a.length?(c=a.attr("type")||a.attr("data-type"),b=c===this.get("type"),b&&!this._isExist()&&!this._isNoRender(a)):b},_isExist:function(){var b,c,d;return(b=this.get("host"))?(d=b.get("uis"),c=this.get("name"),a.isObject(d[c])):!1},_isNoRender:function(a){var b;return b=a.attr(e+"no-render"),b?!0:!1},_renderUi:function(a){var b,c,d;return b=this.get("target"),d=this.get("config"),c=new a(b,d),c.render&&c.render(),this.set("ui",c),c},isUseUi:function(a,b){var c;return b=b||this.get("target"),b.length?(c=b.attr(e+a),c===f):!1}},{ATTRS:{pluginId:{value:""},target:{value:"",getter:function(a){return d(a)}},name:{value:"",getter:function(a){var b;return b=this.get("target"),a=b.attr("name")||this.get("_guid")}},ui:{value:"",setter:function(b){var c;return a.isObject(b)?(c=this.get("target"),c.data("data-ui",b),this._appendToHost(b),b):b}},type:{value:""},host:{value:""},defaultConfig:{value:{}},config:{value:{},getter:function(b){var c;return c=this.get("defaultConfig"),a.merge(c,b)}},_guid:{value:""}}}),g},{requires:["node","base"]}),KISSY.add("gallery/butterfly/1.4/plugin/ui/uploader",function(a,b,c,d,e,f){var g,h;return g=b.all,h=function(a){return h.superclass.constructor.call(this,a)},a.extend(h,c,{_inputEachHandler:function(a){var b;return b=a.$el,this._isRenderUi(b)?(this.set("target",b),this._renderUi(d)):!0},_renderUi:function(b){var g,h,i,j,k;return g=this.get("target"),h=this.get("config"),i=["restore","urlsHook","queueHook","useName","ali"],j=c.tagConfig(g,i),a.mix(h,j),b=d.Uploader,h.ali&&(b=d),k=new b(g,h),k.theme(new f({queueTarget:h.queueHook||""})),h.plugins||(k.plug(new e.Auth),k.plug(new e.UrlsInput({target:h.urlsHook||"",useName:h.useName||!1})),k.plug(new e.ProBars),k.plug(new e.TagConfig),k.plug(new e.ImageZoom)),h.restore&&k.restore(h.restore),this.set("ui",k)}},{ATTRS:{type:{value:"file"},target:{value:""}}}),h},{requires:["node","./base","gallery/uploader/1.5/aliUploader","gallery/uploader/1.5/plugins/plugins","gallery/uploader/1.5/themes/grayUploader/index","gallery/uploader/1.5/themes/grayUploader/style.css"]});