/*! butterfly - v1.4 - 2014-03-05 10:25:01 AM
* Copyright (c) 2014 明河; Licensed  */
KISSY.add("gallery/butterfly/1.4/plugin/ui/base",function(a,b,c){var d,e,f,g;return d=b.all,f="true",e="data-",g=function(b){return g.superclass.constructor.call(this,b),this.set("_guid","bf-"+a.guid()),this.set("config",b)},a.mix(g,{tagConfig:function(b,c,d){var f;return f={},b.length?a.isArray(c)?(a.each(c,function(a){var c;return c=b.attr(e+a),c?(d&&(a=a.replace(d,"")),"true"===c&&(c=!0),"false"===c&&(c=!1),f[a]=c):void 0}),f):f:f}}),a.extend(g,c,{pluginInitializer:function(a){return this.set("host",a),a.on("inputEach",this._inputEachHandler,this)},_appendToHost:function(a){var b,c,d;return(b=this.get("host"))?(d=b.get("uis"))?(c=this.get("name"),a=a||this.get("ui"),d[c]||(d[c]=a,b.set("uis",d)),this):!1:!1},_isRenderUi:function(a){var b,c;return b=!1,a.length?(c=a.attr("type")||a.attr("data-type"),b=c===this.get("type"),b&&!this._isExist()&&!this._isNoRender(a)):b},_isExist:function(){var b,c,d;return(b=this.get("host"))?(d=b.get("uis"),c=this.get("name"),a.isObject(d[c])):!1},_isNoRender:function(a){var b;return b=a.attr(e+"no-render"),b?!0:!1},_renderUi:function(a){var b,c,d;return b=this.get("target"),d=this.get("config"),c=new a(b,d),c.render&&c.render(),this.set("ui",c),c},isUseUi:function(a,b){var c;return b=b||this.get("target"),b.length?(c=b.attr(e+a),c===f):!1}},{ATTRS:{pluginId:{value:""},target:{value:"",getter:function(a){return d(a)}},name:{value:"",getter:function(a){var b;return b=this.get("target"),a=b.attr("name")||this.get("_guid")}},ui:{value:"",setter:function(b){var c;return a.isObject(b)?(c=this.get("target"),c.data("data-ui",b),this._appendToHost(b),b):b}},type:{value:""},host:{value:""},defaultConfig:{value:{}},config:{value:{},getter:function(b){var c;return c=this.get("defaultConfig"),a.merge(c,b)}},_guid:{value:""}}}),g},{requires:["node","base"]}),KISSY.add("gallery/butterfly/1.4/plugin/ui/radio",function(a,b,c,d){var e,f;return e=b.all,f=function(a){return f.superclass.constructor.call(this,a)},a.extend(f,c,{_inputEachHandler:function(a){var b;return b=a.$el,this.set("target",b),this._isRenderUi(b)?this._renderUi(d):!0}},{ATTRS:{type:{value:"radio"},target:{value:"",setter:function(a){var b,c,d;return b=e(a),d=b.attr("name"),d?b=e(document.getElementsByName(d)):(c=b.attr("data-field"),c&&(b=e(c))),b}},defaultConfig:{value:{cssUrl:""}}}}),f},{requires:["node","./base","gallery/radio/1.4/"]});