/*! butterfly - v1.4 - 2013-08-22 8:10:38 PM
* Copyright (c) 2013 明河; Licensed  */
KISSY.add("gallery/butterfly/1.4/plugin/bidi",function(a,b,c){var d,e,f;return d=b.all,f=function(a,b){return b=a.getDOMNode().tagName,b===b},e=function(a){return e.superclass.constructor.call(this,a),this.set("config",a)},a.extend(e,c,{pluginInitializer:function(a){var b,c;return this.set("host",a),(b=this.get("bidi"))?(c=b.model,c.on("render:linkage",function(a){var b,c;return b=a.el,f(b,"SELECT")?(c=b.data("data-ui"),c.sync&&c.sync()):void 0})):!1}},{ATTRS:{pluginId:{value:"bidi"},bidi:{value:""},target:{value:"",getter:function(a){return d(a)}},host:{value:""}}}),e},{requires:["node","base"]});