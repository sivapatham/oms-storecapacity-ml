package com.ibm.selfsellingstore.api;
import java.io.*;
import java.net.MalformedURLException;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
public class HttpClientTest {
	public static void main(String[] args) throws IOException  {
		String payload = "{\"fields\": [\"STORE-ID\", \"DATE\", \"DAYOFWEEK\", \"SHIFT\", \"SALE\", \"TRAFFIC\", \"WEATHER\", \"ORDERTYPE\"], \"values\": [[\"Store-A\", \"16/8/2018\", \"Thursday\", \"MorningShift\", \"Yes\", \"Low\", \"Dry\", \"Pick\"]]}";
		fetchPrediction(payload);
	}
	
	public static StringBuffer fetchPrediction(String payload) throws IOException{

		// NOTE: you must manually construct wml_credentials hash map below
		// using information retrieved from your IBM Cloud Watson Machine Learning Service instance.

		Map<String, String> wml_credentials = new HashMap<String, String>()
			{{
				put("url", "https://eu-gb.ml.cloud.ibm.com"); //wml_service_credentials_url
				put("username", "ff4e80c9-71d3-46e5-830f-ffaf7f107aa4"); //wml_service_credentials_username
				put("password", "4563caf1-8ddc-4b89-ba93-a8404edaede8"); //wml_service_credentials_password
			}};

		String wml_auth_header = "Basic " +
				Base64.getEncoder().encodeToString((wml_credentials.get("username") + ":" +
					wml_credentials.get("password")).getBytes(StandardCharsets.UTF_8));
		String wml_url = wml_credentials.get("url") + "/v3/identity/token";
		HttpURLConnection tokenConnection = null;
		HttpURLConnection scoringConnection = null;
		BufferedReader tokenBuffer = null;
		BufferedReader scoringBuffer = null;
		StringBuffer jsonStringScoring = new StringBuffer();

		try {
			// Getting WML token
			URL tokenUrl = new URL(wml_url);
			tokenConnection = (HttpURLConnection) tokenUrl.openConnection();
			tokenConnection.setDoInput(true);
			tokenConnection.setDoOutput(true);
			tokenConnection.setRequestMethod("GET");
			tokenConnection.setRequestProperty("Authorization", wml_auth_header);
			tokenBuffer = new BufferedReader(new InputStreamReader(tokenConnection.getInputStream()));
			StringBuffer jsonString = new StringBuffer();
			String line;
			while ((line = tokenBuffer.readLine()) != null) {
				jsonString.append(line);
			}
			// Scoring request
			URL scoringUrl = new URL("https://eu-gb.ml.cloud.ibm.com/v3/wml_instances/cba71fa3-4595-4cf7-bf6a-fd623c69554f/deployments/82cba532-79c0-4db5-a0ef-0939128d8863/online");
			String wml_token = "Bearer " +
					jsonString.toString()
							.replace("\"","")
							.replace("}", "")
							.split(":")[1];
			scoringConnection = (HttpURLConnection) scoringUrl.openConnection();
			scoringConnection.setDoInput(true);
			scoringConnection.setDoOutput(true);
			scoringConnection.setRequestMethod("POST");
			scoringConnection.setRequestProperty("Accept", "application/json");
			scoringConnection.setRequestProperty("Authorization", wml_token);
			scoringConnection.setRequestProperty("Content-Type", "application/json; charset=UTF-8");
			OutputStreamWriter writer = new OutputStreamWriter(scoringConnection.getOutputStream(), "UTF-8");

			// NOTE: manually define and pass the array(s) of values to be scored in the next line
			writer.write(payload);
			writer.close();

			scoringBuffer = new BufferedReader(new InputStreamReader(scoringConnection.getInputStream()));
			String lineScoring;
			while ((lineScoring = scoringBuffer.readLine()) != null) {
				jsonStringScoring.append(lineScoring);
			}
			System.out.println(jsonStringScoring);
			
		} catch (IOException e) {
			System.out.println("The URL is not valid.");
			System.out.println(e.getMessage());
		}
		finally {
			if (tokenConnection != null) {
				tokenConnection.disconnect();
			}
			if (tokenBuffer != null) {
				tokenBuffer.close();
			}
			if (scoringConnection != null) {
				scoringConnection.disconnect();
			}
			if (scoringBuffer != null) {
				scoringBuffer.close();
			}
		}
		return jsonStringScoring;
	}
}
