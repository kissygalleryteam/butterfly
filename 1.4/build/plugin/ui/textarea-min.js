/*! butterfly - v1.4 - 2013-08-07 7:35:50 PM
* Copyright (c) 2013 明河; Licensed  */
KISSY.add("gallery/butterfly/1.4/plugin/ui/base",function(a,b,c){var d,e,f,g;return d=b.all,f="true",e="data-",g=function(b){return g.superclass.constructor.call(this,b),this.set("_guid","bf-"+a.guid()),this.set("config",b)},a.extend(g,c,{pluginInitializer:function(a){return this.set("host",a),a.on("inputEach",this._inputEachHandler,this)},_appendToHost:function(a){var b,c,d;return(b=this.get("host"))?(d=b.get("uis"))?(c=this.get("name"),a=a||this.get("ui"),d[c]||(d[c]=a,b.set("uis",d)),this):!1:!1},_isRenderUi:function(a){var b,c;return b=!1,a.length?(c=a.attr("type"),b=c===this.get("type"),b&&!this._isExist()):b},_isExist:function(){var b,c,d;return(b=this.get("host"))?(d=b.get("uis"),c=this.get("name"),a.isObject(d[c])):!1},_renderUi:function(a){var b,c,d;return b=this.get("target"),d=this.get("config"),c=new a(b,d),c.render&&c.render(),this.set("ui",c),c},mergeTagConfig:function(b,c){var d,f;return f=this.get("config"),d=this.get("target"),a.isString(b)?(b=b.split(","),a.each(b,function(a){var b;return b=d.attr(e+a),b?(c&&(a=a.replace(c,"")),"true"===b&&(b=!0),"false"===b&&(b=!1),f[a]=b):void 0}),this.set("config",f),f):!1},isUseUi:function(a,b){var c;return b=b||this.get("target"),b.length?(c=b.attr(e+a),c===f):!1}},{ATTRS:{pluginId:{value:""},target:{value:"",getter:function(a){return d(a)}},name:{value:"",getter:function(a){var b;return b=this.get("target"),a=b.attr("name")||this.get("_guid")}},ui:{value:"",setter:function(b){var c;return a.isObject(b)?(c=this.get("target"),c.data("data-ui",b),this._appendToHost(b),b):b}},type:{value:""},host:{value:""},defaultConfig:{value:{}},config:{value:{},getter:function(b){var c;return c=this.get("defaultConfig"),a.merge(c,b)}},_guid:{value:""}}}),g},{requires:["node","base"]}),KISSY.add("gallery/butterfly/1.4/plugin/ui/text",function(a,b,c,d,e,f){var g,h;return g=b.all,h=function(a){return h.superclass.constructor.call(this,a)},a.extend(h,c,{_inputEachHandler:function(a){var b;return b=a.$el,this._isRenderUi(b)?(this.set("target",b),this._renderUi()):!0},_renderUi:function(){var a,b,c,e;return a=this.get("target"),a.length?(c=this.get("config"),e=a.parent("").getDOMNode(),b=new d.TextBox(e,c),b.render(),this._renderTextMagnifier(),this._renderLimiter(),b):!0},_renderTextMagnifier:function(){var b,c,d,f;return b=this.get("target"),this.isUseUi("magnifier")?(f=b.attr("id"),f||(f="bf-"+a.guid(),b.attr("id",f)),d=this.get("config"),a.mix(d,{id:"#"+f}),this.set("config",d),c=new e(d),c.render(),c):!0},_renderLimiter:function(){var b,c,d,e;return b=this.get("target"),this.isUseUi("limiter")?(c=["max","wrapper","isCut","isEnToCn","isRejectTag","defaultTpl","exceedTpl"],c=a.map(c,function(a){return"limiter-"+a}),d=this.mergeTagConfig(c.join(","),"limiter-"),e=new f(b,d),e.render()):!0}},{ATTRS:{type:{value:"text"}}}),h},{requires:["node","./base","gallery/textbox/1.4/","gallery/textMagnifier/1.0/","gallery/limiter/1.4/"]}),KISSY.add("gallery/butterfly/1.4/plugin/ui/textarea",function(a,b,c){var d,e;return d=b.all,e=function(a){return e.superclass.constructor.call(this,a)},a.extend(e,c,{pluginInitializer:function(a){return this.set("host",a),a.on("textareaEach",this._textareaEachHandler,this)},_textareaEachHandler:function(a){var b;return b=a.$el,this.set("target",b),this._isRenderUi(b)?this._renderLimiter():!1}},{ATTRS:{type:{value:"textarea"}}}),e},{requires:["node","./text"]});