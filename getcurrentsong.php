<?php
if(isset($_GET["id"])){
$info_json = file_get_contents('https://open.fm/api/api-ext/v2/channels/long.json');
$info = json_decode($info_json, true);
$date = new DateTime();
$undef = True;
$timestamp = $date->getTimestamp();
foreach($info["channels"] as $channel){
    if($channel["id"] == $_GET["id"]){
        foreach($channel["tracks"] as $track){
            if($track["begin"] < $timestamp && $track["end"] > $timestamp){
                header('Content-Type: application/json');
                echo json_encode($track);
                $undef = False;
            }
        }
        break;
        
    }

}
if($undef){
                header('Content-Type: application/json');
                echo json_encode(json_decode('{"undefined": true}'));
}
}
?>