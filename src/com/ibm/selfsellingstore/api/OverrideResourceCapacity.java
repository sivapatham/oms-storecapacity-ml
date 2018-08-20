package com.ibm.selfsellingstore.api;


import java.util.StringTokenizer;

import org.w3c.dom.Document;
import org.w3c.dom.Element;

import com.ibm.sterling.afc.xapiclient.util.XApiXmlUtil;
import com.yantra.yfc.core.YFCObject;
import com.yantra.yfc.log.YFCLogCategory;
import com.yantra.yfs.japi.YFSEnvironment;
import com.yantra.interop.japi.YIFApi;
import com.yantra.interop.japi.YIFClientCreationException;
import com.yantra.interop.japi.YIFClientFactory;



public class OverrideResourceCapacity  {
	
	public static YFCLogCategory log = YFCLogCategory.instance(OverrideResourceCapacity.class);
//	public static void main(String[] args){
	
	public Document invokeOverrideResourceCapacity(YFSEnvironment yfsEnvironment, Document inputDoc) throws Exception
	{
		
		if (this.log.isVerboseEnabled()) {
			this.log.beginTimer("OverrideResourceCapacity : invokeOverrideResourceCapacity");
		}
		log.debug("OverrideResourceCapacity inputDoc :"	+ XApiXmlUtil.getString(inputDoc));
		
		YIFApi api;
		
		Element inputElem = XApiXmlUtil.createDocument("PredictionFromWatson").getDocumentElement();
		inputElem.setAttribute("Prediction","{  \"fields\": [\"STORE-ID\", \"DATE\", \"DAYOFWEEK\", \"SHIFT\", \"SALE\", \"TRAFFIC\", \"WEATHER\", \"ORDERTYPE\", \"features\", \"prediction\"],  \"values\": [[\"Matrix_WH1\", \"16/8/2018\", \"Thursday\", \"MorningShift\", \"Yes\", \"Low\", \"Dry\", \"Pick\", [53, [30, 32, 38, 44, 45, 52], [0.0, 2.8093819708223, 1.9936814392792557, 0.0, 2.2672287798822466, 0.0]], 41.7528652362977]]}");
		String prediction = inputElem.getAttribute("Prediction");
		
		String values = prediction.substring(prediction.lastIndexOf(',')+1);
		String overrideCapacity = String.valueOf(Double.parseDouble(values.substring(0, values.indexOf(']')).trim()));
		System.out.println(overrideCapacity);
		try{
			
			 api= YIFClientFactory.getInstance().getApi();

			if (!YFCObject.isVoid(overrideCapacity)) {
				Element outElem = XApiXmlUtil.createDocument("OverrideResourcePoolCapacity").getDocumentElement();
				Element resourcePools = XApiXmlUtil.createChild(outElem, "ResourcePools");
				Element resourcePool = XApiXmlUtil.createChild(resourcePools, "ResourcePool");
				resourcePool.setAttribute("ResourcePoolId","PickRP");
				resourcePool.setAttribute("Node","Matrix_WH1");
				resourcePool.setAttribute("CapacityOrganizationCode","Matrix");
				Element serviceSlots = XApiXmlUtil.createChild(resourcePool, "ServiceSlots");
				Element serviceSlot = XApiXmlUtil.createChild(serviceSlots, "ServiceSlot");
				Element datesElem = XApiXmlUtil.createChild(serviceSlot, "Dates");
				Element dateElem = XApiXmlUtil.createChild(datesElem, "Date");
				dateElem.setAttribute("Date","2018-08-08");
				dateElem.setAttribute("Capacity",overrideCapacity);
				dateElem.setAttribute("CapacityUnitOfMeasure","UNIT");
			}
			
			Document outDoc = api.invoke(yfsEnvironment, "overrideResourcePoolCapacity", inputElem.getOwnerDocument());
			return outDoc;
			
		}
		catch(Exception e)
		{
			log.error(e);
		}
		if (log.isVerboseEnabled()) {
			log.beginTimer("FetchWatsonPredicton : fetchPrediction");
		}	
		return null;
	}
	

	
}