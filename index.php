<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OpenFM Player</title>
    <link rel="stylesheet" media="screen and (min-width: 1050px)" href="desktop.css">
    <link rel="stylesheet" media="screen and (max-width: 1050px)" href="mobile.css">
    <link rel="manifest" href="/manifest.json">
</head>

<body>
    <audio id="player" src=""></audio>
    <div id="menu-button" onclick="toggleList()">&#9776;</div>
    <div id="wrapper">
        <h1 id="start">Welcome to OpenFM&nbsp;Player</h1>
        <div id="container">
            <div id="info">
                <div id="cover">&nbsp;</div>
                <h2 id="title"></h2>
                <h3 id="artist"></h3>
            </div>

            <div id="playpause" onclick="playpause()">&#x23ef;</div>

        </div>
    </div>
    <div id="menu-list">
        <div id="close-button" onclick="toggleList()">&times;</div>
        <input type="text" name="search" id="search" placeholder="Search" onkeyup="search()">
        <div id="list">
            <?php
                $stations_json = file_get_contents('https://open.fm/api/static/stations/stations_new.json');
                $stations = json_decode($stations_json, true);
                foreach ($stations["channels"] as $station) {
                    echo '
                        <div class="station" id="s'.$station["id"].'" onclick=\'playstation(this)\'>
                        <div class="logo" style="background-image: url(\''.$station["logo"]["url"].'\'); background-size: cover; background-position: center;"></div>
                        <div class="name">'.$station["name"].'</div>
                        </div>
                    ';}
            ?>
        </div>
    </div>
    <script src="player.js"></script>
</body>

</html>