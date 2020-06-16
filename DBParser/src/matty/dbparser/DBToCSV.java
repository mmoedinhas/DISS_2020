package matty.dbparser;

import org.json.JSONArray;
import org.json.JSONObject;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.DecimalFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeUnit;

import static java.time.temporal.ChronoUnit.MILLIS;

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
                        } else if (columnName.contains("p_affective_profile")) {
                            int[] indexHolder = {i};
                            player.addAll(getAffectiveProfile(rs, indexHolder));
                            i = indexHolder[0] - 1;
                        } else if (columnName.contains("p_logs")) {
                            player.add(getSessionTotalTime(rs, columnName));
                        } else if(columnName.contains("p_game_exp_core_module_")) {
                            columnName = columnName.split(":")[0];
                            int[] indexHolder = {i};
                            player.addAll(getGameExpCore(rs, indexHolder, columnName));
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

        while (CSVColumns.indexes.get(i).contains("p_deq")) {
            String deqKey = CSVColumns.indexes.get(i).split(":")[1];
            String deqValue = (String) jo.get(deqKey);
            deqValues.add(escapeString(deqValue));
            i++;
        }

        indexHolder[0] = i;
        return deqValues;
    }

    private List<String> getAffectiveProfile(ResultSet rs, int[] indexHolder) throws SQLException {
        String affectiveProfile = rs.getString("p_affective_profile");
        JSONObject jo = new JSONObject(affectiveProfile);
        List<String> apValues = new ArrayList<String>();
        int i = indexHolder[0];

        while (CSVColumns.indexes.get(i).contains("p_affective_profile")) {
            String apKey = CSVColumns.indexes.get(i).split(":")[1];
            String apValue = ((Integer) jo.get(apKey)).toString();
            apValues.add(escapeString(apValue));
            i++;
        }

        indexHolder[0] = i;
        return apValues;
    }

    private String getSessionTotalTime(ResultSet rs, String columnName) throws SQLException {
        String sessionLogs = rs.getString(columnName);
        JSONArray sessionLogsJA = new JSONArray(sessionLogs);
        JSONObject gameStartJO = null, gameEndJO = null;
        String time = "";

        for (int i = 0; i < sessionLogsJA.length(); i++) {
            String s = sessionLogsJA.getString(i);
            JSONObject jo = new JSONObject(s);

            if (jo != null) {
                String action = jo.getString("action");
                if (action.equals("Game START")) {
                    gameStartJO = jo;
                } else if (action.equals("Game END")) {
                    gameEndJO = jo;
                }
            }
        }

        if (gameStartJO != null && gameEndJO != null) {
            String startTimestamp = gameStartJO.getString("timestamp");
            String endTimestamp = gameEndJO.getString("timestamp");

            DateTimeFormatter df = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
            DecimalFormat nf = new DecimalFormat("00");

            LocalDateTime start = LocalDateTime.parse(startTimestamp, df);
            LocalDateTime end = LocalDateTime.parse(endTimestamp, df);

            long diff = MILLIS.between(start, end);
            long hours = TimeUnit.MILLISECONDS.toHours(diff);
            diff -= TimeUnit.HOURS.toMillis(hours);
            long minutes = TimeUnit.MILLISECONDS.toMinutes(diff);
            diff -= TimeUnit.MINUTES.toMillis(minutes);
            long seconds = TimeUnit.MILLISECONDS.toSeconds(diff);
            long milliseconds = diff - TimeUnit.SECONDS.toMillis(seconds);

            time = nf.format(hours) + ":" + nf.format(minutes) + ":" + nf.format(seconds) + "." + milliseconds;
        }

        return escapeString(time);
    }

    private List<String> getGameExpCore(ResultSet rs, int[] indexHolder, String columnName) throws SQLException {
        String gameExpCore = rs.getString(columnName);
        JSONObject jo = new JSONObject(gameExpCore);
        List<String> gecValues = new ArrayList<String>();
        int i = indexHolder[0];

        while (CSVColumns.indexes.get(i).contains(columnName)) {
            String gecKey = CSVColumns.indexes.get(i).split(":")[1];
            String gecValue = jo.getString(gecKey);
            gecValues.add(escapeString(gecValue));
            i++;
        }

        indexHolder[0] = i;
        return gecValues;
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
