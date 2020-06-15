<?php

// Do not let any attacker know that they have just been denied access.
// This code requires php 5.4 or newer.

if (function_exists('http_response_code') && http_response_code() != 404) {

    @http_response_code(404);
}

?>

<body>
    <h1>Not Found</h1>
    <p>The requested URL <?php echo $_SERVER['REQUEST_URI']; ?> was not found on this server.</p>
</body>