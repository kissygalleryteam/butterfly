/*! butterfly - v1.4 - 2013-09-12 4:57:37 PM
* Copyright (c) 2013 明河; Licensed  */
KISSY.add("gallery/butterfly/1.4/plugin/bidi",function(a,b,c){var d,e,f;return d=b.all,f=function(a,b){var c;return a&&a.length?(c=a.getDOMNode().tagName,c===b):!1},e=function(a){return e.superclass.constructor.call(this,a),this.set("config",a)},a.extend(e,c,{pluginInitializer:function(b){var c,d;return this.set("host",b),(c=this.get("bidi"))?(d=c.model,d.on("render:linkage",function(b){var c,d;return c=b.el,f(c,"SELECT")&&(d=c.data("data-ui"),d&&a.isFunction(d.sync))?d.sync():void 0})):!1}},{ATTRS:{pluginId:{value:"bidi"},bidi:{value:""},target:{value:"",getter:function(a){return d(a)}},host:{value:""}}}),e},{requires:["node","base"]});