/*******************************************************************************
 * IBM Confidential
 * OCO Source Materials
 * IBM Sterling Order Management Store (5725-D10)
 * (C) Copyright IBM Corp. 2016 All Rights Reserved.
 * The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
 ******************************************************************************/

angular.module('store').config(['iscStateProvider',
	function(iscStateProvider) {
		iscStateProvider.state('sitemap',{
		  templateUrl: '../extn/ngstore/store/views/sitemap/sitemap.tpl.html',
      controller:'store.views.sitemap.sitemap'
    });
}]);
