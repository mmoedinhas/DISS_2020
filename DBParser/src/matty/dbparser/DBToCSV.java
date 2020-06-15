package matty.dbparser;

import javax.xml.transform.Result;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class DBToCSV {

    private DB db;

    public DBToCSV(DB db) {
        this.db = db;
    }

    public List<List<String>> selectAllPlayersData() {
        ResultSet rs;
        List<List<String>> list = new ArrayList<List<String>>();

        List<String> header = Arrays.asList("id",
                "uuid",
                "default first",
                "age",
                "language",
                "plays games",
                "favorite genre",
                "how important is narrative",
                "deq",
                "affective profile",
                "logs session 1",
                "logs session 2",
                "game exp core module session 1",
                "game exp core module session 2",
                "post game opinion session 1",
                "post game opinion session 2",
                "open answer game exp session 1",
                "open answer game exp session 2",
                "main character opinion session 1",
                "main character opinion session 2",
                "version liked most",
                "open answer version liked most",
                "version reflected most",
                "open answer version reflected most",
                "play games like this in the future?",
                "open answer games like this in the future",
                "suggestions");

        list.add(header);

        if ((rs = db.selectAllPlayers()) != null) {
            while (true) {
                try {
                    if (!rs.next()) break;
                } catch (SQLException e) {
                    System.out.println(e.getMessage());
                    break;
                }
                    List<String> player = new ArrayList<String>();

                try {
                    player.add(getRow(rs, "p_id"));
                    player.add(getRow(rs, "p_uuid"));
                    player.add(getRow(rs, "p_default_first"));
                    player.add(getRow(rs, "p_age"));
                    player.add(getRow(rs, "p_language"));
                    player.add(getRow(rs, "p_play_games"));
                    player.add(getRow(rs, "p_favorite_genre"));
                    player.add(getRow(rs, "p_important_narrative"));
                    player.add(getRow(rs, "p_deq"));
                    player.add(getRow(rs, "p_affective_profile"));
                    player.add(getRow(rs, "p_logs_1"));
                    player.add(getRow(rs, "p_logs_2"));
                    player.add(getRow(rs, "p_game_exp_core_module_1"));
                    player.add(getRow(rs, "p_game_exp_core_module_2"));
                    player.add(getRow(rs, "p_post_game_opinion_1"));
                    player.add(getRow(rs, "p_post_game_opinion_2"));
                    player.add(getRow(rs, "p_open_answer_game_exp_1"));
                    player.add(getRow(rs, "p_open_answer_game_exp_2"));
                    player.add(getRow(rs, "p_main_character_opinion_1"));
                    player.add(getRow(rs, "p_main_character_opinion_2"));
                    player.add(getRow(rs, "p_version_liked_most"));
                    player.add(getRow(rs, "p_open_answer_version_liked_most"));
                    player.add(getRow(rs, "p_version_reflected_most"));
                    player.add(getRow(rs, "p_open_answer_version_reflected_most"));
                    player.add(getRow(rs, "p_games_like_this_in_the_future"));
                    player.add(getRow(rs, "p_open_answer_games_like_this_in_the_future"));
                    player.add(getRow(rs, "p_suggestions"));
                    list.add(player);
                } catch (SQLException e) {
                    System.out.println(e.getMessage());
                }
            }
        }

        return list;
    }

    private String getRow(ResultSet rs, String rowName) throws SQLException {
        String data = rs.getString(rowName);

        if(data == null) {
            data = "\"\"";
        } else {
            data = "\"" + data + "\"";
        }

        return data;
    }
}
