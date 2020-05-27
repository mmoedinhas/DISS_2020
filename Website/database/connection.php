<?php

if ($_SERVER['REQUEST_METHOD'] == 'GET' && realpath(__FILE__) == realpath($_SERVER['SCRIPT_FILENAME'])) {
    /* 
       Up to you which header to send, some prefer 404 even if 
       the files does exist for security
    */
    header('HTTP/1.0 403 Forbidden', TRUE, 404);

    /* choose the appropriate page to redirect users */
    die(header('location: ../index.php'));
}

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
