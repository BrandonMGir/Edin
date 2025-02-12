public with sharing class PropertyDetailsController {
    
    //get property based on id
    @AuraEnabled(cacheable=true)
    public static PropertyWrapper getPropertyById(String id){
        try {
            if(id == null){
                throw new IllegalArgumentException('Id is null');
            }

            List<Property__c> property = [
                SELECT Name, Address__c, Bathrooms__c, Bedrooms__c, Description__c, Features__c, Lot_Square_Footage__c, Price__c, Square_Footage__c, Type__c
                FROM Property__c
                WHERE Id = :id
            ];

            if(property.size() == 0){return null;}

            List<PropertyWrapper> wrapperList = PropertyHelper.getPropertyWrapperList(property);

            if(wrapperList == null || wrapperList.size() == 0){return null;}

            return wrapperList[0];

        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    //get random carousel of properties
}