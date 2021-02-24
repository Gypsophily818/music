<template>
  <div class="playmusic">
    <audio
      :src="
        'https://music.163.com/song/media/outer/url?id=' +
          currentSong.id +
          '.mp3'
      "
      autoplay
      style="height:40px"
      ref="audio"
    ></audio>
    <!-- name="playBar" -->
    <transition
      name="playBar"
      enter-active-class="animate__animated animate__slideInUp animate__faster	"
      leave-active-class="animate__animated animate__slideOutDown animate__faster	"
      :duration="800"
      appear
    >
      <!-- 音乐播放条 进入 -->
      <div class="play-bar" @click.stop="ShowPlayingPage" v-show="true">
        <template>
          <!-- 音乐图 -->
          <img
            v-if="currentSong.al === undefined"
            :src="currentSong.picUrl"
            class="songImg"
            :class="{ paused: isPaused }"
          />
          <img
            v-if="currentSong.al !== undefined"
            :src="currentSong.al.picUrl"
            class="songImg"
            :class="{ paused: isPaused }"
          />
        </template>

        <!-- 歌曲名 -->
        <!-- 传入最新音乐的song时 -->
        <template>
          <p class="playing-song" v-if="currentSong.ar === undefined">
            <span
              class="author"
              v-for="(author, index) in currentSong.song.artists"
              :key="index"
            >
              <span class="lastAuthor" v-if="index"> / </span>
              {{ author.name }}
            </span>
            <span class="author-song-name"> - {{ currentSong.name }}</span>
          </p>
        </template>

        <!-- 传入热歌榜的song时 -->
        <template>
          <p class="playing-song" v-if="currentSong.al !== undefined">
            <span
              class="author"
              v-for="(author, index) in currentSong.ar"
              :key="index"
            >
              <span class="lastAuthor" v-if="index"> / </span>
              {{ author.name }}
            </span>
            <span class="author-song-name"> - {{ currentSong.name }}</span>
          </p>
        </template>

        <!-- 播放/暂停 -->
        <div
          class="pause-play"
          @click.stop="togglePlayState"
          v-if="currentSong"
        >
          <canvas ref="circle" width="40" height="40"></canvas>
          <img src="../assets/play.png" v-if="isPaused" />
          <img style="width:40px" src="../assets/playing.png" v-else />
        </div>
        <!-- 播放列表详情 -->
        <div class="playlisticon">
          <img src="../assets/playlist-icon.png" @click.stop="enterPlayList" />
        </div>
      </div>
    </transition>
    <!-- :newSongList="newSongList" -->
    <!-- @update:newSongList="DelFromSongList" -->
    <!-- @update:currentSong="updateCurrentSong" -->
    <PlayingLists
      v-if="isEnterPlayList"
      :currentSong="currentSong"
      :songQuility="$attrs.songQuility"
      @update:currentSong="pre_nextSong"
      @update:playingList="DelFromSongList"
      :playingList="playingList"
    ></PlayingLists>

    <!-- 音乐播放条点击进入后 的 播放页面 -->
    <transition
      enter-active-class="animate__animated animate__slideInUp animate__faster	"
      leave-active-class="animate__animated animate__slideOutDown animate__faster	"
      :duration="800"
    >
      <div class="playingPage" v-if="isShowPlayingPage">
        <div
          class="mask"
          :style="{ backgroundImage: `url('${currentSong.picUrl}')` }"
        ></div>

        <PlayingHeader
          @hidePlayingPage="hiddenPlayPage"
          :currentSong="currentSong"
        ></PlayingHeader>
        <keep-alive>
          <template>
            <PlayingSectionLyric
              v-if="isShowLyric"
              @toggle-show-lyric="isShowLyric = !isShowLyric"
              :currentSong="currentSong"
              :currentTime="currentTime"
              :duration="duration"
              :currentSonglyric="currentSonglyric"
            />
            <PlayingSectionPic
              :currentSong="currentSong"
              :isPaused="isPaused"
              v-else
              @toggle-show-lyric="isShowLyric = !isShowLyric"
            />
          </template>
        </keep-alive>

        <!-- :newSongList="$attrs.newSongList" -->
        <Playingfooter
          :currentTime="currentTime"
          @update:currentTime="$refs.audio.currentTime = $event"
          :duration="duration"
          :currentSong="currentSong"
          :isPaused="isPaused"
          :playingList="playingList"
          @update:isPaused="$emit('update:playlist', togglePlayState())"
          :currentSongIndex="currentSongIndex"
          @update:currentSong="pre_nextSong"
        ></Playingfooter>
        <!-- @update:currentSong="$emit('update:currentSong', $event)" -->
      </div>
    </transition>
  </div>
