public class StringArrayTest {
    public static List<String> generateStringArray(Integer num){
        String[] listReturn = new List<String>();
        for(Integer i = 0; i<num; i++){
            listReturn.add('Test ' + i);
        }
        return listReturn;
    }
}