public with sharing class AccountController {
    
    @AuraEnabled(cacheable=true)
    public static User getUserById(String id){
        try {
            if(String.isEmpty(id) || String.isBlank(id)){return null;}

            return [SELECT Email, Name FROM User WHERE Id = :id];
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled(cacheable=true)
    public static List<Property__c> getFavoritedProperties(String id){
        try {

            if(String.isEmpty(id) || String.isBlank(id)){return null;}

            List<Favorited_Property__c> favoritePropIds = [SELECT Property__r.Id FROM Favorited_Property__c];

            if(favoritePropIds.size() == 0){return null;}

            List<Id> ids = PropertyHelper.getPropertyIdsFromFavoriteList(favoritePropIds);

            if(ids.size() == 0){return null;}

            List<Property__c> properties = [SELECT Name, Address__c FROM Property__c WHERE Id IN :ids];
            
            return properties;
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static Favorited_Property__c favoriteProperty(String userId, String propertyId){
        try {
            if((String.isBlank(userId) || String.isEmpty(userId)) || (String.isBlank(propertyId) || String.isEmpty(propertyId))){return null;}

            Id uId = Id.valueOf(userId);
            Id pId = Id.valueOf(propertyId);

            User user = [SELECT Id From User WHERE Id = :uId LIMIT 1];
            Property__c property = [SELECT Id From Property__c WHERE Id = :pId LIMIT 1];

            Favorited_Property__c favorite = new Favorited_Property__c(User__c = user.Id, Property__c = property.Id);

            insert favorite;

            return favorite;

        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static String unFavoriteProperty(String userId, String propertyId){
        try {
            if((String.isBlank(userId) || String.isEmpty(userId)) || (String.isBlank(propertyId) || String.isEmpty(propertyId))){return null;}
            Id uId = Id.valueOf(userId);
            Id pId = Id.valueOf(propertyId);

            Favorited_Property__c favorite = [SELECT Id FROM Favorited_Property__c WHERE User__c = :uId AND Property__c = :pId LIMIT 1];

            delete favorite;

            return 'success';

        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}