package matty.dbparser;

import java.io.IOException;

public class DBParser {

    public static void main(String[] args) {

        if (args.length != 1) {
            System.out.println("Usage: java DBParser <path-to-db>");
            return;
        }

        DB db = DB.getDB();

        if (!db.connect(args[0])) return;
//        System.out.println(db);

        try {
            CSVWriter csvWriter = new CSVWriter("./");
            csvWriter.close();
        } catch (IOException e) {
            System.out.println(e.getMessage());
        }

        db.close();

    }
}