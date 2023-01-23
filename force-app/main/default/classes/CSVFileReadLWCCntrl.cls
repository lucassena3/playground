public with sharing class CSVFileReadLWCCntrl {
    @AuraEnabled
    public static list<Account> csvFileRead(Id contentDocumentId){
        list<Account> accountInsertList = new list<Account>();
        if(contentDocumentId != null) {
            
            ContentVersion contentVersionObj = [SELECT Id, VersionData FROM ContentVersion WHERE ContentDocumentId =:contentDocumentId];
            
            System.debug(contentVersionObj);
            list<String> csvRecordsList = contentVersionObj.VersionData.toString().split('\n');

            for(Integer i = 1; i < csvRecordsList.size(); i++){
                Account accountObj = new Account();
                System.debug('csvRecordList ===> ' + csvRecordsList);
                list<String> csvRowData = csvRecordsList[i].split(';');
                System.debug('csvRowData====> '+csvRowData);
                accountObj.Name = csvRowData[0]; // accName
                accountObj.AccountSource = csvRowData[1];
                accountObj.Site = csvRowData[2];
                accountObj.Type = csvRowData[3];
                accountObj.Website = csvRowData[4];
                if(validations(accountObj.Name) == '') accountInsertList.add(accountObj); 
            }

            try{    
                if(!accountInsertList.isEmpty()) {
                    insert accountInsertList;
                }
            }
            catch (Exception ex) {
                throw new AuraHandledException(ex.getMessage());
            } 
        }
        return accountInsertList;    
    }
    
    public static String validations(String name){
        List<Account> contas = [SELECT Id, Name FROM Account];
        String retorno = '';
        Savepoint sp = Database.setSavepoint();
        for(Account conta: contas){
            if(conta.Name.contains(name)){
                retorno = 'Contem Name';
                Database.rollback(sp);
            }
        }
        return retorno;
    }
}
