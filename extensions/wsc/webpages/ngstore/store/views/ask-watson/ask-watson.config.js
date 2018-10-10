/******************************************************************************* 
* IBM Confidential 
* OCO Source Materials 
* IBM Sterling Order Management Store (5725-D10) 
* (C) Copyright IBM Corp. 2016 All Rights Reserved. 
* The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has beendeposited with the U.S. Copyright Office. 
******************************************************************************/
angular.module('store').config(['iscStateProvider',
	function (iscStateProvider) {
		iscStateProvider.state('ask-watson', {
			templateUrl: '../extn/ngstore/store/views/ask-watson/ask-watson.tpl.html',
			controller: 'store.views.ask-watson.ask-watson',
			addToHistory: false,
			resourceId: 'WSCSYS00001'
		});
}]);
