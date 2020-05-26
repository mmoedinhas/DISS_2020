<?php

$dbExists = file_exists("database/diss2020.db");

try {
    $dbh = new PDO('sqlite:database/diss2020.db');
    $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $dbh->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
} catch (PDOException $e) {
    echo 'Connection failed: ' . $e->getMessage();
}

if (!$dbExists) {
    $sqlfile = fopen("database/diss2020.sql", "r");
    if ($sqlfile) {
        $sqlcontents = fread($sqlfile, filesize("database/diss2020.sql"));

        $dbh->exec($sqlcontents);
        fclose($sqlfile);
    }
}