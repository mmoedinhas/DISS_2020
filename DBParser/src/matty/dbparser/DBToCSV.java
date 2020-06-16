package matty.dbparser;

import org.json.JSONObject;

import java.sql.Array;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

public class DBToCSV {

    private DB db;

    public DBToCSV(DB db) {
        this.db = db;
    }

    public List<List<String>> selectAllPlayersData() {
        ResultSet rs;
        List<List<String>> list = new ArrayList<List<String>>();

        List<List<String>> headers = getHeaders();

        list.addAll(headers);

        if ((rs = db.selectAllPlayers()) != null) {
            while (true) {
                try {
                    if (!rs.next()) break;
                } catch (SQLException e) {
                    System.out.println(e.getMessage());
                    break;
                }
                List<String> player = new ArrayList<String>();

                for (int i = 0; i <= CSVColumns.getHighestIndex(); i++) {
                    String columnName = CSVColumns.indexes.get(i);

                    try {
                        if (columnName.contains("p_deq")) {
                            int[] indexHolder = {i};
                            player.addAll(getDeq(rs, indexHolder));
                            i = indexHolder[0] - 1;
                        } else {
                            player.add(getRow(rs, columnName));
                        }
                    } catch (SQLException e) {
                        System.out.println(e.getMessage());
                        player.add(escapeString(""));
                    }
                }

                list.add(player);
            }
        }

        return list;
    }

    private List<List<String>> getHeaders() {
        List<String> header1 = new ArrayList<String>();
        List<String> header2 = new ArrayList<String>();


        for (int i = 0; i <= CSVColumns.getHighestIndex(); i++) {
            String s1 = CSVColumns.header1.get(i);
            if (s1 == null) {
                s1 = "";
            }

            s1 = escapeString(s1);
            header1.add(s1);

            String s2 = CSVColumns.header2.get(i);
            if (s2 == null) {
                s2 = "";
            }

            escapeString(s2);
            header2.add(s2);
        }

        ArrayList<List<String>> headers = new ArrayList<List<String>>();
        headers.add(header1);
        headers.add(header2);
        return headers;
    }

    private List<String> getDeq(ResultSet rs, int[] indexHolder) throws SQLException {
        String deq = rs.getString("p_deq");
        JSONObject jo = new JSONObject(deq);
        List<String> deqValues = new ArrayList<String>();
        int i = indexHolder[0];
        System.out.println("i before: " + i);

        while(CSVColumns.indexes.get(i).contains("p_deq")) {
            String deqKey = CSVColumns.indexes.get(i).split(":")[1];
            String deqValue = (String) jo.get(deqKey);
            deqValues.add(escapeString(deqValue));
            i++;
        }

        System.out.println("i after: " + i);
        indexHolder[0] = i;
        return deqValues;
    }

    private String getRow(ResultSet rs, String rowName) throws SQLException {
        String data = rs.getString(rowName);

        if (data == null) {
            data = "";
        }

        data = escapeString(data);

        return data;
    }

    private String escapeString(String s) {
        s = s.replace('"', '\'');
        return s = "\"" + s + "\"";
    }
}
