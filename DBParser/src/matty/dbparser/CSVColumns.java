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
        indexes.put(8, "p_deq:anger");
        indexes.put(9, "p_deq:wanting");
        indexes.put(10, "p_deq:dread");
        indexes.put(11, "p_deq:sad");
        indexes.put(12, "p_deq:easygoing");
        indexes.put(13, "p_deq:grossed_out");
        indexes.put(14, "p_deq:happy");
        indexes.put(15, "p_deq:terror");
        indexes.put(16, "p_deq:rage");
        indexes.put(17, "p_deq:grief");
        indexes.put(18, "p_deq:nausea");
        indexes.put(19, "p_deq:anxiety");
        indexes.put(20, "p_deq:chilled_out");
        indexes.put(21, "p_deq:desire");
        indexes.put(22, "p_deq:nervous");
        indexes.put(23, "p_deq:lonely");
        indexes.put(24, "p_deq:scared");
        indexes.put(25, "p_deq:mad");
        indexes.put(26, "p_deq:satisfaction");
        indexes.put(27, "p_deq:sickened");
        indexes.put(28, "p_deq:empty");
        indexes.put(29, "p_deq:craving");
        indexes.put(30, "p_deq:panic");
        indexes.put(31, "p_deq:longing");
        indexes.put(32, "p_deq:calm");
        indexes.put(33, "p_deq:fear");
        indexes.put(34, "p_deq:relaxation");
        indexes.put(35, "p_deq:revulsion");
        indexes.put(36, "p_deq:worry");
        indexes.put(37, "p_deq:enjoyment");
        indexes.put(38, "p_deq:pissed_of");
        indexes.put(39, "p_deq:liking");
        indexes.put(40, "p_affective_profile:anger");
        indexes.put(41, "p_affective_profile:disgust");
        indexes.put(42, "p_affective_profile:fear");
        indexes.put(43, "p_affective_profile:anxiety");
        indexes.put(44, "p_affective_profile:sadness");
        indexes.put(45, "p_affective_profile:desire");
        indexes.put(46, "p_affective_profile:relaxation");
        indexes.put(47, "p_affective_profile:happiness");
        indexes.put(48, "p_logs_1");
        indexes.put(49, "p_logs_2");
        indexes.put(50, "p_game_exp_core_module_1:1");
        indexes.put(51, "p_game_exp_core_module_1:3");
        indexes.put(52, "p_game_exp_core_module_1:4");
        indexes.put(53, "p_game_exp_core_module_1:5");
        indexes.put(54, "p_game_exp_core_module_1:6");
        indexes.put(55, "p_game_exp_core_module_1:7");
        indexes.put(56, "p_game_exp_core_module_1:8");
        indexes.put(57, "p_game_exp_core_module_1:9");
        indexes.put(58, "p_game_exp_core_module_1:12");
        indexes.put(59, "p_game_exp_core_module_1:13");
        indexes.put(60, "p_game_exp_core_module_1:14");
        indexes.put(61, "p_game_exp_core_module_1:16");
        indexes.put(62, "p_game_exp_core_module_1:18");
        indexes.put(63, "p_game_exp_core_module_1:19");
        indexes.put(64, "p_game_exp_core_module_1:20");
        indexes.put(65, "p_game_exp_core_module_1:22");
        indexes.put(66, "p_game_exp_core_module_1:24");
        indexes.put(67, "p_game_exp_core_module_1:25");
        indexes.put(68, "p_game_exp_core_module_1:27");
        indexes.put(69, "p_game_exp_core_module_1:28");
        indexes.put(70, "p_game_exp_core_module_1:29");
        indexes.put(71, "p_game_exp_core_module_1:30");
        indexes.put(72, "p_game_exp_core_module_1:31");
        indexes.put(73, "p_game_exp_core_module_2:1");
        indexes.put(74, "p_game_exp_core_module_2:3");
        indexes.put(75, "p_game_exp_core_module_2:4");
        indexes.put(76, "p_game_exp_core_module_2:5");
        indexes.put(77, "p_game_exp_core_module_2:6");
        indexes.put(78, "p_game_exp_core_module_2:7");
        indexes.put(79, "p_game_exp_core_module_2:8");
        indexes.put(80, "p_game_exp_core_module_2:9");
        indexes.put(81, "p_game_exp_core_module_2:12");
        indexes.put(82, "p_game_exp_core_module_2:13");
        indexes.put(83, "p_game_exp_core_module_2:14");
        indexes.put(84, "p_game_exp_core_module_2:16");
        indexes.put(85, "p_game_exp_core_module_2:18");
        indexes.put(86, "p_game_exp_core_module_2:19");
        indexes.put(87, "p_game_exp_core_module_2:20");
        indexes.put(88, "p_game_exp_core_module_2:22");
        indexes.put(89, "p_game_exp_core_module_2:24");
        indexes.put(90, "p_game_exp_core_module_2:25");
        indexes.put(91, "p_game_exp_core_module_2:27");
        indexes.put(92, "p_game_exp_core_module_2:28");
        indexes.put(93, "p_game_exp_core_module_2:29");
        indexes.put(94, "p_game_exp_core_module_2:30");
        indexes.put(95, "p_game_exp_core_module_2:31");
        indexes.put(96, "p_post_game_opinion_1");
        indexes.put(97, "p_post_game_opinion_2");
        indexes.put(98, "p_open_answer_game_exp_1");
        indexes.put(99, "p_open_answer_game_exp_2");
        indexes.put(100, "p_main_character_opinion_1");
        indexes.put(101, "p_main_character_opinion_2");
        indexes.put(102, "p_version_liked_most");
        indexes.put(103, "p_open_answer_version_liked_most");
        indexes.put(104, "p_version_reflected_most");
        indexes.put(105, "p_open_answer_version_reflected_most");
        indexes.put(106, "p_games_like_this_in_the_future");
        indexes.put(107, "p_open_answer_games_like_this_in_the_future");
        indexes.put(108, "p_suggestions");

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
        header.put(48, "session 1 total time");
        header.put(49, "session 2 total time");
        header.put(50, "game exp core module session 1");
        header.put(73, "game exp core module session 2");
        header.put(96, "post game opinion session 1");
        header.put(97, "post game opinion session 2");
        header.put(98, "open answer game exp session 1");
        header.put(99, "open answer game exp session 2");
        header.put(100, "main character opinion session 1");
        header.put(101, "main character opinion session 2");
        header.put(102, "version liked most");
        header.put(103, "open answer version liked most");
        header.put(104, "version reflected most");
        header.put(105, "open answer version reflected most");
        header.put(106, "play games like this in the future?");
        header.put(107, "open answer games like this in the future");
        header.put(108, "suggestions");

        return header;
    }

    private static TreeMap<Integer, String> initHeader2() {
        TreeMap<Integer, String> header = new TreeMap<Integer, String>();

        // deq
        header.put(8, "anger");
        header.put(9, "wanting");
        header.put(10, "dread");
        header.put(11, "sad");
        header.put(12, "easygoing");
        header.put(13, "grossed out");
        header.put(14, "happy");
        header.put(15, "terror");
        header.put(16, "rage");
        header.put(17, "grief");
        header.put(18, "nausea");
        header.put(19, "anxiety");
        header.put(20, "chilled out");
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
        header.put(38, "pissed of");
        header.put(39, "liking");

        //affective profile
        header.put(40, "anger");
        header.put(41, "disgust");
        header.put(42, "fear");
        header.put(43, "anxiety");
        header.put(44, "sadness");
        header.put(45, "desire");
        header.put(46, "relaxation");
        header.put(47, "happiness");

        //game exp core module session 1
        header.put(50, "1");
        header.put(51, "3");
        header.put(52, "4");
        header.put(53, "5");
        header.put(54, "6");
        header.put(55, "7");
        header.put(56, "8");
        header.put(57, "9");
        header.put(58, "12");
        header.put(59, "13");
        header.put(60, "14");
        header.put(61, "16");
        header.put(62, "18");
        header.put(63, "19");
        header.put(64, "20");
        header.put(65, "22");
        header.put(66, "24");
        header.put(67, "25");
        header.put(68, "27");
        header.put(69, "28");
        header.put(70, "29");
        header.put(71, "30");
        header.put(72, "31");

        //game exp core module session 1
        header.put(73, "1");
        header.put(74, "3");
        header.put(75, "4");
        header.put(76, "5");
        header.put(77, "6");
        header.put(78, "7");
        header.put(79, "8");
        header.put(80, "9");
        header.put(81, "12");
        header.put(82, "13");
        header.put(83, "14");
        header.put(84, "16");
        header.put(85, "18");
        header.put(86, "19");
        header.put(87, "20");
        header.put(88, "22");
        header.put(89, "24");
        header.put(90, "25");
        header.put(91, "27");
        header.put(92, "28");
        header.put(93, "29");
        header.put(94, "30");
        header.put(95, "31");

        return header;
    }

    public static int getHighestIndex() {
        return indexes.lastKey();
    }
}
