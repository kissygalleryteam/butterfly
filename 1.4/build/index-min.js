/*! butterfly - v1.4 - 2013-09-11 2:06:29 PM
* Copyright (c) 2013 明河; Licensed  */
KISSY.add("gallery/butterfly/1.4/index",function(a,b,c){var d,e;return d=b.all,e=c.extend({constructor:function(a,b){var c;return null==b&&(b={}),c=this,e.superclass.constructor.call(c,b),c.set("target",a)},render:function(){return this._eachEl()},field:function(){},_eachEl:function(){var b,c,e;return e=this,b=e.get("target"),b.length?(c=b.getDOMNode().elements,a.each(c,function(b){var c,f,g;switch(c=d(b),g=c.attr("type"),b.tagName){case"INPUT":if(f=["button","submit"],!a.isArray(g,f))return e.fire("inputEach",{$el:c});break;case"SELECT":return c.attr("type","select"),e.fire("selectEach",{$el:c});case"TEXTAREA":return c.attr("type","textarea"),e.fire("textareaEach",{$el:c})}}),this):!1}},{ATTRS:{target:{value:"",getter:function(a){return d(a)}},uis:{value:{}}}})},{requires:["node","rich-base"]});