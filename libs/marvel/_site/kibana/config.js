/** @scratch /configuration/config.js/1
 * == Configuration
 * config.js is where you will find the core Kibana configuration. This file contains parameter that
 * must be set before kibana is run for the first time.
 */
define(['settings'],
  function (Settings) {
    

    /** @scratch /configuration/config.js/2
     * === Parameters
     */
    var s =  new Settings({

      /** @scratch /configuration/config.js/5
       * ==== elasticsearch
       *
       * The URL to your elasticsearch server. You almost certainly don't
       * want +http://localhost:9200+ here. Even if Kibana and Elasticsearch are on
       * the same host. By default this will attempt to reach ES at the same host you have
       * kibana installed on. You probably want to set it to the FQDN of your
       * elasticsearch host
       */
      elasticsearch: window.location.protocol+"//"+window.location.hostname+(window.location.port !== '' ? ':'+window.location.port : ''),

      /** @scratch /configuration/config.js/5
       * ==== default_route
       *
       * This is the default landing page when you don't specify a dashboard to load. You can specify
       * files, scripts or saved dashboards here. For example, if you had saved a dashboard called
       * `WebLogs' to elasticsearch you might use:
       *
       * +default_route: '/dashboard/elasticsearch/WebLogs',+
       */
      default_route     : '/dashboard/file/marvel.overview.json',

      /** @scratch /configuration/config.js/5
       * ==== kibana-int
       *
       * The default ES index to use for storing Kibana specific object
       * such as stored dashboards
       */
      kibana_index: ".marvel-kibana",

      /** @scratch /configuration/config.js/5
       * ==== panel_name
       *
       * An array of panel modules available. Panels will only be loaded when they are defined in the
       * dashboard, but this list is used in the "add panel" interface.
       */
      panel_names: [
        'histogram',
        'map',
        'pie',
        'table',
        'filtering',
        'timepicker',
        'text',
        'hits',
        'column',
        'trends',
        'bettermap',
        'query',
        'terms',
        'sparklines',
        'marvel.stats_table',
        'marvel.cluster'
      ]
    });
  s.stats_report_url = "https://marvel-stats.elasticsearch.com/";
  s.ga_tracking_code = 'UA-12395217-5';
  return s;
});

/**
 * Built on:
 *    marvel commit: 7418d48
 *    kibana commit: 70ad6e2
 */