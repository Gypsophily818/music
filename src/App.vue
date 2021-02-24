<template>
  <div id="app">
    <HomeNav v-if="$route.meta.isShowNav" />
      <!-- @update:newSongList="newSongList = $event" -->
      <!-- @update:currentSong="pre_nextSong" -->
    <Play
      v-if="currentSong"
      :newSongList="newSongList"
      :currentSong="currentSong"
      :isPaused.sync="isPaused"
      :currentSongIndex="currentSongIndex"
      @update:newSongList="newSongList = $event"
      :songQuility="songQuility"
    />
    <!-- @update:currentSong="getCurrentClickMusic" -->
    <!-- @update:isPaused="getIsPaused" -->
    <keep-alive>
      <router-view
        @update:currentSong="getCurrentClickMusic"
        :currentSong="currentSong"
        @update:newSongList="newSongList = $event"
        :isPaused="isPaused"
        :currentSongIndex="currentSongIndex"
        @upload-songQuility="getsongQuility"
      ></router-view>
    </keep-alive>
    <!-- </div> -->
  </div>
</template>

<script>
import HomeNav from "./views/HomeNav.vue";
import Play from "@/components/Play.vue";
export default {
  data() {
    return {
      currentSong: null,
      currentSongIndex: null,
      isPaused: null,
      newSongList: [],
      songQuility: [],
      isfixed: null,
    };
  },
  components: {
    HomeNav,
    Play,
  },
  methods: {
    getCurrentClickMusic(e, id) {
      console.log("getttt", e, id);
      this.currentSong = e;
      if (this.currentSong.ar === undefined) {
        this.currentSongIndex = id;
      } else {
        this.currentSongIndex = id;
      }
    },
    getIsPaused(e) {
      this.isPaused = e;
    },
    pre_nextSong(e, index) {
      console.log("状态名", e, index);
      // this.currentSongIndex = index;

      // console.log(this.newSongList);
      if (e === "preSong") {
        this.currentSongIndex--;
        if (this.currentSongIndex < 0) {
          this.currentSongIndex = this.newSongList.length - 1;
        }
      } else if (e === "nextSong") {
        this.currentSongIndex++;
        if (this.currentSongIndex > this.newSongList.length - 1) {
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
      this.currentSong = this.newSongList[this.currentSongIndex];
      // console.log(this.currentSongIndex);
    },
    getsongQuility(e) {
      // console.log("SongQuility", e);
      this.songQuility = e;
    },
  },
};
</script>
<style>
html,
body {
  width: 100%;
  overflow-x: auto;
}
#app {
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
}
.fixed {
  position: fixed;
  /* top: 0; */
  /* height: 100%; */
  width: 100vw;
  /* overflow: hidden; */
}
</style>
