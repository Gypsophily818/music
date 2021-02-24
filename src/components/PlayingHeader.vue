<template>
  <div class="playingheader">
    <div class="w">
      <img
        class="icon-down"
        src="../assets/dropdown.png"
        @click="$emit('hidePlayingPage', false)"
      />
      <!-- 传入最新音乐时 -->
      <div class="songName" v-if="currentSong.ar === undefined">
        <span
          class="author"
          v-for="(author, index) in currentSong.song.artists"
          :key="index"
        >
          <span class="lastAuthor" v-if="index"> / </span>
          {{ author.name }}
        </span>
        <span class="author-song-name"> - {{ currentSong.name }}</span>
      </div>
      <!-- 传入热榜音乐时 -->
      <div class="songName" v-if="currentSong.ar !== undefined">
        <span
          class="author"
          v-for="(author, index) in currentSong.ar"
          :key="index"
        >
          <span class="lastAuthor" v-if="index"> / </span>
          {{ author.name }}
        </span>
        <span class="author-song-name"> - {{ currentSong.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PlayingHeader",
  props: ["currentSong"],
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.playingheader {
  width: 100%;
  // height: 70px;
  height: 45px;
  .w {
    margin: 20px;
    display: flex;
    justify-content: space-around;
    .icon-down {
      width: 30px;
      height: 30px;
    }
    .songName {
      display: inline-block;
      margin: 0 auto;
      width: 70%; /*必须是固定宽度值*/
      overflow: hidden; /*超出部分隐藏*/
      white-space: nowrap; /*规定段落中的文本不进行换行 */
      text-overflow: ellipsis; /*超出部分显示省略号*/
      text-align: center;
    }
  }
}
</style>
