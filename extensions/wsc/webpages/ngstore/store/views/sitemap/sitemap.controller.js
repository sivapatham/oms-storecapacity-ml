/*******************************************************************************
 * IBM Confidential
 * OCO Source Materials
 * IBM Sterling Order Management Store (5725-D10)
 * (C) Copyright IBM Corp. 2016 All Rights Reserved.
 * The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
 ******************************************************************************/

/**
 *@iscdoc viewinfo
 *@viewname store.views.sitemap.sitemap
 *@package store.views.sitemap
 *@class sitemap
 *@description Displays list of actions performed in store application.
 *
 */

angular.module('store').controller('store.views.sitemap.sitemap',
		  ['$scope','$rootScope','iscScreen','iscMashup','iscResourcePermission','iscState','iscStateParams','iscPrint','iscPayment','iscPaymentinput','iscModal','iscI18n','iscAppInfo','iscHttpRequest',
			function($scope,$rootScope,iscScreen,iscMashup,iscResourcePermission,iscState,iscStateParams,iscPrint,iscPayment,iscPaymentinput,iscModal,iscI18n,iscAppInfo,iscHttpRequest) {				
				iscScreen.initializeScreen($scope,{
					 
						
				      model:{
				    	  
				      },
				     
				  		mashupRefs : [
	  		              ],
				  		
				  		
			            ui:{
			            	hasMgrDashboardPermission: (iscResourcePermission.hasPermission("WSC000038") || iscResourcePermission.hasPermission("WSC000039"))
			            },
			            /**
						 *@description Initializes the screen
						 */
			            initialize : function(){
			        	
			            },
			            /**
						 *@description This method is used to open order fulfillment home page.
						 */
			        uiOpenOrderFulfillment:function(){
			        	window.onbeforeunload = null;
						$rootScope.activeCalls++;
						var appDeviceMode = iscAppInfo.getAppDeviceMode();
						var redirectURL = "";
						if(appDeviceMode === 'mobile'){
							redirectURL = iscAppInfo.getApplicationContext()+"/store/mobile/container/home.do";
						}
						else {
							redirectURL = iscAppInfo.getApplicationContext()+"/store/container/home.do";
						}
						window.location.href = iscHttpRequest.addAdditionalParamsInURL(redirectURL, "GET");
			        },
			        /**
					 *@description This method is used to open manager dashboard.
					 */
			        uiOpenManagerDashboard: function() {
			        	iscState.goToState('/manager-dashboard', {}, {});
			        },

				/**
				 *@description This method is used to open Ask Watson screen.
				 */
				uiOpenAskWatson: function() {
				    iscState.goToState('ask-watson', {}, {});
				},

			        /**
					 *@description This method is used to open product search screen in order capture flow.
					 */
			        uiOpenFindProducts:function(){
			        	iscState.goToState('ordercapture',{action:'SEARCH',input:'',openBlankPage:true},{});
			        },
			        /**
					 *@description This method is used to open product search screen in return order flow.
					 */
			        uiOpenReturns:function(){
			        	iscState.goToState('returnorder',{action:'itemList',input:'',callAPI:false},{});
			        },
			        /**
			         * @description This method is used to open incoming receiving shipment list screen.
			         */
			        uiOpenReceivingShipmentList:function() {
			        	var tabToOpen = "INCOMING";
			        	iscState.goToState("receivingShipmentList", {"defaultTab": tabToOpen.toLowerCase()}, {});
			        },
			        
			        uiFindCustomers:function() {
			        	iscState.goToState('customerProfileList',{input:'',openBlankPage:true},{});
			        }
				  	         
				  	          
				 });
			}
		]);
