package matty.dbparser;

import org.json.JSONObject;

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

//        if ((rs = db.selectAllPlayers()) != null) {
//            while (true) {
//                try {
//                    if (!rs.next()) break;
//                } catch (SQLException e) {
//                    System.out.println(e.getMessage());
//                    break;
//                }
//                List<String> player = new ArrayList<String>();
//
//                try {
//                    player.add(getRow(rs, "p_id"));
//                    player.add(getRow(rs, "p_uuid"));
//                    player.add(getRow(rs, "p_default_first"));
//                    player.add(getRow(rs, "p_age"));
//                    player.add(getRow(rs, "p_language"));
//                    player.add(getRow(rs, "p_play_games"));
//                    player.add(getRow(rs, "p_favorite_genre"));
//                    player.add(getRow(rs, "p_important_narrative"));
//                    player.add(getRow(rs, "p_deq"));
//                    player.add(getRow(rs, "p_affective_profile"));
//                    player.add(getRow(rs, "p_logs_1"));
//                    player.add(getRow(rs, "p_logs_2"));
//                    player.add(getRow(rs, "p_game_exp_core_module_1"));
//                    player.add(getRow(rs, "p_game_exp_core_module_2"));
//                    player.add(getRow(rs, "p_post_game_opinion_1"));
//                    player.add(getRow(rs, "p_post_game_opinion_2"));
//                    player.add(getRow(rs, "p_open_answer_game_exp_1"));
//                    player.add(getRow(rs, "p_open_answer_game_exp_2"));
//                    player.add(getRow(rs, "p_main_character_opinion_1"));
//                    player.add(getRow(rs, "p_main_character_opinion_2"));
//                    player.add(getRow(rs, "p_version_liked_most"));
//                    player.add(getRow(rs, "p_open_answer_version_liked_most"));
//                    player.add(getRow(rs, "p_version_reflected_most"));
//                    player.add(getRow(rs, "p_open_answer_version_reflected_most"));
//                    player.add(getRow(rs, "p_games_like_this_in_the_future"));
//                    player.add(getRow(rs, "p_open_answer_games_like_this_in_the_future"));
//                    player.add(getRow(rs, "p_suggestions"));
//                    list.add(player);
//                } catch (SQLException e) {
//                    System.out.println(e.getMessage());
//                }
//            }
//        }

        return list;
    }

    private List<List<String>> getHeaders() {
        List<String> header1 = new ArrayList<String>();
        List<String> header2 = new ArrayList<String>();


        for(int i = 0; i <= CSVColumns.getHighestIndex(); i++) {
            String s1 = CSVColumns.header1.get(i);
            if(s1 == null) {
                s1 = "";
            }

            s1 = "\"" + s1 + "\"";
            header1.add(s1);

            String s2 = CSVColumns.header2.get(i);
            if(s2 == null) {
                s2 = "";
            }

            s2 = "\"" + s2 + "\"";
            header2.add(s2);
        }

        ArrayList<List<String>> headers = new ArrayList<List<String>>();
        headers.add(header1);
        headers.add(header2);
        return headers;
    }

    private String getJSONRow() {
        JSONObject jo = new JSONObject("");
        return "";
    }

    private String getRow(ResultSet rs, String rowName) throws SQLException {
        String data = rs.getString(rowName);

        if (data == null) {
            data = "\"\"";
        } else {
            data = "\"" + data + "\"";
        }

        return data;
    }
}
