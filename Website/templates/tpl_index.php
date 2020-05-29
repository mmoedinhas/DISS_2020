<?php function draw_index()
{ ?>
    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <title>Survey</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
        <meta name="HandheldFriendly" content="True">
        <meta name="MobileOptimized" content="320">
        <meta http-equiv="cleartype" content="on">
        <script src="./js/jquery-3.5.1.min.js"></script>
        <link href="https://surveyjs.azureedge.net/1.7.7/survey.css" type="text/css" rel="stylesheet" />
        <script src="https://surveyjs.azureedge.net/1.7.7/survey.jquery.min.js"></script>
        <link type="text/css" rel="stylesheet" href="css/style.css">
    </head>

    <body>
        <div id="debug" style="display: none;">
        </div>

        <div id="surveyContainer"></div>

        <script type="text/javascript" src="./game/1.app.bundle.js"></script>
        <script type="text/javascript" src="./game/app.bundle.js"></script>
        <script type="text/javascript" src="./js/gameWidget.js"></script>
        <script type="text/javascript" src="./js/survey.js"></script>
        <script type="text/javascript" src="./js/script.js"></script>
        <script>
        </script>
    </body>

    </html>
<?php } ?>