package com.ibm.selfsellingstore.api;


import org.w3c.dom.Document;
import org.w3c.dom.Element;

import com.ibm.sterling.afc.xapiclient.util.XApiXmlUtil;
import com.yantra.yfc.core.YFCObject;
import com.yantra.yfc.log.YFCLogCategory;
import com.yantra.yfs.japi.YFSEnvironment;



public class FetchWatsonPrediction  {
	
	public static YFCLogCategory log = YFCLogCategory.instance(FetchWatsonPrediction.class);
	public Document fetchPrediction(YFSEnvironment yfsEnvironment, Document inputDoc) throws Exception
	{
		
		if (this.log.isVerboseEnabled()) {
			this.log.beginTimer("FetchWatsonPrediction : fetchPrediction");
		}
		log.debug("FetchWatsonPrediction inputDoc :"	+ XApiXmlUtil.getString(inputDoc));
		String payLoad = inputDoc.getDocumentElement().getAttribute("PayLoad");
		

		try{
			
			if (!YFCObject.isVoid(payLoad)) {
				StringBuffer predictionString = HttpClientTest.fetchPrediction(payLoad);
				Element outElem = XApiXmlUtil.createDocument("PredictionFromWatson").getDocumentElement();
				outElem.setAttribute("Prediction",predictionString.toString());
				return outElem.getOwnerDocument();
			}
			
			
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