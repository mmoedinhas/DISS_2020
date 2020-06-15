package matty.dbparser;

import java.io.IOException;
import java.util.List;

public class DBParser {

    public static void main(String[] args) {

        if (!(args.length == 1 || args.length == 2)) {
            System.out.println("Usage: java DBParser <path-to-db> ?<parent-path-to-results.csv>");
            return;
        }

        DB db = DB.getDB();
        DBToCSV parser = new DBToCSV(db);

        if (!db.connect(args[0])) return;
        //System.out.println(db);

        List<List<String>> results = parser.selectAllPlayersData();

        try {

            CSVWriter csvWriter;
            if(args.length == 1) {
                csvWriter = new CSVWriter("./");
            } else {
                csvWriter = new CSVWriter(args[1]);
            }

            for(List<String> rowData: results) {
                csvWriter.writeRow(rowData);
            }

            csvWriter.close();
        } catch (IOException e) {
            System.out.println(e.getMessage());
        }

        db.close();

    }
}