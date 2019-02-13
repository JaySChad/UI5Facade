/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/commons/DropdownBox','sap/ui/commons/MenuButton','sap/ui/commons/SearchField','sap/ui/commons/ToggleButton','sap/ui/core/Control','./Feeder','./library','./FeedRenderer','sap/ui/commons/Menu','sap/ui/core/theming/Parameters','./FeedChunk'],function(D,M,S,T,C,F,l,a,b,P,c){"use strict";var d=l.FeederType;var e=C.extend("sap.ui.ux3.Feed",{metadata:{library:"sap.ui.ux3",properties:{feederThumbnailSrc:{type:"sap.ui.core.URI",group:"Data",defaultValue:null},feederSender:{type:"string",group:"Data",defaultValue:null},live:{type:"boolean",group:"Behavior",defaultValue:true},title:{type:"string",group:"Data",defaultValue:null}},aggregations:{filterItems:{type:"sap.ui.core.ListItem",multiple:true,singularName:"filterItem",bindable:"bindable"},chunks:{type:"sap.ui.ux3.FeedChunk",multiple:true,singularName:"chunk",bindable:"bindable"},toolsMenuItems:{type:"sap.ui.commons.MenuItem",multiple:true,singularName:"toolsMenuItem",bindable:"bindable"}},events:{filterChange:{parameters:{newValue:{type:"string"}}},search:{parameters:{query:{type:"string"}}},chunkAdded:{parameters:{chunk:{type:"sap.ui.ux3.FeedChunk"}}},toolsItemSelected:{parameters:{itemId:{type:"string"},item:{type:"sap.ui.unified.MenuItemBase"}}},toggleLive:{parameters:{live:{type:"boolean"}}}}}});e.prototype.init=function(){this.rb=sap.ui.getCore().getLibraryResourceBundle("sap.ui.ux3");this.data("sap-ui-fastnavgroup","true",true);this.oFeeder=new F(this.getId()+'-Feeder',{type:d.Medium}).setParent(this);this.oFeeder.attachEvent('submit',this.handleFeederSubmit,this);this.oLiveButton=new T(this.getId()+'-liveButton',{text:this.rb.getText('FEED_LIVE'),pressed:this.getLive(),lite:true}).setParent(this);this.oLiveButton.attachEvent('press',this.handleLiveButtonPress,this);this.oFilter=new D(this.getId()+'-filter').setParent(this);this.oFilter.attachEvent('change',this.handleFilterChange,this);this.oSearchField=new S(this.getId()+'-search',{enableListSuggest:false}).setParent(this);this.oSearchField.attachEvent('search',this.handleSearchFieldSearch,this);};e.prototype.initToolsButton=function(){if(!this.oToolsButton){this.oToolsButton=new M(this.getId()+'-toolsButton',{tooltip:this.rb.getText('FEED_TOOLS'),lite:true,menu:new b(this.getId()+'-toolsMenu')}).setParent(this);this.oToolsButton.attachEvent('itemSelected',this.handleLtoolsButtonSelected,this);var i=P._getThemeImage('_sap_ui_ux3_Feed_ToolsIconUrl');var I=P._getThemeImage('_sap_ui_ux3_Feed_ToolsIconHoverUrl');if(i){this.oToolsButton.setProperty('icon',i,true);}if(I){this.oToolsButton.setProperty('iconHovered',I,true);}}};e.prototype.exit=function(){if(this.oFeeder){this.oFeeder.destroy();delete this.oFeeder;}if(this.oLiveButton){this.oLiveButton.destroy();delete this.oLiveButton;}if(this.oToolsButton){this.oToolsButton.destroy();delete this.oToolsButton;}if(this.oFilter){this.oFilter.destroy();delete this.oFilter;}if(this.oSearchField){this.oSearchField.destroy();delete this.oSearchField;}this.rb=undefined;};e.prototype.handleFeederSubmit=function(E){var o=new Date();var s=String(o);var n=new c(this.getId()+'-new-'+this.getChunks().length,{text:E.getParameter('text'),commentChunk:false,deletionAllowed:true,timestamp:s,sender:this.getFeederSender(),thumbnailSrc:this.getFeederThumbnailSrc()});this.insertChunk(n,0);this.fireChunkAdded({chunk:n});};e.prototype.handleLiveButtonPress=function(E){var p=E.getParameter("pressed");this.setProperty("live",p,true);this.fireToggleLive({live:p});};e.prototype.handleLtoolsButtonSelected=function(E){this.fireToolsItemSelected(E.mParameters);};e.prototype.handleFilterChange=function(E){this.fireFilterChange(E.mParameters);};e.prototype.handleSearchFieldSearch=function(E){this.fireSearch(E.mParameters);};e.prototype.setFeederThumbnailSrc=function(f){this.setProperty("feederThumbnailSrc",f,true);this.oFeeder.setThumbnailSrc(f);return this;};e.prototype.setLive=function(L){this.setProperty("live",L,true);this.oLiveButton.setPressed(L);return this;};e.prototype.getToolsMenuItems=function(){if(this.oToolsButton){return this.oToolsButton.getMenu().getItems();}};e.prototype.insertToolsMenuItem=function(t,i){this.initToolsButton();this.oToolsButton.getMenu().insertItem(t,i);return this;};e.prototype.addToolsMenuItem=function(t){this.initToolsButton();this.oToolsButton.getMenu().addItem(t);return this;};e.prototype.removeToolsMenuItem=function(t){if(this.oToolsButton){return this.oToolsButton.getMenu().removeItem(t);}};e.prototype.removeAllToolsMenuItems=function(){if(this.oToolsButton){return this.oToolsButton.getMenu().removeAllItems();}};e.prototype.indexOfToolsMenuItem=function(t){if(this.oToolsButton){return this.oToolsButton.getMenu().indexOfItem(t);}};e.prototype.destroyToolsMenuItems=function(){if(this.oToolsButton){this.oToolsButton.getMenu().destroyItems();}return this;};e.prototype.bindToolsMenuItems=function(p,t,s,f){this.initToolsButton();this.oToolsButton.getMenu().bindItems(p,t,s,f);return this;};e.prototype.unbindToolsMenuItems=function(){if(this.oToolsButton){this.oToolsButton.getMenu().unbindItems();}return this;};e.prototype.getFilterItems=function(){return this.oFilter.getItems();};e.prototype.insertFilterItem=function(f,i){this.oFilter.insertItem(f,i);return this;};e.prototype.addFilterItem=function(f){this.oFilter.addItem(f);return this;};e.prototype.removeFilterItem=function(f){return this.oFilter.removeItem(f);};e.prototype.removeAllFilterItems=function(){return this.oFilter.removeAllItems();};e.prototype.indexOfFilterItem=function(f){return this.oFilter.indexOfItem(f);};e.prototype.destroyFilterItems=function(){this.oFilter.destroyItems();return this;};e.prototype.bindFilterItems=function(p,t,s,f){this.oFilter.bindItems(p,t,s,f);return this;};e.prototype.unbindFilterItems=function(){this.oFilter.unbindItems();return this;};return e;});
