/*! butterfly - v1.4 - 2013-08-26 4:56:53 PM
* Copyright (c) 2013 明河; Licensed  */
KISSY.add("gallery/butterfly/1.4/index",function(a,b,c){var d,e;return d=b.all,e=c.extend({constructor:function(a,b){var c;return null==b&&(b={}),c=this,e.superclass.constructor.call(c,b),c.set("target",a)},render:function(){return this._eachEl()},field:function(){},_eachEl:function(){var b,c,d,e,f,g;return g=this,d=g.get("target"),d.length?(f=d.getDOMNode().elements,a.each(f,function(){}),b=d.all("input"),b.each(function(a){return g.fire("inputEach",{$el:a})}),c=d.all("select"),c.each(function(a){return a.attr("type","select"),g.fire("selectEach",{$el:a})}),e=d.all("textarea"),e.each(function(a){return a.attr("type")||a.attr("type","textarea"),g.fire("textareaEach",{$el:a})})):!1}},{ATTRS:{target:{value:"",getter:function(a){return d(a)}},uis:{value:{}}}})},{requires:["node","rich-base"]});