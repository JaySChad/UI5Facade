/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/commons/CalloutBaseRenderer','sap/ui/core/Renderer','sap/ui/core/IconPool'],function(C,R,I){"use strict";var Q=R.extend(C);Q.renderContent=function(r,c){var a=sap.ui.getCore().getConfiguration().getAccessibility();var t=c.getType(),n=c.getFirstTitle(),h=c.getFirstTitleHref(),i=c.getIcon(),d=c.getSecondTitle(),w=c.getWidth(),s=c.getId(),b=c.getTooltip_AsString(),o;r.write("<div");if(b){r.writeAttributeEscaped("title",b);}if(a){r.writeAttribute("role","dialog");r.writeAttribute("aria-labelledby",s+"-title");}r.addClass("sapUiUx3QV");r.writeClasses();if(w){r.addStyle("width",w);r.writeStyles();}r.write(">");r.write("<div");r.writeAttribute("id",s+"-title");r.writeAttribute("tabindex","-1");r.addClass("sapUiUx3QVHeader");r.writeClasses();r.write(">");r.writeEscaped(t);r.write("</div>");if(i||n||d){r.write("<div");if(a){r.writeAttribute("role","heading");}r.addClass("sapUiUx3QVHeading");r.writeClasses();r.write(">");if(i){if(I.isIconURI(i)){o={title:n,tabindex:"-1"};}r.writeIcon(i,"sapUiUx3QVIcon",o);}r.write("<span");r.writeAttribute("id",s+"-name");if(a&&d){r.writeAttribute("aria-describedby",s+"-descr");}r.addClass("sapUiUx3QVTitle1");r.writeClasses();r.write(">");if(h){r.write("<a");r.writeAttribute("id",s+"-link");r.writeAttributeEscaped("href",h);r.writeAttribute("tabindex","-1");r.write(">");}r.writeEscaped(n||"");if(h){r.write("</a>");}r.write("</span>");if(d){r.write("<br><span");r.writeAttribute("id",s+"-descr");r.writeAttribute("tabindex","-1");r.addClass("sapUiUx3QVTitle2");r.writeClasses();r.write(">");r.writeEscaped(d);r.write("</span>");}r.write("</div>");}r.write("<div id=\""+s+"-content\">");this.renderBody(r,c);r.write("</div>");r.write("</div>");if(c.getShowActionBar()&&c.getActionBar()){r.renderControl(c.getActionBar());}};Q.renderBody=function(r,c){var a=c.getContent();for(var i=0;i<a.length;i++){r.write("<div class=\"sapUiUx3QVBody\">");if(a[i]instanceof sap.ui.core.Control){r.renderControl(a[i]);}else if(a[i].getContent&&typeof a[i].getContent=="function"){var b=a[i].getContent();for(var j=0;j<b.length;j++){if(b[j]instanceof sap.ui.core.Control){r.renderControl(b[j]);}}}r.write("</div>");}};return Q;},true);
