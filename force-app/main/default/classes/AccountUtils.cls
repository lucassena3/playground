public class AccountUtils {
    public static List<Account> accountsByState(String state){
        List<Account> listAcc = [SELECT Id, Name FROM Account WHERE BillingState = : state];
        return listAcc;
    }
}