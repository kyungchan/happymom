
<template>
<v-container>
  <v-row>
    <v-col>
      <v-card>
        <v-card-title class="display-1" v-html="$t('menu4')"></v-card-title>
        <v-card-text class="subtitle-1" v-html="$t('menu4-subtitle')">자유롭게 감상후 느낌에 대해 간단히 이야기 하기</v-card-text>

        <html>
          <body>
            <div class="container">
              <div class="column add-bottom">
                <div id="mainwrap">
                  <div id="nowPlay">
                    <span id="npAction">Paused...</span>
                    <span id="npTitle"></span>
                  </div>
                  <div id="audiowrap">
                    <div id="audio0">
                      <audio
                        id="audio1"
                        preload
                        controls
                      >Your browser does not support HTML5 Audio! 😢</audio>
                    </div>
                    <div id="tracks">
                      <a id="btnPrev" style="color: #666">
                        <v-icon>mdi-skip-previous</v-icon>
                      </a>
                      <a id="btnNext" style="color: #666">
                        <v-icon>mdi-skip-next</v-icon>
                      </a>
                    </div>
                  </div>
                  <div id="plwrap">
                    <ul id="plList"></ul>
                  </div>
                </div>
              </div>
            </div>
          </body>
        </html>
      </v-card>
    </v-col>
  </v-row>
</v-container>
</template>
<script>
export default {
  data() {
    return {};
  },
  created() {
    jQuery(function($) {
      "use strict";
      var supportsAudio = !!document.createElement("audio").canPlayType;
      if (supportsAudio) {
        // initialize plyr
        var player = new Plyr("#audio1", {
          controls: ["play", "progress", "current-time", "duration"]
        });
        // initialize playlist and controls
        var index = 0,
          playing = false,
          mediaPath = "/music/",
          extension = ".mp3",
          tracks = [
            {
              track: 1,
              name: "양방언 - 우리",
              duration: "5:10",
              file: "we"
            },
            {
              track: 2,
              name: "Brain Crain - A Walk in the Forest",
              duration: "4:22",
              file: "awalk"
            },
            {
              track: 3,
              name: "양방언 - Emma",
              duration: "2:39",
              file: "emma"
            }
          ],
          buildPlaylist = $.each(tracks, function(key, value) {
            var trackNumber = value.track,
              trackName = value.name,
              trackDuration = value.duration;
            if (trackNumber.toString().length === 1) {
              trackNumber = "0" + trackNumber;
            }

            $("#plList").append(
              '<li> \
                    <div class="plItem"> \
                        <span class="plNum">' +
                trackNumber +
                '.</span> \
                        <span class="plTitle">' +
                trackName +
                '</span> \
                        <span class="plLength">' +
                trackDuration +
                "</span> \
                    </div> \
                </li>"
            );
          }),
          trackCount = tracks.length,
          npAction = $("#npAction"),
          npTitle = $("#npTitle"),
          audio = $("#audio1")
            .on("play", function() {
              playing = true;
              npAction.text("Now Playing...");
            })
            .on("pause", function() {
              playing = false;
              npAction.text("Paused...");
            })
            .on("ended", function() {
              npAction.text("Paused...");
              if (index + 1 < trackCount) {
                index++;
                loadTrack(index);
                audio.play();
              } else {
                audio.pause();
                index = 0;
                loadTrack(index);
              }
            })
            .get(0),
          btnPrev = $("#btnPrev").on("click", function() {
            if (index - 1 > -1) {
              index--;
              loadTrack(index);
              if (playing) {
                audio.play();
              }
            } else {
              audio.pause();
              index = 0;
              loadTrack(index);
            }
          }),
          btnNext = $("#btnNext").on("click", function() {
            if (index + 1 < trackCount) {
              index++;
              loadTrack(index);
              if (playing) {
                audio.play();
              }
            } else {
              audio.pause();
              index = 0;
              loadTrack(index);
            }
          }),
          li = $("#plList li").on("click", function() {
            var id = parseInt($(this).index());
            if (id !== index) {
              playTrack(id);
            }
          }),
          loadTrack = function(id) {
            $(".plSel").removeClass("plSel");
            $("#plList li:eq(" + id + ")").addClass("plSel");
            npTitle.text(tracks[id].name);
            index = id;
            audio.src = mediaPath + tracks[id].file + extension;
            updateDownload(id, audio.src);
          },
          updateDownload = function(id, source) {
            player.on("loadedmetadata", function() {
              $('a[data-plyr="download"]').attr("href", source);
            });
          },
          playTrack = function(id) {
            loadTrack(id);
            audio.play();
          };
        extension = audio.canPlayType("audio/mpeg")
          ? ".mp3"
          : audio.canPlayType("audio/ogg")
          ? ".ogg"
          : "";
        loadTrack(index);
      } else {
        // no audio support
        $(".column").addClass("hidden");
        var noSupport = $("#audio1").text();
        $(".container").append('<p class="no-support">' + noSupport + "</p>");
      }
    });
  }
};
</script>