</template>

<script>
import PlayingHeader from "@/components/PlayingHeader.vue";
import PlayingSectionLyric from "@/components/PlayingSectionLyric.vue";
import PlayingSectionPic from "@/components/PlayingSectionPic.vue";
import Playingfooter from "@/components/Playingfooter.vue";
import PlayingLists from "@/components/PlayingLists.vue";
export default {
  name: "Play",
  props: ["currentSong", "currentSongIndex", "newSongList"],

  components: {
    PlayingHeader,
    PlayingSectionLyric,
    PlayingSectionPic,
    Playingfooter,
    PlayingLists,
  },
  data() {
    return {
      isPaused: false,
      duration: 0,
      currentTime: 0,
      isShowPlayingPage: false,
      isShowLyric: false,
      isEnterPlayList: false,
      currentSonglyric: null,
      playingList: [],
    };
  },
  created() {
    this.playingList = this.newSongList;

    console.log(this.currentSong);
    let _this = this;
    this.axios
      .get("/lyric?id=" + _this.currentSong.id + "")
      .then((result) => {
        console.log(result.data.lrc);
        _this.currentSonglyric = result.data.lrc;
      })
      .catch((err) => {
        if (err) return false;
      });

    // console.log(this.currentSonglyric);
  },
  mounted() {
    console.log("mounted", this.$refs.audio);
    let audio = this.$refs.audio;
    audio.addEventListener("pause", () => {
      console.log("暂停");
      this.isPaused = true;
    });
    audio.addEventListener("play", () => {
      console.log("播放");
      this.isPaused = false;
    });
    audio.addEventListener("durationchange", () => {
      this.duration = audio.duration;
    });
    audio.addEventListener("timeupdate", () => {
      this.currentTime = audio.currentTime;
      if (!this.isShowPlayingPage) {
        this.drawCircle(this.currentTime, this.duration);
      }
    });
  },
  methods: {
    togglePlayState() {
      let audio = this.$refs.audio;
      // console.log(this.isPaused);
      if (this.isPaused) {
        audio.play();
      } else {
        audio.pause();
      }
    },
    ShowPlayingPage() {
      this.isShowPlayingPage = !this.isShowPlayingPage;
    },
    hiddenPlayPage(e) {
      console.log(e);
      this.isShowPlayingPage = e;
    },
    changeSection() {
      this.isShowLyric = !this.isShowLyric;
      console.log(this.isShowLyric);
    },
    drawCircle: function(n, total) {
      let canvas = this.$refs.circle;
      let ctx = canvas.getContext("2d");

      ctx.clearRect(0, 0, 40, 40);
      ctx.beginPath();
      ctx.strokeStyle = "rgba(0, 0, 0, 0.3)";
      ctx.arc(20, 20, 18, 0, Math.PI * 2, false); // 绘制
      ctx.stroke();
      ctx.closePath();

      ctx.beginPath();
      ctx.strokeStyle = "rgba(255, 0, 0, 0.6)";
      ctx.arc(
        20,
        20,
        18,
        Math.PI * -0.5,
        Math.PI * ((n / total) * 2 - 0.5),
        false
      ); // 绘制
      ctx.stroke();
      ctx.closePath();
    },
    enterPlayList() {
      this.isEnterPlayList = !this.isEnterPlayList;
      // 遮罩层
      // this.$emit("update:isEnterPlayList", this.isEnterPlayList);
      console.log(this.isEnterPlayList);
    },
    updateCurrentSong(e, index) {
      this.$emit("update:currentSong", e, index);
    },
    DelFromSongList(item, index) {
      console.log(item, index);
      // console.log(this.newSongList);
      // this.newSongList.map((e) => {
      //   console.log(e)
      //     return item
      // });

      // this.newSongList.map((e) => {
      //   this.newSongList.splice(index, 1, item);
      //   console.log(e);
      // });

      this.playingList = this.playingList.filter((e) => {
        // console.log(e)
        return e !== item;
      });
      console.log(this.playingList);
      // this.$emit("update:newSongList");
    },
    pre_nextSong(e, index) {
      console.log("状态名", e, index);
      // this.currentSongIndex = index;

      // console.log(this.newSongList);
      if (e === "preSong") {
        this.currentSongIndex--;
        if (this.currentSongIndex < 0) {
          this.currentSongIndex = this.playingList.length - 1;
        }
      } else if (e === "nextSong") {
        this.currentSongIndex++;
        if (this.currentSongIndex > this.playingList.length - 1) {
          this.currentSongIndex = 0;
        }
      } else {
        //播放列表中选取歌曲
        this.currentSong = e;
        if (this.currentSong.ar === undefined) {
          this.currentSongIndex = index;
        } else {
          this.currentSongIndex = index;
        }
      }
      this.currentSong = this.playingList[this.currentSongIndex];
      // console.log(this.currentSongIndex);
    },
  },
  watch: {
    newSongList: function(n) {
      if (n) {
        this.playingList = this.newSongList;
      }
    },
    isPaused: function(n) {
      console.log("isPaused-Changed:", n);
      this.$emit("update:isPaused", n);
    },
    currentSong: function(n) {
      // 页面加载获取歌词
      // console.log("&获取歌词", n);
      this.axios
        .get("/lyric?id=" + n.id + "")
        .then((result) => {
          console.log("==>获取歌词", result);
          this.currentSonglyric = result.data.lrc;
        })
        .catch((err) => {
          if (err) return false;
        });
    },
  },
};
</script>

