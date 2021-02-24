<template>
  <div class="hotTopPage">
    <div class="topBg">
      <div class="bg">
        <i class="hotTopImg"></i>
        <span class="text">更新日期:{{ updated }}</span>
      </div>
    </div>
    <Loading v-show="isGetAllData"></Loading>
    <keep-alive>
      <ul class="songs">
        <TopListSong
          v-for="(item, index) in toplist"
          :key="item.id"
          :index="index"
          :item="item"
          :toplist="toplist"
          :isPaused="$attrs.isPaused"
          :currentSong="$attrs.currentSong"
          :songQuility="songQuility[index].maxbr"
          class="songItem"
          @update:currentSong="updateCurrentSong"
          @update:newSongList="hotSongUpLoadNowSong"
        >
          <!-- @update:songQuility="updateSongQuility" -->
          <!-- :songQuility="songQuility[index].maxbr" -->
        </TopListSong>
      </ul>
    </keep-alive>
  </div>
</template>
<script>
import TopListSong from "@/components/TopListSong.vue";
import Loading from "@/components/Loading.vue";

export default {
  data() {
    return {
      toplist: [],
      songQuility: [],
      updateTime: null,
      isGetAllData: true,
    };
  },
  components: {
    TopListSong,
    Loading,
  },
  created() {
    console.log("created-hottop");

    // let songStr;http://musicapi.leanapp.cn/playlist/detail?id=3778678
    this.axios.get("/playlist/detail?id=3778678").then((response) => {
      // console.log(response.data.playlist.updateTime);
      this.updateTime = response.data.playlist.updateTime;
      let songStr = response.data.playlist.trackIds
        .map((e) => {
          return e.id;
        })
        .toString();
      // console.log(songStr);
      // http://musicapi.leanapp.cn/playlist/detail?id=3778678
      this.axios.get("/song/detail?ids=" + songStr + "").then((response) => {
        //   // console.log(response.data.songs);
        // console.log(response);
        this.songQuility = response.data.privileges;
        this.toplist = response.data.songs;
        this.toplist = this.toplist.slice(0, 20);
        console.log("toplist", this.toplist);
        this.$emit("upload-songQuility", this.songQuility);
        // console.log("this.toplist", this.toplist);
        this.isGetAllData = false;
      });
    });

  },
  computed: {
    updated() {
      var date = new Date(this.updateTime);
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "月";
      var D =
        date.getDate() < 10 ? "0" + date.getDate() : date.getDate() + "日 ";
      return M + D;
    },
  },
  methods: {
    hotSongUpLoadNowSong() {
      // 更新新的播放列表
      this.$emit("update:newSongList", this.toplist);
    },
    updateCurrentSong(e, index) {
      console.log("当前音乐:", e);
      // 更新当前播放歌曲
      this.$emit("update:currentSong", e, index);
    },
    /* updateSongQuility() {
      console.log("传音质:");
      this.$emit("upload-songQuility", this.songQuility);
    }, */
  },
};
</script>
<style lang="scss" scoped>
.hotTopPage {
  margin-top: 3px;
  width: 100%;
  height: 100%;
  .topBg {
    position: relative;
    padding-top: 38%;
    overflow: hidden;
    background: url("../assets/hot_music_bg_2x.jpg") no-repeat;
    background-size: 100% 100%;
    .bg {
      margin-left: 15px;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      z-index: 1;
      .hotTopImg {
        display: inline-block;
        background: url(../assets/music.png) no-repeat -24px -30px;
        background-size: 166px 97px;
        width: 142px;
        height: 67px;
      }
      span.text {
        color: white;
        margin-top: 6px;
        font-size: 12px;
      }
    }
  }
}
</style>
