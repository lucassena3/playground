public class AccountHandler {
    public static Account insertNewAccount(String nameAcc){
        Account acc = new Account(Name = nameACC);
        try{
            insert acc;
            return acc;
        }catch (DmlException e){
            System.debug(e.getMessage());
            return null;
        }
        
    }
}