<style >
/* Font Family
================================================== */
@import url("https://cdn.plyr.io/3.5.6/plyr.css");
@import url("https://fonts.googleapis.com/css?family=Oxygen:300,400,700");

/* Global Styles
================================================== */

html,
body {
  -webkit-font-smoothing: antialiased;
  -webkit-text-size-adjust: 100%;
  /*background-color: #6200ea;*/
  overflow: auto;
  /* color: #fff;*/
  font-size: 1rem;
  font-family: "Oxygen", HelveticaNeue, "Helvetica Neue", Helvetica, Arial,
    sans-serif;
  font-weight: 400;
  letter-spacing: 0.025rem;
  line-height: 1.618;
  padding: 1rem 0;
}

*,
::before,
::after {
  box-sizing: border-box;
}

* {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-tap-highlight-color: transparent;
}

/* Setup
================================================== */

.container {
  position: relative;
  margin: 0 auto;
  max-width: 800px;
  width: 100%;
}
.column {
  width: inherit;
}

/* Typography / Links
================================================== */

p {
  color: #fff;
  display: block;
  font-size: 0.9rem;
  font-weight: 400;
  margin: 0 0 2px;
}

a,
a:visited {
  color: #8cc3e6;
  outline: 0;
  text-decoration: underline;
}
a:hover,
a:focus {
  color: #bbdef5;
}
p a,
p a:visited {
  line-height: inherit;
}

/* Misc.
================================================== */

.add-bottom {
  margin-bottom: 2rem !important;
}
.left {
  float: left;
}
.right {
  float: right;
}
.center {
  text-align: center;
}
.hidden {
  display: none;
}

.no-support {
  margin: 2rem auto;
  text-align: center;
  width: 90%;
}

/* Audio Player Styles
================================================== */

audio {
  display: none;
}

#audiowrap,
#plwrap {
  margin: 0 auto;
}

#tracks {
  font-size: 0;
  position: relative;
  text-align: center;
}

#nowPlay {
  display: block;
  font-size: 0;
}

#nowPlay span {
  display: inline-block;
  font-size: 1.05rem;
  vertical-align: top;
}

#nowPlay span#npAction {
  padding: 21px;
  width: 30%;
}

#nowPlay span#npTitle {
  padding: 21px;
  text-align: right;
  width: 70%;
}

#plList li {
  cursor: pointer;
  display: block;
  margin: 0;
  padding: 21px 0;
}

#plList li:hover {
  background-color: rgba(0, 0, 0, 0.1);
}

.plItem {
  position: relative;
}

.plTitle {
  left: 50px;
  overflow: hidden;
  position: absolute;
  right: 65px;
  text-overflow: ellipsis;
  top: 0;
  white-space: nowrap;
}

.plNum {
  padding-left: 21px;
  width: 25px;
}

.plLength {
  padding-left: 21px;
  position: absolute;
  right: 21px;
  top: 0;
}

.plSel,
.plSel:hover {
  background-color: rgba(0, 0, 0, 0.1);
  color: #000;
  cursor: default !important;
}

#tracks a {
  border-radius: 3px;
  color: #000;
  cursor: pointer;
  display: inline-block;
  font-size: 2.3rem;
  height: 35px;
  line-height: 0.175;
  margin: 0 5px 30px;
  padding: 10px 15px;
  text-decoration: none;
}

#tracks a:last-child {
  margin-left: 0;
}

#tracks a:hover,
#tracks a:active {
  background-color: rgba(0, 0, 0, 0.1);
  color: #fff;
}

#tracks a::-moz-focus-inner {
  border: 0;
  padding: 0;
}

/* Plyr Overrides
================================================== */

.plyr--audio .plyr__controls {
  background-color: transparent !important;
  border: none;
  color: #666 !important;
  padding: 20px 20px 20px 13px;
  width: 100%;
}

a.plyr__controls__item.plyr__control:hover,
.plyr--audio .plyr__controls button:hover,
.plyr--audio .plyr__controls button.tab-focus:focus,
.plyr__play-large {
  background-color: rgba(0, 0, 0, 0.1);
}

.plyr__progress--played,
.plyr__volume--display {
  color: rgba(0, 0, 0, 0.1);
}

.plyr--audio .plyr__progress--buffer,
.plyr--audio .plyr__volume--display {
  background: rgba(0, 0, 0, 0.1);
}

.plyr--audio .plyr__progress--buffer {
  color: rgba(0, 0, 0, 0.1);
}

/* Media Queries
================================================== */

@media only screen and (max-width: 600px) {
  #nowPlay span#npAction {
    display: none;
  }
  #nowPlay span#npTitle {
    display: block;
    text-align: center;
    width: 100%;
  }
}
</style>