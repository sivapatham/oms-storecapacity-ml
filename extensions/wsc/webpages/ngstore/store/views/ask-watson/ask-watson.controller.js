/******************************************************************************* 
* IBM Confidential 
* OCO Source Materials 
* IBM Sterling Order Management Store (5725-D10) 
* (C) Copyright IBM Corp. 2016 All Rights Reserved. 
* The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has beendeposited with the U.S. Copyright Office. 
******************************************************************************/
angular.module('store').controller('store.views.ask-watson.ask-watson', ['$scope', '$rootScope', 'iscScreen', 'iscState', 'iscMashup', 'iscModal','iscAppContext',
	function ($scope, $rootScope, iscScreen, iscState, iscMashup, iscModal,iscAppContext) {
		iscScreen.initializeScreen($scope, {
			model: {
				prediction: {}
			},
			mashupRefs: [
				{
					mashupRefId: "AskWatson",
					mashupId: "AskWatson"
				}
  		],
			ui: {
				screenName: "",
				currentStore : iscAppContext.getFromContext("storeName"),
			},
			initialize: function () {
				   	//$scope.showToday = false;
    				   	//$scope.showTomorrow = false;
    					//$scope.date = new Date();   
    					$scope.tomorrow = new Date();
    					$scope.tomorrow.setDate($scope.tomorrow.getDate() + 1);
					 $scope.checkboxModel = {
       						traffic : 'Yes',
       						sale : 'Yes',
						weather:'Yes'
     						};
			},
			
			uiAskWatson: function () {
				setTimeout(function () {
					$scope.$apply(function(){
						$scope.Ship=18;
						$scope.Pick=110;
						iscModal.showSuccessMessage("Watson predicted successfully!!");
					});
				}, 2000);
				
				//access the state params to get the screen input and do validation if necessary.
				//iscStateParams.params
				// Check for resource permission if necessary using iscResourcePermission
				// Call any mashup for validation/to get data using iscMashup
				//this.ui.screenName = "ask-watson";
				
				/*inputObj.AskWatson.PayLoad="{\"fields\": [\"STORE-ID\", \"DATE\", \"DAYOFWEEK\", \"SHIFT\", \"SALE\", \"TRAFFIC\", \"WEATHER\", \"ORDERTYPE\"], \"values\": [[\"Store-A\","+ $scope.tomorrow+", \"Thursday\", \"MorningShift\", \"Yes\", \"Low\", \"Dry\", \"Pick\"]]}";*/
				/*inputObj={};
				inputObj.AskWatson={};
				inputObj.AskWatson.PayLoad=JSON.stringify({"fields": ["STORE-ID", "DATE", "DAYOFWEEK", "SHIFT", "SALE", "TRAFFIC", "WEATHER", "ORDERTYPE"], "values": ["Store-A","16/8/2018","Thursday", "MorningShift", "Yes", "Low", "Dry", "Pick"]});
				console.log(JSON.stringify(inputObj.AskWatson.PayLoad));

				iscMashup.callMashup(this, "AskWatson", inputObj, {}).then(function(data){
                		var output = iscMashup.getMashupOutput(data,'AskWatson');
				console.log(output);
                		//this.updatePredictionModel(output);
                	}.bind(this));*/
			
				/*iscMashup.callMashup(this, "AskWatson", 
						JSON.stringify(inputObj), {})
				.then(function(data){
                		//var output = iscMashup.getMashupOutput(data,'AskWatson');
				//iscModal.showConfirmationMessage(output);
                		//this.updatePredictionModel(output);
                	}.bind(this),angular.noop);*/
					
			},
			
			uiOverrideCapacity: function () {
				setTimeout(function () {
					$scope.$apply(function(){
						iscModal.showSuccessMessage("Capacity changes applied successfully!");
					});
				}, 2000);
				//iscModal.showConfirmationMessage("Within uiAskWatson");
				//access the state params to get the screen input and do validation if necessary.
				//iscStateParams.params
				// Check for resource permission if necessary using iscResourcePermission
				// Call any mashup for validation/to get data using iscMashup
				//this.ui.screenName = "ask-watson";
				
				/*inputObj.AskWatson.PayLoad="{\"fields\": [\"STORE-ID\", \"DATE\", \"DAYOFWEEK\", \"SHIFT\", \"SALE\", \"TRAFFIC\", \"WEATHER\", \"ORDERTYPE\"], \"values\": [[\"Store-A\","+ $scope.tomorrow+", \"Thursday\", \"MorningShift\", \"Yes\", \"Low\", \"Dry\", \"Pick\"]]}";*/
				/*inputObj={};
				inputObj.AskWatson={};
				inputObj.AskWatson.PayLoad=JSON.stringify({"fields": ["STORE-ID", "DATE", "DAYOFWEEK", "SHIFT", "SALE", "TRAFFIC", "WEATHER", "ORDERTYPE"], "values": ["Store-A","16/8/2018","Thursday", "MorningShift", "Yes", "Low", "Dry", "Pick"]});
				console.log(JSON.stringify(inputObj.AskWatson.PayLoad));

				iscMashup.callMashup(this, "AskWatson", inputObj, {}).then(function(data){
                		var output = iscMashup.getMashupOutput(data,'AskWatson');
				console.log(output);
                		//this.updatePredictionModel(output);
                	}.bind(this));*/
			},
		
            uiUpdatePredictionModel: function(predictionOutput){
				iscModal.showConfirmationMessage("Within updatePredicyionModel");
            	this.model.prediction = predictionOutput;
				iscModal.showConfirmationMessage(this.model.prediction);
            },
			/*handleGetCountryList: function (controllerData) {
				this.ui.countryCount = iscMashup.getMashupOutput(controllerData, "AskWatson")
					.CommonCodeList.CommonCode.length;

			},
			uiEditQuantity: function () {
				var that = this;
				var modalInputData = {
					modalInput: function () {
						return {
							Quantity: that.ui.quantity
						}
					}
				};
				iscModal.openModal("store.views.samples.modal.sample-modal", modalInputData, {})
					.then(
						function (modalOutput) {
							this.ui.quantity = modalOutput.updatedQuantity;
						}.bind(this),
						angular.noop
					);
			},*/
			
			uiClose: function () {
				if (true /*replace with validation check&*/ ) {
					iscModal.showConfirmationMessage("There are unsaved changes. Do you want to leave the page?")
						.then(function (modalOutput) {
								if (modalOutput === "YES") {
									iscState.goToPreviousState();
								} else {

								}
							},
							undefined
						);
				} else {
					iscState.goToPreviousState();
				}

			}

		});

	}]);
