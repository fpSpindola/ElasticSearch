/*! kibana - v3.0.0milestone5 - 2014-05-12
 * Copyright (c) 2014 Rashid Khan; Licensed Apache License */

define("panels/trends/module",["angular","app","lodash","kbn"],function(a,b,c,d){var e=a.module("kibana.panels.trends",[]);b.useModule(e),e.controller("trends",["$scope","kbnIndex","querySrv","dashboard","filterSrv",function(b,e,f,g,h){function i(a,b){return 0===a?null:100*(b-a)/a}b.panelMeta={modals:[{description:"Inspect",icon:"icon-info-sign",partial:"app/partials/inspector.html",show:b.panel.spyable}],editorTabs:[{title:"Queries",src:"app/partials/querySelect.html"}],status:"Beta",description:'A stock-ticker style representation of how queries are moving over time. For example, if the time is 1:10pm, your time picker was set to "Last 10m", and the "Time Ago" parameter was set to \'1h\', the panel would show how much the query results have changed since 12:00-12:10pm'};var j={ago:"1d",arrangement:"vertical",spyable:!0,queries:{mode:"all",ids:[]},style:{"font-size":"14pt"}};c.defaults(b.panel,j),b.init=function(){b.hits=0,b.$on("refresh",function(){b.get_data()}),b.get_data()},b.get_data=function(i,j){if(delete b.panel.error,b.panelMeta.loading=!0,0!==g.indices.length){b.index=i>0?b.index:g.indices;var l=c.uniq(c.pluck(h.getByType("time"),"field"));if(l.length>1)return void(b.panel.error="Time field must be consistent amongst time filters");if(0===l.length)return void(b.panel.error="A time filter must exist for this panel to function");l=l[0],b.time=h.timeRange("last"),b.old_time={from:new Date(b.time.from.getTime()-d.interval_to_ms(b.panel.ago)),to:new Date(b.time.to.getTime()-d.interval_to_ms(b.panel.ago))};var m=c.isUndefined(i)?0:i,n=b.ejs.Request(),o=c.difference(h.ids,h.idsByType("time"));b.panel.queries.ids=f.idsByMode(b.panel.queries);var p=f.getQueryObjs(b.panel.queries.ids);c.each(p,function(a){var c=b.ejs.FilteredQuery(f.toEjsObj(a),h.getBoolFilter(o).must(b.ejs.RangeFilter(l).from(b.time.from).to(b.time.to)));n=n.facet(b.ejs.QueryFacet(a.id).query(c)).size(0)}),c.each(p,function(a){var c=b.ejs.FilteredQuery(f.toEjsObj(a),h.getBoolFilter(o).must(b.ejs.RangeFilter(l).from(b.old_time.from).to(b.old_time.to)));n=n.facet(b.ejs.QueryFacet("old_"+a.id).query(c)).size(0)}),b.inspector=a.toJson(JSON.parse(n.toString()),!0),0===m?e.indices(b.old_time.from,b.old_time.to,g.current.index.pattern,g.current.index.interval).then(function(a){b.index=c.union(a,b.index),n=n.indices(b.index[m]),k(n.doSearch(),m,j)}):k(n.indices(b.index[m]).doSearch(),m,j)}};var k=function(a,d,e){a.then(function(a){if(b.panelMeta.loading=!1,0===d&&(b.hits={},b.data=[],e=b.query_id=(new Date).getTime()),!c.isUndefined(a.error))return void(b.panel.error=b.parse_error(a.error));if(b.query_id===e){var g=0,h=f.getQueryObjs(b.panel.queries.ids);c.each(h,function(e){var f=a.facets[e.id].count,h=a.facets["old_"+e.id].count,j={"new":c.isUndefined(b.data[g])||0===d?f:b.data[g].hits.new+f,old:c.isUndefined(b.data[g])||0===d?h:b.data[g].hits.old+h};b.hits.new+=f,b.hits.old+=h;var k=null==i(j.old,j.new)?"?":Math.round(100*i(j.old,j.new))/100;b.data[g]={info:e,hits:{"new":j.new,old:j.old},percent:k},g++}),b.$emit("render"),d<b.index.length-1?b.get_data(d+1,e):b.trends=b.data}})};b.set_refresh=function(a){b.refresh=a},b.close_edit=function(){b.refresh&&b.get_data(),b.refresh=!1,b.$emit("render")}}])});