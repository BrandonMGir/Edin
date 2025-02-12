public with sharing class PropertyController {
    public PropertyController() {

    }

    @AuraEnabled(cacheable=true)
    public static List<PropertyWrapper> getFeaturedProperties(){
        try {
            List<Property__c> properties = [SELECT Id, Name, Address__c FROM Property__c LIMIT 5];

            List<PropertyWrapper> wrapperList = PropertyHelper.getPropertyWrapperList(properties);

            return wrapperList;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static List<PropertyWrapper> getPropertiesWithinDistance(String address){
        try {
            Location location = GeoLocationHelper.getLatLong(address);
            List<Property__c> properties = [
                SELECT Id, Address__c , Price__c
                FROM Property__c
                WHERE DISTANCE(Geolocation__c, GEOLOCATION(:location.latitude, :location.longitude), 'mi') < 50 
                ORDER BY DISTANCE(Geolocation__c, GEOLOCATION(:location.latitude,:location.longitude), 'mi')
                LIMIT 4];

        return PropertyHelper.getPropertyWrapperList(properties); 

        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    
}