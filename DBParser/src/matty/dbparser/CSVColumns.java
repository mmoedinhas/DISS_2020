package matty.dbparser;

import java.util.*;

public class CSVColumns {
    public static final TreeMap<Integer, String> indexes = initIndexes();
    public static final TreeMap<Integer, String> header1 = initHeader1();
    public static final TreeMap<Integer, String> header2 = initHeader2();

    private static TreeMap<Integer, String> initIndexes() {
        TreeMap<Integer, String> indexes = new TreeMap<Integer, String>();
        indexes.put(0, "p_id");
        indexes.put(1, "p_uuid");
        indexes.put(2, "p_default_first");
        indexes.put(3, "p_age");
        indexes.put(4, "p_language");
        indexes.put(5, "p_play_games");
        indexes.put(6, "p_favorite_genre");
        indexes.put(7, "p_important_narrative");
        indexes.put(8, "p_deq");
        indexes.put(40, "p_affective_profile");
        indexes.put(41, "p_logs_1");
        indexes.put(42, "p_logs_2");
        indexes.put(43, "p_game_exp_core_module_1");
        indexes.put(44, "p_game_exp_core_module_2");
        indexes.put(45, "p_post_game_opinion_1");
        indexes.put(46, "p_post_game_opinion_2");
        indexes.put(47, "p_open_answer_game_exp_1");
        indexes.put(48, "p_open_answer_game_exp_2");
        indexes.put(49, "p_main_character_opinion_1");
        indexes.put(50, "p_main_character_opinion_2");
        indexes.put(51, "p_version_liked_most");
        indexes.put(52, "p_open_answer_version_liked_most");
        indexes.put(53, "p_version_reflected_most");
        indexes.put(54, "p_open_answer_version_reflected_most");
        indexes.put(55, "p_games_like_this_in_the_future");
        indexes.put(56, "p_open_answer_games_like_this_in_the_future");
        indexes.put(57, "p_suggestions");

        return indexes;
    }

    private static TreeMap<Integer, String> initHeader1() {
        TreeMap<Integer, String> header = new TreeMap<Integer, String>();
        header.put(0, "id");
        header.put(1, "uuid");
        header.put(2, "default first");
        header.put(3, "age");
        header.put(4, "language");
        header.put(5, "plays games");
        header.put(6, "favorite genre");
        header.put(7, "how important is narrative");
        header.put(8, "deq");
        header.put(40, "affective profile");
        header.put(41, "logs session 1");
        header.put(42, "logs session 2");
        header.put(43, "game exp core module session 1");
        header.put(44, "game exp core module session 2");
        header.put(45, "post game opinion session 1");
        header.put(46, "post game opinion session 2");
        header.put(47, "open answer game exp session 1");
        header.put(48, "open answer game exp session 2");
        header.put(49, "main character opinion session 1");
        header.put(50, "main character opinion session 2");
        header.put(51, "version liked most");
        header.put(52, "open answer version liked most");
        header.put(53, "version reflected most");
        header.put(54, "open answer version reflected most");
        header.put(55, "play games like this in the future?");
        header.put(56, "open answer games like this in the future");
        header.put(57, "suggestions");

        return header;
    }

    private static TreeMap<Integer, String> initHeader2() {
        TreeMap<Integer, String> header = new TreeMap<Integer, String>();

        header.put(8, "anger");
        header.put(9, "wanting");
        header.put(10, "dread");
        header.put(11, "sad");
        header.put(12, "easygoing");
        header.put(13, "grossed_out");
        header.put(14, "happy");
        header.put(15, "terror");
        header.put(16, "rage");
        header.put(17, "grief");
        header.put(18, "nausea");
        header.put(19, "anxiety");
        header.put(20, "chilled_out");
        header.put(21, "desire");
        header.put(22, "nervous");
        header.put(23, "lonely");
        header.put(24, "scared");
        header.put(25, "mad");
        header.put(26, "satisfaction");
        header.put(27, "sickened");
        header.put(28, "empty");
        header.put(29, "craving");
        header.put(30, "panic");
        header.put(31, "longing");
        header.put(32, "calm");
        header.put(33, "fear");
        header.put(34, "relaxation");
        header.put(35, "revulsion");
        header.put(36, "worry");
        header.put(37, "enjoyment");
        header.put(38, "pissed_of");
        header.put(39, "liking");

        return header;
    }

    public static int getHighestIndex() {
        return indexes.lastKey();
    }
}
