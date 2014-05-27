(function( app ) {

	var data = app.ns("data");
	var ux = app.ns("ux");

	data.ClusterState = ux.Observable.extend({
		defaults: {
			cluster: null
		},
		init: function() {
			this._super();
			this.cluster = this.config.cluster;
			this.clusterState = null;
			this.status = null;
			this.nodeStats = null;
			this.clusterNodes = null;
		},
		refresh: function() {
			var self = this, clusterState, status, nodeStats, clusterNodes; 
			function updateModel() {
				if( clusterState && status && nodeStats && clusterNodes ) {
					this.clusterState = clusterState;
					this.status = status;
					this.nodeStats = nodeStats;
					this.clusterNodes = clusterNodes;
					this.fire( "data", this );
				}
			}
			this.cluster.get("_cluster/state", function( data ) {
				clusterState = data;
				updateModel.call( self );
			});
			this.cluster.get("_status", function( data ) {
				status = data;
				updateModel.call( self );
			});
			this.cluster.get("_nodes/stats?all=true", function( data ) {
				nodeStats = data;
				updateModel.call( self );
			});
			this.cluster.get("_nodes", function( data ) {
				clusterNodes = data;
				updateModel.call( self );
			});
		},
		_clusterState_handler: function(state) {
			this.clusterState = state;
			this.redraw("clusterState");
		},
		_status_handler: function(status) {
			this.status = status;
			this.redraw("status");
		},
		_clusterNodeStats_handler: function(stats) {
			this.nodeStats = stats;
			this.redraw("nodeStats");
		},
		_clusterNodes_handler: function(nodes) {
			this.clusterNodes = nodes;
			this.redraw("clusterNodes");
		}
	});

})( this.app );