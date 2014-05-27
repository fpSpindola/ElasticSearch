/*! kibana - v3.0.0milestone5 - 2014-05-12
 * Copyright (c) 2014 Rashid Khan; Licensed Apache License */

!function(a){function b(a,b){return b*Math.floor(a/b)}function c(a,b,c,d){if("function"==typeof a.strftime)return a.strftime(b);var e=function(a,b){return a=""+a,b=""+(null==b?"0":b),1==a.length?b+a:a},f=[],g=!1,h=a.getHours(),i=12>h;null==c&&(c=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]),null==d&&(d=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]);var j;j=h>12?h-12:0==h?12:h;for(var k=0;k<b.length;++k){var l=b.charAt(k);if(g){switch(l){case"a":l=""+d[a.getDay()];break;case"b":l=""+c[a.getMonth()];break;case"d":l=e(a.getDate());break;case"e":l=e(a.getDate()," ");break;case"h":case"H":l=e(h);break;case"I":l=e(j);break;case"l":l=e(j," ");break;case"m":l=e(a.getMonth()+1);break;case"M":l=e(a.getMinutes());break;case"q":l=""+(Math.floor(a.getMonth()/3)+1);break;case"S":l=e(a.getSeconds());break;case"y":l=e(a.getFullYear()%100);break;case"Y":l=""+a.getFullYear();break;case"p":l=i?"am":"pm";break;case"P":l=i?"AM":"PM";break;case"w":l=""+a.getDay()}f.push(l),g=!1}else"%"==l?g=!0:f.push(l)}return f.join("")}function d(a){function b(a,b,c,d){a[b]=function(){return c[d].apply(c,arguments)}}var c={date:a};void 0!=a.strftime&&b(c,"strftime",a,"strftime"),b(c,"getTime",a,"getTime"),b(c,"setTime",a,"setTime");for(var d=["Date","Day","FullYear","Hours","Milliseconds","Minutes","Month","Seconds"],e=0;e<d.length;e++)b(c,"get"+d[e],a,"getUTC"+d[e]),b(c,"set"+d[e],a,"setUTC"+d[e]);return c}function e(a,b){if("browser"==b.timezone)return new Date(a);if(b.timezone&&"utc"!=b.timezone){if("undefined"!=typeof timezoneJS&&"undefined"!=typeof timezoneJS.Date){var c=new timezoneJS.Date;return c.setTimezone(b.timezone),c.setTime(a),c}return d(new Date(a))}return d(new Date(a))}function f(d){d.hooks.processOptions.push(function(d){a.each(d.getAxes(),function(a,d){var f=d.options;"time"==f.mode&&(d.tickGenerator=function(a){var c=[],d=e(a.min,f),g=0,i=f.tickSize&&"quarter"===f.tickSize[1]||f.minTickSize&&"quarter"===f.minTickSize[1]?k:j;null!=f.minTickSize&&(g="number"==typeof f.tickSize?f.tickSize:f.minTickSize[0]*h[f.minTickSize[1]]);for(var l=0;l<i.length-1&&!(a.delta<(i[l][0]*h[i[l][1]]+i[l+1][0]*h[i[l+1][1]])/2&&i[l][0]*h[i[l][1]]>=g);++l);var m=i[l][0],n=i[l][1];if("year"==n){if(null!=f.minTickSize&&"year"==f.minTickSize[1])m=Math.floor(f.minTickSize[0]);else{var o=Math.pow(10,Math.floor(Math.log(a.delta/h.year)/Math.LN10)),p=a.delta/h.year/o;m=1.5>p?1:3>p?2:7.5>p?5:10,m*=o}1>m&&(m=1)}a.tickSize=f.tickSize||[m,n];var q=a.tickSize[0];n=a.tickSize[1];var r=q*h[n];"second"==n?d.setSeconds(b(d.getSeconds(),q)):"minute"==n?d.setMinutes(b(d.getMinutes(),q)):"hour"==n?d.setHours(b(d.getHours(),q)):"month"==n?d.setMonth(b(d.getMonth(),q)):"quarter"==n?d.setMonth(3*b(d.getMonth()/3,q)):"year"==n&&d.setFullYear(b(d.getFullYear(),q)),d.setMilliseconds(0),r>=h.minute&&d.setSeconds(0),r>=h.hour&&d.setMinutes(0),r>=h.day&&d.setHours(0),r>=4*h.day&&d.setDate(1),r>=2*h.month&&d.setMonth(b(d.getMonth(),3)),r>=2*h.quarter&&d.setMonth(b(d.getMonth(),6)),r>=h.year&&d.setMonth(0);var s,t=0,u=Number.NaN;do if(s=u,u=d.getTime(),c.push(u),"month"==n||"quarter"==n)if(1>q){d.setDate(1);var v=d.getTime();d.setMonth(d.getMonth()+("quarter"==n?3:1));var w=d.getTime();d.setTime(u+t*h.hour+(w-v)*q),t=d.getHours(),d.setHours(0)}else d.setMonth(d.getMonth()+q*("quarter"==n?3:1));else"year"==n?d.setFullYear(d.getFullYear()+q):d.setTime(u+r);while(u<a.max&&u!=s);return c},d.tickFormatter=function(a,b){var d=e(a,b.options);if(null!=f.timeformat)return c(d,f.timeformat,f.monthNames,f.dayNames);var g,i=b.options.tickSize&&"quarter"==b.options.tickSize[1]||b.options.minTickSize&&"quarter"==b.options.minTickSize[1],j=b.tickSize[0]*h[b.tickSize[1]],k=b.max-b.min,l=f.twelveHourClock?" %p":"",m=f.twelveHourClock?"%I":"%H";g=j<h.minute?m+":%M:%S"+l:j<h.day?k<2*h.day?m+":%M"+l:"%b %d "+m+":%M"+l:j<h.month?"%b %d":i&&j<h.quarter||!i&&j<h.year?k<h.year?"%b":"%b %Y":i&&j<h.year?k<h.year?"Q%q":"Q%q %Y":"%Y";var n=c(d,g,f.monthNames,f.dayNames);return n})})})}var g={xaxis:{timezone:null,timeformat:null,twelveHourClock:!1,monthNames:null}},h={second:1e3,minute:6e4,hour:36e5,day:864e5,month:2592e6,quarter:7776e6,year:525949.2*60*1e3},i=[[1,"second"],[2,"second"],[5,"second"],[10,"second"],[30,"second"],[1,"minute"],[2,"minute"],[5,"minute"],[10,"minute"],[30,"minute"],[1,"hour"],[2,"hour"],[4,"hour"],[8,"hour"],[12,"hour"],[1,"day"],[2,"day"],[3,"day"],[.25,"month"],[.5,"month"],[1,"month"],[2,"month"]],j=i.concat([[3,"month"],[6,"month"],[1,"year"]]),k=i.concat([[1,"quarter"],[2,"quarter"],[1,"year"]]);a.plot.plugins.push({init:f,options:g,name:"time",version:"1.0"}),a.plot.formatDate=c}(jQuery),define("jquery.flot.time",function(){}),define("panels/marvel/stats_table/module",["angular","app","kbn","lodash","jquery","jquery.flot","jquery.flot.time"],function(a,b,c,d,e){function f(a,b){return!d.isNaN(a)&&d.isFinite(a)&&d.isNumber(a)?"bytes"===b.y_format?c.byteFormat(a,b.decimals):"short"===b.y_format?c.shortFormat(a,b.decimals):a.toFixed(b.decimals):a}function g(a){return a.replace(/\.raw$/,"")}var h=a.module("kibana.panels.marvel.stats_table",[]);b.useModule(h);var i;i=function(){},h.controller("marvel.stats_table",["$scope","dashboard","filterSrv","esVersion","$filter","alertSrv",function(a,b,e,h,j,k){function l(b,c){a.meta={masterCount:d.filter(c,{master:!0,alive:!0}).length},a.rows=b,a.data=c,a.updateUIFeaturesBasedOnData(),a.panelMeta.loading=!1,a.calculateWarnings()}function m(a){return encodeURIComponent(a).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",")}a.panelMeta={modals:[],editorTabs:[],status:"Experimental",description:"A stats table for nodes or nodes"};var n={compact:!1,mode:"nodes",sort:null,full_view_row_limit_on_high_refresh:5,data_limit_for_high_refresh:50,data_limit_for_display_names:50};d.defaults(a.panel,n),a.metricEditor={index:-1,add:void 0},a.staleIntervalCount=5,a.modeInfo={nodes:{defaults:{display_field:"node.name",persistent_field:"node.ip_port.raw",metrics:["os.cpu.usage","os.load_average.1m","jvm.mem.heap_used_percent","fs.total.available_in_bytes","fs.total.disk_io_op"],show_hidden:!0},availableMetrics:[{name:"OS CPU (%)",field:"os.cpu.usage",warning:60,error:90},{name:"Load (1m)",field:"os.load_average.1m",warning:8,error:10},{name:"JVM Mem (%)",field:"jvm.mem.heap_used_percent",warning:90,error:95},{name:"Disk Free Space",field:"fs.total.available_in_bytes",warning:{threshold:53687091200,type:"lower_bound"},error:{threshold:21474836480,type:"lower_bound"},y_format:"bytes"},{name:"IOps",field:"fs.total.disk_io_op",derivative:!0}]},indices:{defaults:{display_field:null,persistent_field:"index.raw",metrics:["primaries.docs.count","primaries.indexing.index_total","total.search.query_total","total.merges.total_size_in_bytes","total.fielddata.memory_size_in_bytes"],show_hidden:!1},availableMetrics:[{name:"Documents",field:"primaries.docs.count",decimals:0,y_format:"short"},{name:"Index Rate",field:"primaries.indexing.index_total",derivative:!0,y_format:"short"},{name:"Search Rate",field:"total.search.query_total",derivative:!0,y_format:"short"},{name:"Merge Rate",field:"total.merges.total_size_in_bytes",derivative:!0,y_format:"bytes"},{name:"Field Data",field:"total.fielddata.memory_size_in_bytes",y_format:"bytes"}]}};var o=function(b){if(d.isUndefined(a.modeInfo[a.panel.mode]))return[];d.isString(b)&&(b={field:b}),b=d.defaults(b,d.findWhere(a.modeInfo[a.panel.mode].availableMetrics,{field:b.field}));var c={field:"",decimals:1,y_format:"none",derivative:!1};return b=d.defaults(b,c),d.isNumber(b.error)&&(b.error={threshold:b.error,type:"upper_bound"}),d.isNumber(b.warning)&&(b.warning={threshold:b.warning,type:"upper_bound"}),b};d.defaults(a.panel,a.modeInfo[a.panel.mode].defaults),a.panel.metrics=d.map(a.panel.metrics,function(a){return o(a)}),a.$watch("panel.mode",function(b,c){b===c||d.isUndefined(b)||(a.panel.display_field=a.modeInfo[b].defaults.display_field,a.panel.persistent_field=a.modeInfo[b].defaults.persistent_field,a.panel.metrics=d.map(a.modeInfo[b].defaults.metrics,function(a){return o(a)}))}),a.$watch("dashboard.current.refresh",function(){a.updateUIFeaturesBasedOnData()}),a.updateUIFeaturesBasedOnData=function(){var e=a.rows.length;e>a.panel.full_view_row_limit_on_high_refresh&&c.interval_to_seconds(b.current.refresh||"1y")<120?(a.panel.compact=!0,a.sparkLines=!0,a.viewSelect=!1):(a.viewSelect=!0,a.sparkLines=!0),d.size(a.data)>a.panel.data_limit_for_high_refresh&&c.interval_to_seconds(b.current.refresh||"1y")<120&&(b.set_interval("2m"),k.set("Refresh rate","Due to the large size of your cluster, the refresh rate has been adjusted to 2m","info",3e4))},a.init=function(){a.dashboard=b,a.rowLimit=20,a.sparkLines=!0,a.viewSelect=!0,a.warnLevels={},a.rows=[],a.data={},a.$on("refresh",function(){a.get_data()}),a.get_data()},a.get_mode_filter=function(){return a.ejs.TermFilter("_type","nodes"===a.panel.mode?"node_stats":"index_stats")},a.get_summary_key=function(a,b){return a+"_"+b.field},a.get_history_key=function(a,b){return a+"_"+b.field+"_history"},a._register_data_start=function(){var b=new Date;return a._ongoing_data_retrieval?b-a._ongoing_data_retrieval>6e4?(console.log("previous data retrieval didn't finish within 1m. executing current request (previous: "+a._ongoing_data_retrieval+")"),a._ongoing_data_retrieval=b,!0):(a._pending_data_retrieval||(i("queueing data start for "+b),a._pending_data_retrieval=b,setTimeout(function(){a._pending_data_retrieval===b&&(console.log("Retrying call from "+b),a._pending_data_retrieval=null,a.get_data())},2e4)),!1):(a._ongoing_data_retrieval=b,i("marking data start for "+b),!0)},a._register_data_end=function(){if(i("end of data retrieval "+a._ongoing_data_retrieval),a._pending_data_retrieval){var b=a._pending_data_retrieval;setTimeout(function(){return a._ongoing_data_retrieval=null,b!==a._pending_data_retrieval?void i("firing pending retrieval canceled as it was picked up: "+b):(i("firing pending retrieval "+a._pending_data_retrieval),a._pending_data_retrieval=null,void a.get_data())},5e3)}else a._ongoing_data_retrieval=null},a.get_data=function(){if(0!==b.indices.length&&a._register_data_start()){a.panel.error=!1;var f,i,j;i=e.getBoolFilter(e.ids);var k,l;k=l=e.timeRange(!1).to,k=c.parseDate(k).getTime(),"now"!==l&&(l=c.parseDate(l).valueOf()+"||"),i.must(a.get_mode_filter()).must(a.ejs.RangeFilter("@timestamp").from(l+"-10m/m").to(l+"/m")),f=a.ejs.Request().indices(b.indices).size(10),f.query(a.ejs.FilteredQuery(a.ejs.MatchAllQuery(),i)),f.facet(a.ejs.TermStatsFacet("timestamp").keyField(a.panel.persistent_field).valueField("@timestamp").order("term").size(2e3)),"nodes"===a.panel.mode&&f.facet(a.ejs.TermStatsFacet("master_periods").keyField(a.panel.persistent_field).valueField("@timestamp").order("term").facetFilter(a.ejs.TermFilter("node.master","true")).size(2e3)),d.each(a.panel.metrics,function(b){f.facet(a.ejs.TermStatsFacet(b.field).keyField(a.panel.persistent_field).valueField(b.field).order("term").size(2e3))}),j=f.doSearch(),j.then(function(e){var f,j;if(j={},!d.isUndefined(e.error))return void(a.panel.error=a.parse_error(e.error));if(d.each(e.facets.timestamp.terms,function(b){if(a.panel.show_hidden||"."!==b.term[0]){var d=(b.max-b.min)/b.count/1e3,e=(k-b.max)/1e3;0>=d&&(d=5);var f=e<Math.min(3e5,a.staleIntervalCount*d);j[b.term]={id:b.term,time_span:(b.max-b.min)/1e3,reporting_interval:d/1e3,data_age_in_seconds:e,data_age_display:c.secondsToHms(Math.floor(e)),alive:f,selected:(a.data[b.term]||{}).selected,alert_level:0,id_alert_level:f?0:1}}}),e.facets.master_periods){var l=d.max(e.facets.master_periods.terms,function(a){return a.max});j[l.term].master=!0;var m=d.filter(e.facets.master_periods.terms,function(b){return b.term===l.term?!1:k-b.max>a.staleIntervalCount*j[b.term].reporting_interval*1e3?!1:b.max-l.min>Math.min(3e5,a.staleIntervalCount*j[b.term].reporting_interval*1e3)});d.each(m,function(a){j[a.term].master=!0}),m.length>0&&d.each(j,function(a){a.master&&(a.alert_level=a.id_alert_level=2)})}return d.each(a.panel.metrics,function(b){d.each(e.facets[b.field].terms,function(c){var d=j[c.term];if(d){var e={mean:null,max:null,min:null};if(b.derivative){if(!d.time_span)return void(d[b.field]=e);e.value=(c.max-c.min)/d.time_span,b.scale&&1!==b.scale&&(e.value/=b.scale)}else e.min=c.min,e.max=c.max,e.value=c.mean,b.scale&&1!==b.scale&&(e.value/=b.scale,e.max/=b.scale,e.min/=b.scale);d[b.field]=e,e.alert_level=a.alertLevel(b,e.value),e.alert_level>d.alert_level&&(d.alert_level=e.alert_level)}})}),d.isEmpty(j)?(a._register_data_end(),void a.select_display_data_and_enrich(j)):!a.panel.display_field||a.panel.display_field===a.panel.persistent_field||d.size(j)>a.panel.data_limit_for_display_names?(d.each(j,function(a){a.display_name=a.id}),a._register_data_end(),void a.select_display_data_and_enrich(j)):(f=a.ejs.MultiSearchRequest().indices(b.indices),d.each(j,function(b){var c=a.ejs.Request().filter(i);c.query(a.ejs.ConstantScoreQuery().query(a.ejs.TermQuery(a.panel.persistent_field,b.id))),c.size(1).fields(d.unique([g(a.panel.display_field),g(a.panel.persistent_field)])),c.sort("@timestamp","desc"),f.requests(c)}),void f.doSearch(function(b){h.is(">=1.0.0.RC1").then(function(c){var e,f,h;d.each(b.responses,function(b){0!==b.hits.hits.length&&(e=b.hits.hits[0],c?(f=(e.fields[g(a.panel.display_field)]||[void 0])[0],h=(e.fields[g(a.panel.persistent_field)]||[void 0])[0]):(f=e.fields[g(a.panel.display_field)],h=e.fields[g(a.panel.persistent_field)]),(j[h]||{}).display_name=f)}),a._register_data_end(),a.select_display_data_and_enrich(j)})},a._register_data_end))},a._register_data_end)}},a.select_display_data_and_enrich=function(f){function g(a,b){var c=f[a],d=f[b];return c.selected&&!d.selected?-1:!c.selected&&d.selected?1:0}function h(a,b){var c=f[a],d=f[b];return c.alert_level>d.alert_level?-1:c.alert_level<d.alert_level?1:0}function i(a,b){var c=f[a],d=f[b];return!c.alive&&d.alive?-1:c.alive&&!d.alive?1:0}function j(a,b){var c=f[a],d=f[b];return c.display_name<d.display_name?-1:c.display_name>d.display_name?1:0}function k(a,b){var c=f[a],d=f[b];return c.master&&!d.master?-1:!c.master&&d.master?1:0}function m(b,c){var d=a.get_sort_value(b,f),e=a.get_sort_value(c,f),g=0;return e>d?g=-1:d>e&&(g=1),"desc"===a.panel.sort[1]&&(g*=-1),g}function n(){var a=arguments;return function(b,c){for(var d=0;d<a.length;d++){var e=a[d].call(this,b,c);if(0!==e)return e}return 0}}if(d.isUndefined(f)&&(f=a.data),0===b.indices.length||d.isEmpty(f))return void l([],{});a.panelMeta.loading=!0;var o,q,r,s;if(s=[],a.panel.rowFilter){var t=a.panel.rowFilter.toLowerCase();d.each(f,function(a){var b=a.id.toLowerCase();return b.indexOf(t)>=0?void s.push(a.id):(b=a.display_name.toLowerCase(),void(b.indexOf(t)>=0&&s.push(a.id)))})}else d.each(f,function(a){s.push(a.id)});a.panel.sort?(s.sort(n(m,h,i,g,k)),s=s.slice(0,a.rowLimit)):(s.sort(n(g,h,i,k,j)),s=s.slice(0,a.rowLimit),s.sort(n(h,j))),r=d.map(s,function(a){return f[a]}),o=a.ejs.Request().indices(b.indices);var u=e.timeRange(!1).to;"now"!==u&&(u=c.parseDate(u).valueOf()+"||");var v=a.ejs.BoolFilter().must(a.ejs.RangeFilter("@timestamp").from(u+"-10m/m").to(u+"/m")).must(a.get_mode_filter());return o.query(a.ejs.FilteredQuery(a.ejs.MatchAllQuery(),v)).size(0),d.each(r,function(b){d.each(a.panel.metrics,function(c){b[c.field]&&!b[c.field].series&&o.facet(a.ejs.DateHistogramFacet(a.get_history_key(b.id,c)).keyField("@timestamp").valueField(c.field).interval("1m").facetFilter(a.ejs.TermFilter(a.panel.persistent_field,b.id)))})}),o.facet()&&0!==o.facet().length?(q=o.doSearch(),void q.then(function(b){p(b.facets,r,f,a.panel.metrics);var c;c=a.panel.sort?n(m,h,i,g,k):n(h,j),r.sort(function(a,b){return c(a.id,b.id)}),l(r,f)})):void l(r,f)};var p=function(b,c,e,f){return d.each(f,function(e){d.each(c,function(c){var f=a.get_history_key(c.id,e),g=b[f];if(g){var h=d.pluck(g.entries,e.derivative?"min":"mean"),i=d.pluck(g.entries,"time"),j=c[e.field];e.scale&&1!==e.scale&&(h=d.map(h,function(a){return a/e.scale})),e.derivative&&(h=d.map(h,function(a,b){var c;if(0===b)c=null;else{var d=(i[b]-i[b-1])/1e3;c=(a-h[b-1])/d}return c>=0?c:null}),j.max=d.reduce(h,function(a,b){return b>a&&null!=b?b:a},Number.NEGATIVE_INFINITY),j.min=d.reduce(h,function(a,b){return a>b&&null!=b?b:a},Number.POSITIVE_INFINITY),j.max===Number.NEGATIVE_INFINITY&&(j.max=null),j.min===Number.POSITIVE_INFINITY&&(j.min=null)),j.series=d.zip(i,h),j.value=h[h.length-1],j.alert_level=a.alertLevel(e,j.value),j.alert_level>c.alert_level&&(c.alert_level=j.alert_level)}})}),b};a.hasSelected=function(b){return d.some(b||a.data,function(a){return a.selected})},a.selectedData=function(b){return d.filter(b||a.data,function(a){return a.selected})},a.get_sort_value=function(b,c){return c||(c=a.data),b=c[b],"__name__"===a.panel.sort[0]?b.display_name:b[a.panel.sort[0]].value},a.set_sort=function(b){a.panel.sort&&a.panel.sort[0]===b?"asc"===a.panel.sort[1]?a.panel.sort[1]="desc":"desc"===a.panel.sort[1]?a.panel.sort=null:a.panel.sort[1]="asc":a.panel.sort=[b,"asc"],a.select_display_data_and_enrich()},a.showFullTable=function(){return a.panel.compact?!1:!0},a.rowClick=function(b,c){var d=window.location.href,e=d.indexOf("#");e>0&&(d=d.substr(0,e)),d+=a.detailViewLink([b],c?[c.field]:void 0),window.location=d},a.formatAlert=function(a,b){return a?("upper_bound"===a.type?">":"<")+f(a.threshold,b):""},a.detailViewLink=function(b,c){var f,g,h,i,j;return d.isUndefined(b)&&(b=a.selectedData()),b=d.map(b,function(b){return f=a.panel.persistent_field+':"'+b.id+'"',{q:f,a:b.display_name}}),0===b.length?null:(b=JSON.stringify(b),g=e.timeRange(!1),h=d.isUndefined(c)?"":"&show="+c.join(","),i=d.isDate(g.from)?g.from.toISOString():g.from,j=d.isDate(g.to)?g.to.toISOString():g.to,"#/dashboard/script/marvel."+a.panel.mode+"_stats.js?queries="+m(b)+"&from="+i+"&to="+j+h)},a.detailViewTip=function(){return"nodes"===a.panel.mode?a.hasSelected(a.rows)?"Open node statistics dashboard for selected nodes":"Select nodes and click to open the node statistics dashboard":a.hasSelected(a.rows)?"Open index stats dashboard for selected indices":"Select indices and click to open the index stats dashboard"},a.calculateWarnings=function(){a.warnLevels={},d.each(a.panel.metrics,function(b){a.warnLevels[b.field]=0,d.each(a.data,function(c){var e=(c[b.field]||{}).alert_level;!d.isUndefined(e)&&e>a.warnLevels[b.field]&&(a.warnLevels[b.field]=e)})})},a.alertLevel=function(a,b){function c(a,b){return a?"upper_bound"===a.type?b>a.threshold:b<a.threshold:!1}var d=0;if(a.scale&&(b/=a.scale),c(a.error,b)?d=2:c(a.warning,b)&&(d=1),document.location.search.match(/panic_demo/)){var e=Math.random();e>.9?d=2:e>.8&&(d=1)}return d},a.alertClass=function(a){return a>=2?["text-error"]:a>=1?["text-warning"]:[]},a.parseAlert=function(a){if(!a)return null;var b={type:"upper_bound"};return"<"===a[0]?(b.type="lower_bound",a=a.substr(1)):">"===a[0]&&(a=a.substr(1)),b.threshold=parseFloat(a),isNaN(b.threshold)?null:b},a.addMetric=function(b,c){c=c||{},c=o(c),b.metrics.push(c),c.field||(a.metricEditor.index=b.metrics.length-1)},a.addMetricOptions=function(b){if(d.isUndefined(a.modeInfo[b]))return[];var c=d.pluck(a.panel.metrics,"field");return d.filter(a.modeInfo[b].availableMetrics,function(a){return!d.contains(c,a.field)})},a.needs_refresh=function(b){d.isUndefined(b)&&(b=!0),a._needs_refresh=b},a.close_edit=function(){a.metricEditor={index:-1},a._needs_refresh&&a.get_data(),a._needs_refresh=!1,a.$emit("render")},a.deleteMetric=function(a,b){a.metrics=d.without(a.metrics,a.metrics[b])},a.onRowFilterChange=d.debounce(function(){a.$apply(function(b){a.select_display_data_and_enrich(b.data)})},500)}]),h.filter("metric_format",function(){return f}),h.directive("alertValue",function(){return{require:"ngModel",link:function(a,b,c,d){d.$parsers.unshift(function(b){return/(<>)?\d+(.\d+)?/.test(b)?(d.$setValidity("alertValue",!0),a.parseAlert(b)):void d.$setValidity("alertValue",!1)}),d.$formatters.unshift(function(b){return a.formatAlert(b,a)})}}}),h.directive("marvelStatsSparkline",function(){return{restrict:"C",scope:{series:"=",panel:"=",field:"="},template:"<div></div>",link:function(a,b){function c(){var c={legend:{show:!1},series:{lines:{show:!0,fill:0,lineWidth:2,steps:!1},shadowSize:1},yaxis:{show:!1},xaxis:{show:!1,mode:"time"},grid:{hoverable:!1,show:!1}};if(!d.isUndefined(a.series)){var f={data:a.series,color:b.css("color")};e.plot(b,[f],c)}}a.$watch("series",function(){c()})}}})});