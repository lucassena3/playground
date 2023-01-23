public with sharing class ExportDataController {
    
    @AuraEnabled(cacheable=true)
    public static List<Contact> getAccountDataToExport(Id idConta){
        List<Contact> lstContacts = [SELECT Id, 
                                        FirstName, 
                                        LastName, 
                                        Email,
                                        AccountId 
                                    FROM Contact 
                                    WHERE AccountId =: idConta
                                    LIMIT 10];
        return lstContacts;
    }
}