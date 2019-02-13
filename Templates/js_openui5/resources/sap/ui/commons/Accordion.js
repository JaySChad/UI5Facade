/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/thirdparty/jquery','./library','sap/ui/core/Control','./AccordionRenderer','sap/ui/dom/jquery/control','sap/ui/thirdparty/jqueryui/jquery-ui-core','sap/ui/thirdparty/jqueryui/jquery-ui-widget','sap/ui/thirdparty/jqueryui/jquery-ui-mouse','sap/ui/thirdparty/jqueryui/jquery-ui-sortable'],function(q,l,C,A){"use strict";var a=C.extend("sap.ui.commons.Accordion",{metadata:{library:"sap.ui.commons",properties:{width:{type:"sap.ui.core.CSSSize",group:"Misc",defaultValue:'200px'},openedSectionsId:{type:"string",group:"Misc",defaultValue:null}},defaultAggregation:"sections",aggregations:{sections:{type:"sap.ui.commons.AccordionSection",multiple:true,singularName:"section"}},events:{sectionOpen:{parameters:{openSectionId:{type:"string"},closeSectionIds:{type:"string[]"}}},sectionClose:{parameters:{closeSectionId:{type:"string"}}},sectionsReorder:{parameters:{movedSectionId:{type:"string"},newIndex:{type:"int"}}}}}});a.CARD_1=1;a.CARD_0_1=2;a.aAccordions=[];a.prototype.init=function(){this.bInitialRendering=true;this.activationMode=a.CARD_1;this.rb=sap.ui.getCore().getLibraryResourceBundle("sap.ui.commons");this.aSectionTitles=[];a.aAccordions.push(this);};a.prototype.onsapspace=function(e){this.onclick(e);};a.prototype.onsappagedownmodifiers=function(e){var t=q(e.target);var p=t.parentsUntil('.sapUiAcd');var d=p[p.length-1];var n=q(d).next();while(!this.getCorrespondingSection(n[0]).getEnabled()){n=n.next();}n=n[0];this.openSection(n.id);var s=this.getSections();s[this.__idxOfSec(n.id)].focus();e.preventDefault();e.stopPropagation();};a.prototype.onsappageupmodifiers=function(e){var t=q(e.target);var p=t.parentsUntil('.sapUiAcd');var s=p[p.length-1];var n=q(s).prev();while(!this.getCorrespondingSection(n[0]).getEnabled()){n=n.prev();}n=n[0];this.openSection(n.id);var S=this.getSections();S[this.__idxOfSec(n.id)].focus();e.preventDefault();e.stopPropagation();};a.prototype.onsapupmodifiers=function(e){e.preventDefault();e.stopPropagation();var p=q(e.target).parentsUntil('.sapUiAcd');var d=p[p.length-1];if(this.__idxOfSec(d.id)===0){return;}var D=q(d).prev().first()[0];var i=false;if(this.__idxOfSec(D.id)===0){i=true;}this.dropSection(d,D,i);var s=this.getSections();s[this.__idxOfSec(d.id)].focus();};a.prototype.onsapdownmodifiers=function(e){e.preventDefault();e.stopPropagation();var p=q(e.target).parentsUntil('.sapUiAcd');var d=p[p.length-1];if(this.__idxOfSec(d.id)==this.getSections().length-1){return;}var D=q(d).next().first()[0];this.dropSection(d,D,false);var s=this.getSections();s[this.__idxOfSec(d.id)].focus();};a.prototype.onsapprevious=function(e){if(e.srcControl.getMetadata().getName()!="sap.ui.commons.AccordionSection"){return;}e.preventDefault();e.stopPropagation();var c=this.getCurrentSection(e.target),n=null;if(c.id==this.getSections()[0].getId()){n=q(c).find("div.sapUiAcdSectionHdr");if(n){n.focus();}}if(c){var p=q(c).prev();while(p&&q(p).hasClass("sapUiAcdSectionDis")){p=q(p).prev();}if(p){n=q(p).find("div.sapUiAcdSectionHdr");if(n){n.focus();}}}};a.prototype.onsapnext=function(e){if(e.srcControl.getMetadata().getName()!="sap.ui.commons.AccordionSection"){return;}e.preventDefault();e.stopPropagation();var c=this.getCurrentSection(e.target);if(c){var n=q(c).next();while(n&&q(n).hasClass("sapUiAcdSectionDis")){n=q(n).next();}if(n){var N=q(n).find("div.sapUiAcdSectionHdr");if(N){N.focus();}}}};a.prototype.onsaphome=function(e){e.preventDefault();e.stopPropagation();var f=this.getSections()[0].getDomRef();if(q(f).hasClass("sapUiAcdSectionDis")){f=q(f).next();while(f&&q(f).hasClass("sapUiAcdSectionDis")){f=q(f).next();}}if(f){var n=q(f).find("div.sapUiAcdSectionHdr");if(n){n.focus();}}};a.prototype.onsapend=function(e){e.preventDefault();e.stopPropagation();var n=this.getSections().length;var f=this.getSections()[n-1].getDomRef();if(q(f).hasClass("sapUiAcdSectionDis")){f=q(f).prev();while(f&&q(f).hasClass("sapUiAcdSectionDis")){f=q(f).prev();}}if(f){var N=q(f).find("div.sapUiAcdSectionHdr");if(N){N.focus();}}};a.prototype.getCurrentSection=function(d){var c=d;while(!q(c).hasClass("sapUiAcdSection")){c=q(c).parent();}return c[0];};a.prototype.dropSection=function(d,D,b){var o=q(d).parent()[0];var c=q(o).children(".sapUiAcdSection").toArray();var i=q.inArray(D,c);if(b){i-=1;}this.moveSection(d.id,i);};a.prototype.moveSection=function(s,t){var o=this.__idxOfSec(s);if(t==o){return;}var S=this.aSectionTitles[o];this.aSectionTitles.splice(o,1);var b=this.getSections();var c=b[o];this.removeSection(o,true);if(t!=-1){this.aSectionTitles.splice(t,0,S);}else{this.aSectionTitles.splice(0,0,S);}this.insertSection(c,t,true);this.fireSectionsReorder({movedSectionId:s,newIndex:t});};a.prototype._onSortChange=function(e,u){e.preventDefault();e.stopPropagation();var d=u.item[0];var S=u.item[0].getAttribute("Id");var D=q(d).parent()[0];var c=q(D).children(".sapUiAcdSection").toArray();var i=q.inArray(d,c);this.moveSection(S,i);};a.prototype.onclick=function(e){if(e.srcControl.getId()==this.getId()){return;}var t=q(e.target);if(t.hasClass("sapUiAcdSectionCont")){return;}if(!(q(e.target).control(0)instanceof sap.ui.commons.AccordionSection)){return;}var d=e.srcControl.getDomRef();var s=this.getCorrespondingSection(d);if(s&&!s.getEnabled()){return;}if(e.srcControl.getCollapsed()){this.openSection(d.id);}else{this.closeSection(d.id);}e.preventDefault();e.stopPropagation();var S=this.getSections();S[this.__idxOfSec(d.id)].focus();};a.prototype.openSection=function(s){var i=this.__idxOfSec(s);var S=this.getSections(),c=[];if(this.activationMode==a.CARD_0_1||this.activationMode==a.CARD_1){c=this.closeOpenedSections();}S[i]._setCollapsed(false);this.fireSectionOpen({openSectionId:s,closeSectionIds:c});};a.prototype.closeSection=function(s){var i=this.__idxOfSec(s);var S=this.getSections();S[i]._setCollapsed(true);this.fireSectionClose({closeSectionId:s});};a.prototype.closeOpenedSections=function(){var c=[];var s=this.getSections();for(var i=0;i<s.length;i++){if(!s[i].getCollapsed()){s[i]._setCollapsed(true);c.push(s[i].getId());}}return c;};a.prototype.openDefaultSections=function(){var s=this.getSections();var d=this.getOpenedSectionsId().split(",");for(var i=0;i<d.length;i++){var o=s[this.__idxOfSec(d[i])];o._setCollapsed(false);}};a.prototype.getNumberOfOpenedSections=function(){var o=0;var s=this.getSections();for(var i=0;i<s.length;i++){if(s[i].getCollapsed()==false){o++;}}return o;};a.prototype.addSection=function(s){this.addAggregation("sections",s);if((this.getOpenedSectionsId()==null||this.getOpenedSectionsId()=="")&&s.getEnabled()){this.setOpenedSectionsId(s.getId());}this.aSectionTitles.push(s.getTitle());};a.prototype.__idxOfSec=function(s){if(typeof(s)=="string"){s=sap.ui.getCore().byId(s);}return this.indexOfSection(s);};a.prototype.setOpenedSectionsId=function(o){var s=this.getSections();var d=o.split(",");if(d.length==1){if(this.__idxOfSec(o)<0){this.setProperty("openedSectionsId",o);return this;}if(s[this.__idxOfSec(o)].getEnabled()){this.setProperty("openedSectionsId",o);}else{for(var i=0;i<s.length;i++){if(s[i].getEnabled()){this.setProperty("openedSectionsId",s[i].getId());return this;}}}}else if(d.length==0){return this;}else{var c;for(var i=0;i<d.length;i++){if(s[this.__idxOfSec(d[i])].getEnabled()){if(c){c+=","+d[i];}else{c=d[i];}}}if(c){this.setProperty("openedSectionsId",c);}}return this;};a.prototype.getCorrespondingSection=function(d){if(q(d).hasClass("sapUiAcdSection")){var b=q(d).parent();var o=b[0];var s=q(o).children();var i=s.index(d);var c=this.getSections();return c[i-1];}};a.prototype.isLastSection=function(s){var S=this.getSections();return(q.inArray(s,S)===S.length-1);};a.prototype.onAfterRendering=function(){var c=sap.ui.getCore(),t=this;function b(){var d=t.getDomRef();d.style.height=d.clientHeight-7+"px";}if(c.isThemeApplied()){b();}else{c.attachThemeChanged(b,this);}this.$().sortable({handle:"> div.sapUiAcdSectionHdr > div",stop:q.proxy(this._onSortChange,this)});};return a;});
