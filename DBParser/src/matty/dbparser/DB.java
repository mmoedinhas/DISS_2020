package matty.dbparser;

import java.sql.*;

public class DB {

    static DB db = new DB();
    Connection conn = null;

    private DB() {}

    public static DB getDB() {
        return db;
    }

    public boolean connect(String dbPath) {

        if (conn != null) {
            if (!close()) return false;
        }

        String connectionString = "jdbc:sqlite:" + dbPath;
        try {
            conn = DriverManager.getConnection(connectionString);
            System.out.println("Connection to " + dbPath + " has been established.");
            return true;
        } catch (SQLException e) {
            System.out.println(e.getMessage());
            return false;
        }
    }

    public boolean close() {
        try {
            conn.close();
            conn = null;
            System.out.println("Connection closed successfully");
            return true;
        } catch (SQLException e) {
            System.out.println(e.getMessage());
            return false;
        }
    }

    public ResultSet selectAllPlayers() {
        String sql = "SELECT * FROM player";

        try {
            Statement stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery(sql);
            return rs;
        } catch (SQLException e) {
            System.out.println(e.getMessage());
            return null;
        }
    }

    @Override
    public String toString() {
        if(conn == null) {
            return "";
        }

        String s = "";
        ResultSet rs;
        if ((rs = selectAllPlayers()) != null) {
            while (true) {
                try {
                    if (!rs.next()) break;
                    s += "id - " + rs.getInt("p_id") + "\n" +
                            "\t" + "uuid - " + rs.getString("p_uuid") + "\n" +
                            "\t" + "default first - " + rs.getInt("p_default_first") + "\n" +
                            "\t" + "age - " + rs.getString("p_age") + "\n" +
                            "\t" + "language - " + rs.getString("p_language") + "\n" +
                            "\t" + "play games - " + rs.getString("p_play_games") + "\n" +
                            "\t" + "favorite genre - " + rs.getString("p_favorite_genre") + "\n" +
                            "\t" + "important narrative - " + rs.getInt("p_important_narrative") + "\n" +
                            "\t" + "deq - " + rs.getString("p_deq") + "\n" +
                            "\t" + "affective profile - " + rs.getString("p_affective_profile") + "\n" +
                            "\t" + "logs 1 - " + rs.getString("p_logs_1") + "\n" +
                            "\t" + "logs 2 - " + rs.getString("p_logs_2") + "\n" +
                            "\t" + "game exp core module 1 - " + rs.getString("p_game_exp_core_module_1") + "\n" +
                            "\t" + "game exp core module 2 - " + rs.getString("p_game_exp_core_module_2") + "\n" +
                            "\t" + "post game opinion 1 - " + rs.getString("p_post_game_opinion_1") + "\n" +
                            "\t" + "post game opinion 2 - " + rs.getString("p_post_game_opinion_2") + "\n" +
                            "\t" + "open answer game exp 1 - " + rs.getString("p_open_answer_game_exp_1") + "\n" +
                            "\t" + "open answer game exp 2 - " + rs.getString("p_open_answer_game_exp_2") + "\n" +
                            "\t" + "main character opinion 1 - " + rs.getString("p_main_character_opinion_1") + "\n" +
                            "\t" + "main character opinion 2 - " + rs.getString("p_main_character_opinion_2") + "\n" +
                            "\t" + "version liked most - " + rs.getString("p_version_liked_most") + "\n" +
                            "\t" + "open answer version liked most - " + rs.getString("p_open_answer_version_liked_most") + "\n" +
                            "\t" + "version reflected most - " + rs.getString("p_version_reflected_most") + "\n" +
                            "\t" + "open answer version reflected most - " + rs.getString("p_open_answer_version_reflected_most") + "\n" +
                            "\t" + "games like this in the future - " + rs.getString("p_games_like_this_in_the_future") + "\n" +
                            "\t" + "open answer games like this in the future - " + rs.getString("p_open_answer_games_like_this_in_the_future") + "\n" +
                            "\t" + "suggestions - " + rs.getString("p_suggestions") + "\n" +
                            "\n";
                } catch (SQLException e) {
                    System.out.println(e.getMessage());
                }
            }
        }

        return s;
    }
}
