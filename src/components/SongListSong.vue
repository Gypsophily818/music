<template>
  <li class="songitem" @click="clickTotranslateSong()">
    <div class="item">
      <span class="topIndex"
        ><span v-if="index < 9">0</span>{{ index + 1 }}</span
      >
      <div class="song-info">
        <p class="musicName">{{ item.name }}</p>
        <p class="itemdetail">
          <!-- 作者名 -->
          <span class="author" v-for="(author, index) in item.ar" :key="index">
            <span class="lastAuthor" v-if="index"> / </span>
            {{ author.name }}
          </span>
          <span class="author-song-name">－ {{ item.name }}</span>
        </p>
      </div>

      <div class="icon-bar">
        <span
          v-if="currentSong && currentSong.id === item.id"
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
  </li>
</template>

<script>
export default {
  props: ["index", "toplist", "item", "currentSong", "isPaused"],
  created() {
    console.log();
  },
  methods: {
    clickTotranslateSong() {
      console.log("currentSong change to", this.item, this.index);

      this.$emit("update:currentSong", this.item, this.index);
      this.$emit("update:newSongList");
    },
  },
};
</script>

<style lang="scss" scoped>
.songitem {
  .item {
    padding-left: 20px;
    margin: 12px;
    margin-right: 2px;
    .topIndex {
      color: #999;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: 4px;
    }
    .song-info {
      width: 60%; /*必须是固定宽度值*/
      overflow: hidden; /*超出部分隐藏*/
      text-overflow: ellipsis; /*超出部分显示省略号*/
      white-space: nowrap; /*规定段落中的文本不进行换行 */
      font-size: 15px;
      .musicName {
      }
      .itemdetail {
      }
    }
    &:after {
      left: 28px;
      width: 88%;
    }
  }
}
</style>
