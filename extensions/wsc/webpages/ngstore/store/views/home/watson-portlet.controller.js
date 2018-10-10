/*******************************************************************************
 * IBM Confidential
 * OCO Source Materials
 * IBM Sterling Order Management Store (5725-D10)
 * (C) Copyright IBM Corp. 2016 All Rights Reserved. , 2016 All Rights Reserved.
 * The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
 ******************************************************************************/

angular.module("store").controller("store.views.home.watson-portlet",[
	"$scope","iscScreen","iscState","iscModal","iscI18n","iscMashup","iscAppContext",
	function($scope,iscScreen,iscState,iscModal,iscI18n, iscMashup, iscAppContext){ 
		iscScreen.initializeScreen($scope,{  
			model:{				
			},
			
			mashupRefs:[
					            {
							        /**
									   *@iscdoc mashup
									   *@viewname store.views.home.returns-portlet
									   *@mashupid returnLookup_getCustomerListPaginated
									   *@mashuprefid advanceSearch_getCustomerListPaginated
									   *@modelname getCustomerListPaginated
									   *@description Gets the customer list.
									   */
					            	mashupRefId: 'advanceSearch_getCustomerListPaginated',
					            	mashupId: 'returnLookup_getCustomerListPaginated',
					            	modelName : 'getCustomerListPaginated'
					            }
					      ],      
			uiHandleSearchResult : function(searchResult) {
				console.log("searchResult is:",searchResult);
				iscState.goToState('returnorder',{action:searchResult.NextPage.action,input:searchResult.NextPage.model,callAPI:searchResult.NextPage.callAPI},{});
			},
			ui : {
				AdanceCustomerSearchShown:false
			},
			uiIsAdvanceSearchShown : function(){
				if(this.ui.AdvanceCustomerSearchShown===true)
				{
					return true;
				}else
					return false;	
			},
			
			initialize : function(){
				$scope.lookupSelection = "ORDER";
				 $scope.ui.AdvanceCustomerSearchShown = false;
				//$scope.showCustomerAdvanceSearch=false;
				
				$scope.$on('AdvanceCustomerSelection',function(event,args){
			   
			       if (args){
					  $scope.lookupSelection = args.data;
					  $scope.ui.AdvanceCustomerSearchShown = true;
			    	}  
					   
				 });
				$scope.$on('AdvanceCustomerSelectionhide',function(event,args){
			   
			       if (args){
					  $scope.lookupSelection = args.data;
					  $scope.ui.AdvanceCustomerSearchShown = false;
			    	}  
					   
				 });				 	
			},
			
			uiOpenAskWatson: function() {
				iscState.goToState('ask-watson', {}, {});
			}

		});	
}]);