<template>
  <li class="songitem" @click="clickTotranslateSong()">
    <div class="item" v-if="itemMusic">
      <div class="song-info">
        <p class="musicName">{{ itemMusic.name }}</p>
        <p class="itemdetail">
          <span class="icon-SQ"></span>
          <span
            class="author"
            v-for="(author, index) in itemMusic.song.artists"
            :key="index"
          >
            <span class="lastAuthor" v-if="index"> / </span>
            {{ author.name }}
          </span>
          <span class="author-song-name">－ {{ itemMusic.name }}</span>
        </p>
      </div>

      <div class="icon-bar">
        <span
          v-if="currentSong && currentSong.id === itemMusic.id"
          class="playing"
          :class="{ paused: isPaused }"
        >
          <i></i>
          <i></i>
          <i></i>
          <i></i>
        </span>
        <span class="icon-play" v-else></span>
      </div>
    </div>
    <loading v-else />
  </li>
</template>

<script>
export default {
  name: "SongItem",
  props: {
    itemMusic: Object,
    isPaused: Boolean,
    currentSong: Object,
    currentSongIndex: Number,
  },
  methods: {
    clickTotranslateSong() {
      console.log(
        "currentSong change to",
        this.itemMusic,
        this.currentSongIndex
      );
      this.$emit("update:currentSong", this.itemMusic, this.currentSongIndex);
      // this.$emit("update:currentSong", this.itemMusic);
      this.$emit("update:newSongList");
    },
  },
};
</script>

<style lang="scss">
.songitem {
  background: #fff;
  position: relative;

  [class^="author"] {
    font-size: 13px;
    color: #aaa;
  }
  .item {
    padding: 5px;
    display: flex;
    overflow: hidden;
    // margin: 12px;
    .song-info {
      flex: 1;
      overflow: hidden;
      .musicName {
        width: 76%; /*必须是固定宽度值*/
        overflow: hidden; /*超出部分隐藏*/
        text-overflow: ellipsis; /*超出部分显示省略号*/
        white-space: nowrap; /*规定段落中的文本不进行换行 */
        font-size: 15px;
      }
      .itemdetail {
        // width: 76%; /*必须是固定宽度值*/
        width: 100%; /*必须是固定宽度值*/
        overflow: hidden; /*超出部分隐藏*/
        text-overflow: ellipsis; /*超出部分显示省略号*/
        white-space: nowrap; /*规定段落中的文本不进行换行 */
        .icon-SQ {
          display: inline-block;
          width: 22px;
          height: 12px;
          margin-top: 4px;
          vertical-align: middle;
          background-position: -24px 0;
          background: url(../assets/index_icon_2x.png) no-repeat;
          background-size: 166px 97px;
        }
      }
    }

    .icon-bar {
      width: 24px;
      height: 24px;
      margin-right: 5px;
      .icon-play {
        width: 24px;
        height: 24px;
        display: inline-block;
        background: url(../assets/index_icon_2x.png) no-repeat;
        background-size: 166px 97px;
        background-position: -24px 0;
        position: absolute;
        right: 5px;
        top: 50%;
        transform: translateY(-50%);
        &.paused {
          border-radius: 50%;
          background-color: rgba(230, 109, 109, 0.966);
        }
      }
      .playing {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        i {
          width: 4px;
          height: 34px;
          background: red;
          transform-origin: center bottom;

          animation: playing 0.6s linear -0.2s infinite alternate-reverse;

          &:first-of-type {
            animation-delay: 0s;
          }
          &:nth-of-type(2) {
            animation-delay: -0.1s;
          }
          &:nth-of-type(3) {
            animation-delay: -0.3s;
          }
          &:last-of-type {
            animation-delay: -0.5s;
          }
        }
        &.paused {
          i {
            animation-play-state: paused;
          }
        }
      }
    }
    &:after {
      position: absolute;
      z-index: 2;
      content: "";
      top: 0;
      left: 10px;
      pointer-events: none;
      box-sizing: border-box;
      width: 90%;
      height: 100%;
      -webkit-transform-origin: top left;
      -ms-transform-origin: top left;
      transform-origin: top left;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }
  }
}
@keyframes playing {
  from {
    // height: 50px;
    transform: scaleY(1);
  }
  to {
    // height: 10px;
    transform: scaleY(0.2);
  }
}
</style>
