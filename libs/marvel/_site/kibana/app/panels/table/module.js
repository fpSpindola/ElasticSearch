/*! kibana - v3.0.0milestone5 - 2014-05-12
 * Copyright (c) 2014 Rashid Khan; Licensed Apache License */

define("panels/table/module",["angular","app","lodash","kbn","moment"],function(a,b,c,d,e){var f=a.module("kibana.panels.table",[]);b.useModule(f),f.controller("table",["$rootScope","$scope","$modal","$q","$compile","fields","querySrv","dashboard","filterSrv",function(b,e,f,g,h,i,j,k,l){e.panelMeta={modals:[{description:"Inspect",icon:"icon-info-sign",partial:"app/partials/inspector.html",show:e.panel.spyable}],editorTabs:[{title:"Paging",src:"app/panels/table/pagination.html"},{title:"Queries",src:"app/partials/querySelect.html"}],status:"Stable",description:"A paginated table of records matching your query or queries. Click on a row to expand it and review all of the fields associated with that document. <p>"};var m={size:100,pages:5,offset:0,sort:["_score","desc"],overflow:"min-height",fields:[],highlight:[],sortable:!0,header:!0,paging:!0,field_list:!0,all_fields:!1,trimFactor:300,localTime:!1,timeField:"@timestamp",spyable:!0,queries:{mode:"all",ids:[]},style:{"font-size":"9pt"},normTimes:!0};c.defaults(e.panel,m),e.init=function(){e.columns={},c.each(e.panel.fields,function(a){e.columns[a]=!0}),e.Math=Math,e.identity=a.identity,e.$on("refresh",function(){e.get_data()}),e.fields=i,e.get_data()},e.percent=d.to_percent,e.termsModal=function(a,b){e.modalField=a,n('{"height":"300px","chart":"'+b+'","field":"'+a+'"}',"terms")},e.statsModal=function(a){e.modalField=a,n('{"field":"'+a+'"}',"statistics")};var n=function(a,b){e.facetPanel=a,e.facetType=b;var c=f({template:"./app/panels/table/modal.html",persist:!0,show:!1,scope:e,keyboard:!1});g.when(c).then(function(a){a.modal("show")})};e.toggle_micropanel=function(a,b){var f=c.map(e.data,function(a){return a.kibana._source}),g=d.top_field_values(f,a,10,b);e.micropanel={field:a,grouped:b,values:g.counts,hasArrays:g.hasArrays,related:d.get_related_fields(f,a),limit:10,count:c.countBy(f,function(b){return c.contains(c.keys(b),a)})["true"]}},e.micropanelColor=function(a){var b=["bar-success","bar-warning","bar-danger","bar-info","bar-primary"];return a>b.length?"":b[a]},e.set_sort=function(a){e.panel.sort[0]===a?e.panel.sort[1]="asc"===e.panel.sort[1]?"desc":"asc":e.panel.sort[0]=a,e.get_data()},e.toggle_field=function(a){c.indexOf(e.panel.fields,a)>-1?(e.panel.fields=c.without(e.panel.fields,a),delete e.columns[a]):(e.panel.fields.push(a),e.columns[a]=!0)},e.toggle_highlight=function(a){c.indexOf(e.panel.highlight,a)>-1?e.panel.highlight=c.without(e.panel.highlight,a):e.panel.highlight.push(a)},e.toggle_details=function(a){a.kibana.details=a.kibana.details?!1:!0,a.kibana.view=a.kibana.view||"table"},e.page=function(a){e.panel.offset=a*e.panel.size,e.get_data()},e.build_search=function(b,d,f){var g;c.isArray(d)?g="("+c.map(d,function(b){return a.toJson(b)}).join(" AND ")+")":c.isUndefined(d)?(g="*",f=!f):g=a.toJson(d),e.panel.offset=0,l.set({type:"field",field:b,query:g,mandate:f?"mustNot":"must"})},e.fieldExists=function(a,b){l.set({type:"exists",field:a,mandate:b})},e.get_data=function(a,b){var f,g,h,i,m;e.panel.error=!1,0!==k.indices.length&&(m=[e.ejs.Sort(e.panel.sort[0]).order(e.panel.sort[1])],e.panel.localTime&&m.push(e.ejs.Sort(e.panel.timeField).order(e.panel.sort[1])),e.panelMeta.loading=!0,f=c.isUndefined(a)?0:a,e.segment=f,g=e.ejs.Request().indices(k.indices[f]),e.panel.queries.ids=j.idsByMode(e.panel.queries),i=j.getQueryObjs(e.panel.queries.ids),h=e.ejs.BoolQuery(),c.each(i,function(a){h=h.should(j.toEjsObj(a))}),g=g.query(e.ejs.FilteredQuery(h,l.getBoolFilter(l.ids))).highlight(e.ejs.Highlight(e.panel.highlight).fragmentSize(2147483647).preTags("@start-highlight@").postTags("@end-highlight@")).size(e.panel.size*e.panel.pages).sort(m),e.populate_modal(g),g.doSearch().then(function(a){return e.panelMeta.loading=!1,0===f&&(e.hits=0,e.data=[],e.current_fields=[],b=e.query_id=(new Date).getTime()),c.isUndefined(a.error)?void(e.query_id===b&&(e.data=e.data.concat(c.map(a.hits.hits,function(a){var b=c.clone(a),f=c.omit(a,"_source","sort","_score");return b.kibana={_source:c.extend(d.flatten_json(a._source),f),highlight:d.flatten_json(a.highlight||{})},e.current_fields=e.current_fields.concat(c.keys(b.kibana._source)),b})),e.current_fields=c.uniq(e.current_fields),e.hits+=a.hits.total,e.data=c.sortBy(e.data,function(a){return c.isUndefined(a.sort)?a._score:a.sort[0]}),"desc"===e.panel.sort[1]&&e.data.reverse(),e.data=e.data.slice(0,e.panel.size*e.panel.pages),(e.data.length<e.panel.size*e.panel.pages||!c.contains(l.timeField(),e.panel.sort[0])||"desc"!==e.panel.sort[1])&&f+1<k.indices.length&&e.get_data(f+1,e.query_id))):void(e.panel.error=e.parse_error(a.error))}))},e.populate_modal=function(b){e.inspector=a.toJson(JSON.parse(b.toString()),!0)},e.without_kibana=function(a){var b=c.clone(a);return delete b.kibana,b},e.set_refresh=function(a){e.refresh=a},e.close_edit=function(){e.refresh&&e.get_data(),e.columns=[],c.each(e.panel.fields,function(a){e.columns[a]=!0}),e.refresh=!1},e.locate=function(a,b){b=b.split(".");for(var c=/(.+)\[(\d+)\]/,d=0;d<b.length;d++){var e=c.exec(b[d]);a=e?a[e[1]][parseInt(e[2],10)]:a[b[d]]}return a}}]),f.filter("tableHighlight",function(){return function(a){return!c.isUndefined(a)&&!c.isNull(a)&&a.toString().length>0?a.toString().replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\r?\n/g,"<br/>").replace(/@start-highlight@/g,'<code class="highlight">').replace(/@end-highlight@/g,"</code>"):""}}),f.filter("tableTruncate",function(){return function(a,b,d){return!c.isUndefined(a)&&!c.isNull(a)&&a.toString().length>0?a.length>b/d?a.substr(0,b/d)+"...":a:""}}),f.filter("tableJson",function(){var b;return function(d,e){return!c.isUndefined(d)&&!c.isNull(d)&&d.toString().length>0?(b=a.toJson(d,e>0?!0:!1),b=b.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"),e>1&&(b=b.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,function(a){var b="number";return/^"/.test(a)?b=/:$/.test(a)?"key strong":"":/true|false/.test(a)?b="boolean":/null/.test(a)&&(b="null"),'<span class="'+b+'">'+a+"</span>"})),b):""}}),f.filter("tableLocalTime",function(){return function(a,b){return e(b.sort[1]).format("YYYY-MM-DDTHH:mm:ss.SSSZ")}})});