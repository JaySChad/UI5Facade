/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/core/format/DateFormat','sap/ui/model/SimpleType','sap/ui/model/FormatException','sap/ui/model/ParseException','sap/ui/model/ValidateException',"sap/ui/thirdparty/jquery"],function(D,S,F,P,V,q){"use strict";var a=S.extend("sap.ui.model.type.Date",{constructor:function(){S.apply(this,arguments);this.sName="Date";}});a.prototype.formatValue=function(v,i){var f;switch(this.getPrimitiveType(i)){case"string":case"any":if(v==null){return"";}if(this.oFormatOptions.source&&this.oFormatOptions.source.pattern!=="timestamp"&&v===""){return"";}f=this.getModelFormat();v=f.parse(v);return this.oOutputFormat.format(v);default:throw new F("Don't know how to format Date to "+i);}};a.prototype.parseValue=function(v,i){var r,b;switch(this.getPrimitiveType(i)){case"string":if(v===""){return null;}var r=this.oOutputFormat.parse(v);if(!r){b=sap.ui.getCore().getLibraryResourceBundle();throw new P(b.getText(this.sName+".Invalid"));}if(this.oInputFormat){if(this.oFormatOptions.source.pattern=="timestamp"){r=r.getTime();}else{r=this.oInputFormat.format(r);}}return r;default:throw new P("Don't know how to parse Date from "+i);}};a.prototype.validateValue=function(v){if(this.oConstraints){var b=sap.ui.getCore().getLibraryResourceBundle(),c=[],m=[],i=this.oInputFormat,C,d=this;if(i&&this.oFormatOptions.source.pattern!="timestamp"){v=i.parse(v);}q.each(this.oConstraints,function(n,o){if(i){o=i.parse(o);}C=d.oOutputFormat.format(o);switch(n){case"minimum":if(v<o){c.push("minimum");m.push(b.getText(d.sName+".Minimum",[C]));}break;case"maximum":if(v>o){c.push("maximum");m.push(b.getText(d.sName+".Maximum",[C]));}break;}});if(c.length>0){throw new V(this.combineMessages(m),c);}}};var t={format:function(v){if(v instanceof Date){return v.getTime();}return null;},parse:function(v){if(typeof(v)!="number"){if(isNaN(v)){throw new F("Cannot format date: "+v+" is not a valid Timestamp");}else{v=parseInt(v);}}v=new Date(v);return v;}};a.prototype.getModelFormat=function(){if(this.oInputFormat){if(this.oFormatOptions.source.pattern=="timestamp"){return t;}else{return this.oInputFormat;}}else{return S.prototype.getModelFormat.call(this);}};a.prototype.setFormatOptions=function(f){this.oFormatOptions=f;this._createFormats();};a.prototype.getOutputPattern=function(){return this.oOutputFormat.oFormatOptions.pattern;};a.prototype._handleLocalizationChange=function(){this._createFormats();};a.prototype._createFormats=function(){var s=this.oFormatOptions.source;this.oOutputFormat=D.getInstance(this.oFormatOptions);if(s){if(q.isEmptyObject(s)){s={pattern:"yyyy-MM-dd"};}this.oInputFormat=D.getInstance(s);}};return a;});
