public with sharing class PropertyWrapper {

    @AuraEnabled
    public Property__c property {get;set;}

    @AuraEnabled
    public List<String> imageUrls {get;set;}

    @AuraEnabled
    public List<PropertyWrapper> otherproperties {get;set;}

    public PropertyWrapper() {

    }


}