<style scoped lang="scss">
.play-bar {
  position: fixed;
  bottom: 0;
  z-index: 9;
  width: 100%;
  background: white;
  box-shadow: 0px 1px 10px 3px #dddddd;
  display: flex;
  height: 54px;
  line-height: 54px;
  img.songImg {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-left: 10px;
    margin-right: 10px;
    border: 8px solid black;
    border-radius: 50%;
    box-shadow: 0px 1px 10px 3px #dddddd;
    animation: playingSongImg 8s linear infinite;
  }
  .paused {
    animation-play-state: paused !important;
  }
  .playing-song {
    width: 60%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: black;
    font-size: 14px;
  }
  .pause-play {
    width: 50px;
    height: 100%;
    line-height: 54px;
    display: flex;
    align-content: center;
    justify-content: center;
    position: relative;
    top: 50%;
    left: 0;
    margin-top: -20px;
    z-index: 3;
    canvas {
      position: absolute;
      width: 41px;
      height: 41px;
    }
    img {
      margin-left: 1px;
      width: 40px;
      height: 40px;
    }
  }
  .playlisticon {
    width: 30%;
    display: flex;
    flex: 1 1 1;
    justify-content: space-evenly;

    img {
      margin-top: 10px;

      width: 34px;
      height: 34px;
    }
  }
}
.playingPage {
  background: linear-gradient(
    to right,
    rgb(56, 56, 56),
    rgb(95, 95, 95),
    rgb(56, 56, 56)
  );
  // background: url();

  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 19;
  color: white;
  .mask {
    background: url("http://p1.music.126.net/fwXShM46KdIj3hB8_lJ71g==/109951165545588869.jpg");
    background-size: cover;
    background-position: center;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    filter: blur(30px) brightness(0.5);
  }
}

@keyframes playingSongImg {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
