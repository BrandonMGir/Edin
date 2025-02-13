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

            //get nearby properties
            Address address = wrapperList[0].property.Address__c;
            String addStr = address.street + ', ' + address.city + ', ' + address.stateCode;
            List<PropertyWrapper> nearbyProperties = PropertyController.getPropertiesWithinDistance(addStr);

            if(nearbyProperties != null){
                Id currentId = id;
                Integer i = 0;
                for(PropertyWrapper pw : nearbyProperties){
                    if(pw.property.Id == currentId){
                        nearbyProperties.remove(i);
                        break;
                    }
                    i++;
                }
    
                if(nearbyProperties.size() > 0){
                    wrapperList[0].otherproperties = nearbyProperties;
                }
            }
            

            return wrapperList[0];

        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled(cacheable=true)
    public static Boolean isFavorited(String userId, String propertyId){
        try {
            if((String.isBlank(userId) || String.isEmpty(userId)) || (String.isBlank(propertyId) || String.isEmpty(propertyId))){return null;}

            Id uId = Id.valueOf(userId);
            Id pId = Id.valueOf(propertyId);

            Integer count = [SELECT COUNT() FROM Favorited_Property__c WHERE User__c = :uId AND Property__c = :pId];

            if(count > 0){
                return true;
            }

            return false;

        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}