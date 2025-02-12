public with sharing class PropertyHelper {

    //gets attachment urls associated to properties and returns wrapper containing propert and url list
    public static List<PropertyWrapper> getPropertyWrapperList(List<Property__c> properties){
        try {
            //System.debug('PROPERTIES: ' + properties);
            if(properties == null || properties.size() == 0){return null;}

            List<Id> propertyIds = getIdsFromPropertyList(properties);
            //System.debug('PROPERTY IDS: ' + propertyIds);

            if(propertyIds == null){return constructPropertyWrapperList(properties, null, null);}

            List<ContentDocumentLink> docLinks = [SELECT LinkedEntityId, ContentDocumentId FROM ContentDocumentLink WHERE LinkedEntityId IN :propertyIds];
            //System.debug('DOC LINKS: ' + docLinks);

            List<Id> contentDocIds = getIdsFromDocLinkList(docLinks);
            //System.debug('DOC LINK IDS: ' + contentDocIds);

            if(docLinks.size() == 0){return constructPropertyWrapperList(properties, null, null);}
            
            List<ContentVersion> versions = [SELECT ContentDocumentId, VersionDataURL FROM ContentVersion WHERE ContentDocumentId IN :contentDocIds];
            //System.debug('VERSIONS: ' + versions);

            List<PropertyWrapper> wrapperList = constructPropertyWrapperList(properties, docLinks, versions);
            System.debug('WRAPPER LIST: ' + wrapperList);

            return wrapperList;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    private static List<PropertyWrapper> constructPropertyWrapperList(List<Property__c> properties, List<ContentDocumentLink> docLinks, List<ContentVersion> versions){
        List<PropertyWrapper> result = new List<PropertyWrapper>();

        for(Property__c property : properties){
            PropertyWrapper wrapper = new PropertyWrapper();
            wrapper.property = property;
            List<String> urls = new List<String>();

            for(ContentDocumentLink docLink : docLinks){
                if(docLink.LinkedEntityId == property.Id){
                    for(ContentVersion version : versions){
                        if(version.ContentDocumentId == docLink.ContentDocumentId){
                            urls.add(version.VersionDataURL);
                        }
                    }
                }
            }

            wrapper.imageUrls = urls;
            result.add(wrapper);
        }

        return result;
    } 

    private static List<Id> getIdsFromPropertyList(List<Property__c> properties){
        if(properties == null || properties.size() == 0){
            return null;
        }

        List<Id> ids = new List<Id>();

        for(Property__c p : properties){
            ids.add(p.Id);
        }

        return ids;
    }

    private static List<Id> getIdsFromDocLinkList(List<ContentDocumentLink> docLinkList){
        if(docLinkList == null || docLinkList.size() == 0){
            return null;
        }

        List<Id> ids = new List<Id>();

        for(ContentDocumentLink doc : docLinkList){
            ids.add(doc.ContentDocumentId);
        }

        return ids;
    }
}