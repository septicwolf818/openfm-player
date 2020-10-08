var interval = undefined;
var playingId = undefined;
var mobileMenuVisible = false;
var noInfo = false;
var playing = false;
window.addEventListener("resize", () => {
    if (document.body.clientWidth > 1050) {
        document.querySelector("#menu-list").style.display = "block";
        if (playingId || noInfo)
                document.querySelector("#container").style.display = "block";
            else
                document.querySelector("#start").style.display = "block";
    } else {
        if (!(document.activeElement === document.querySelector("#search"))) {
            document.querySelector("#menu-list").style.display = "none";
            mobileMenuVisible = false;
            console.log("unv");
            if (playingId || noInfo)
                document.querySelector("#container").style.display = "block";
            else
                document.querySelector("#start").style.display = "block";
        }
        else {
            mobileMenuVisible = true;
            if (playingId || noInfo)
                document.querySelector("#container").style.display = "none";
            else
                document.querySelector("#start").style.display = "none";
        }
    }
})

function playstation(caller) {
    clearInterval(interval);

    document.querySelectorAll(".station").forEach(s => {
        s.classList.remove("active");
    });
    caller.classList.add("active");

    var id = caller.id;
    id = parseInt((id + "").replace("s", ""));
    playingId = id;
    var url = "getcurrentsong.php?id=" + id;
    fetch(url)
        .then(res => res.json())
        .then((out) => {
            console.log('Loaded track info', out);
            if (out.undefined) noInfo = true;
            else noInfo = false;
            if (out.undefined) {
                document.querySelector("#title").innerHTML = caller.querySelector(".name").innerHTML;
                document.querySelector("#artist").innerHTML = "";
                document.querySelector("#cover").style.backgroundImage = caller.querySelector(".logo").style.backgroundImage;
            } else {
                document.querySelector("#title").innerHTML = out.song.title;
                document.querySelector("#artist").innerHTML = out.song.artist;
                if (out.song.album.cover_uri == "")
                    document.querySelector("#cover").style.backgroundImage = caller.querySelector(".logo").style.backgroundImage;
                else
                    document.querySelector("#cover").style.backgroundImage =
                    "url('https://open.fm/cover/180x180/" + out.song.album.cover_uri + "')";
            }
            document.querySelector("#start").style.display = "none";
            document.querySelector("#container").style.display = "block";


            document.querySelector("#player").src = "https://stream.open.fm/" + id + "?type=.mp3";
            document.querySelector("#player").play();
            playing = true;
            interval = setInterval(() => {
                var url = "getcurrentsong.php?id=" + playingId;
                fetch(url)
                    .then(res => res.json())
                    .then((out) => {
                        if (out.undefined) noInfo = true;
                        else noInfo = false;
                        if (out.undefined) {
                            document.querySelector("#title").innerHTML = caller.querySelector(".name").innerHTML;
                            document.querySelector("#artist").innerHTML = "";
                            document.querySelector("#cover").style.backgroundImage = caller.querySelector(".logo").style.backgroundImage;
                        } else {
                            document.querySelector("#title").innerHTML = out.song.title;
                            document.querySelector("#artist").innerHTML = out.song.artist;
                            if (out.song.album.cover_uri == "")
                                document.querySelector("#cover").style.backgroundImage = caller.querySelector(".logo").style.backgroundImage;
                            else
                                document.querySelector("#cover").style.backgroundImage =
                                "url('https://open.fm/cover/180x180/" + out.song.album.cover_uri + "')";
                        }
                    })
                    .catch(err => {
                        throw err
                    });
            }, 5000);

            if (document.body.clientWidth <= 1050) toggleList();
        })
        .catch(err => {
            throw err
        });
}

function toggleList() {
    console.log("Toggle");
    if (mobileMenuVisible) {
        document.querySelector("#menu-list").style.display = "none";
        if (playingId)
            document.querySelector("#container").style.display = "block";
        else
            document.querySelector("#start").style.display = "block";

    } else {
        document.querySelector("#menu-list").style.display = "block";
        document.querySelector("#start").style.display = "none";
        document.querySelector("#container").style.display = "none";
    }
    mobileMenuVisible = !mobileMenuVisible;
}


function playpause(){
    if(playing){
        document.querySelector("#player").pause();
    }
    else {
        document.querySelector("#player").src = "https://stream.open.fm/" + playingId + "?type=.mp3";
        document.querySelector("#player").play();
    }
    playing = !playing;
}

function search(){
    document.querySelectorAll(".name").forEach(e=>{
        if( e.innerHTML.toLowerCase().indexOf(document.querySelector("#search").value.toLowerCase()) == -1)
        e.parentNode.style.display = "none";
        else e.parentNode.style.display = "block";
    });
}