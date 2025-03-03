public with sharing class GeoLocationHelper {
    
    @AuraEnabled
    public static Location getLatLong(String address){
        try {

            Api_Key__mdt keyMeta = Api_Key__mdt.getInstance('Geolocation_key');
            String apiKey = keyMeta.Key__c;

            Http http = new Http();
            HttpRequest request = new HttpRequest();
            String encodedAddress = EncodingUtil.urlEncode(address, 'UTF-8');
            String endpoint = 'https://api.geoapify.com/v1/geocode/search?text=' + encodedAddress + '&apiKey=' + apiKey;

            request.setEndpoint(endpoint);
            request.setMethod('GET');

            HttpResponse response = http.send(request);

            if(response.getStatusCode() == 200){
                Map<String, Object> results = (Map<String, Object>)JSON.deserializeUntyped(response.getBody());
                List<Object> features = (List<Object>)results.get('features');
                Map<String, Object> first = (Map<String, Object>)features[0];
                Map<String, Object> properties = (Map<String, Object>)first.get('properties');

                Decimal lat = (Decimal)properties.get('lat');
                Decimal lng = (Decimal)properties.get('lon');
                
                System.debug('SUCCESS: ' + lat + ', ' + lng);
                return new Location(lat, lng);
            }
            else{
                System.debug('Fail: ' + response.getBody());
                return null;
            }
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}