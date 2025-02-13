public with sharing class AccountController {
    
    @AuraEnabled(cacheable=true)
    public static User getUserById(String id){
        try {
            if(String.isNotEmpty(id) || String.isNotBlank(id)){
                return [SELECT Email, Name FROM User WHERE Id = :id];
            }

            return null;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}