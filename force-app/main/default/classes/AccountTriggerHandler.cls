public class AccountTriggerHandler {
    public static void CreateAccounts(List<Account> listAcc){
        for(Account acc : listAcc){
            acc.ShippingState = acc.BillingState;
        }
    }
}