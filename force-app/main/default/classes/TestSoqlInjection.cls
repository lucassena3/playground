public class TestSoqlInjection {
    @AuraEnabled
    public static String teste(String nomeConta){
        String query = 'SELECT Id FROM Account WHERE Name =\' '+nomeConta+' \'';
        System.debug(query);
        List<Account> contaRetornada = Database.query(query);
        System.debug(contaRetornada);
        return JSON.serialize(contaRetornada);
    }
}