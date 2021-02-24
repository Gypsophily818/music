<template>
  <li class="playingitem" @click="clickToChangeSong()">
    <div class="item">
      <!-- :class="{currentSong && currentSong.id === itemMusic.id}" -->
      <!-- v-if="currentSong && currentSong.id === itemMusic.id" -->
      <div class="item-left">
        <p
          class="musicName"
          :class="{ red: currentSong && currentSong.id === item.id }"
        >
          {{ SongList.name }}
        </p>
        <template v-if="SongList.al === undefined">
          <!-- 传入最新音乐时 -->
          <p class="itemdetail">
            <span class="icon-SQ"></span>
            <span
              class="author"
              v-for="(author, index) in SongList.song.artists"
              :key="index"
            >
              <span class="lastAuthor" v-if="index"> / </span>
              {{ author.name }}
            </span>
            <span class="author-song-name">－ {{ SongList.name }}</span>
          </p>
        </template>

        <!-- 传入热歌榜音乐时 -->
        <template v-if="SongList.al !== undefined">
          <p class="itemdetail">
            <template v-if="songQuility">
              <span class="icon-SQ" v-if="songQuility.maxbr >= 999000"></span>
            </template>
            <!-- 作者名 -->
            <span
              class="author"
              v-for="(author, index) in item.ar"
              :key="index"
            >
              <span class="lastAuthor" v-if="index"> / </span>
              {{ author.name }}
            </span>
            <span class="author-song-name">－ {{ item.name }}</span>
          </p>
        </template>
      </div>
      <span class="del_song" @click.stop="delSong(item, index)">X</span>
    </div>
  </li>
</template>

<script>
export default {
  props: [
    "SongList",
    "songQuility",
    "item",
    "index",
    "currentSong",
    // "newSongList",
  ],
  methods: {
    clickToChangeSong() {
      console.log("currentSong change to", this.item, this.index);

      this.$emit("update:currentSong", this.item, this.index);
    },
    delSong(i, index) {
      console.log("del", i, index);
      if (i.id === this.currentSong.id) {
        this.$emit("update:currentSong", "nextSong");
      }
      this.$emit("update:playingList", i, index);
    },
  },
};
</script>

<style lang="scss" scoped>
.playingitem {
  [class^="author"] {
    font-size: 13px;
    color: #aaa;
  }
  .item {
    padding: 5px;
    margin: 8px;
    display: flex;

    .item-left {
      width: 90%;
      .musicName {
        font-size: 15px;
        width: 90%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .itemdetail {
        width: 90%; /*必须是固定宽度值*/
        overflow: hidden; /*超出部分隐藏*/
        text-overflow: ellipsis; /*超出部分显示省略号*/
        white-space: nowrap; /*规定段落中的文本不进行换行 */
        color: #dd001b;
      }
    }
    .del_song {
      flex: 1;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #ccc;
    }
    &:after {
      position: absolute;
      z-index: 2;
      content: "";
      top: 0;
      left: 10px;
      pointer-events: none;
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      -webkit-transform-origin: top left;
      -ms-transform-origin: top left;
      transform-origin: top left;
      // border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }
  }
  .icon-SQ {
    display: inline-block;
    width: 22px;
    height: 12px;
    margin-top: 4px;
    vertical-align: middle;
    background-position: -24px 0;
    // background: url(//s3.music.126.net/mobile-new/img/index_icon_2x.png?5207a28…=)
    background: url(../assets/index_icon_2x.png)
    
      no-repeat;
    background-size: 166px 97px;
  }

  .icon-play {
    width: 24px;
    height: 24px;
    display: inline-block;
    // background: url(//s3.music.126.net/mobile-new/img/index_icon_2x.png?5207a28…=)
    background: url(../assets/index_icon_2x.png)

      no-repeat;
    background-size: 166px 97px;
    background-position: -24px 0;
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    &.paused {
      border-radius: 50%;
      background-color: rgba(230, 109, 109, 0.966);
    }
  }
  .red {
    color: red;
  }
}
</style>
