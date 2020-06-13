package matty.dbparser;

public class DBParser {

    public static void main(String[] args) {

        if (args.length != 1) {
            System.out.println("Usage: java DBParser <path-to-db>");
            return;
        }

        DB db = DB.getDB();

        if (!db.connect(args[0])) return;
        System.out.println(db);

        db.close();

    }
}