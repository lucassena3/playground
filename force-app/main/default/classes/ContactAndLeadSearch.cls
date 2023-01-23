public class ContactAndLeadSearch {
    public static List<List<sObject>> searchContactsAndLeads(String name){
        List<List<sObject>> listReturn = [FIND :name IN ALL FIELDS RETURNING Lead(FirstName,LastName),Contact(FirstName,LastName)];
        return listReturn;
    }
}