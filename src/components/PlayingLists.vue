<template>
  <div class="playingLists">
    <div class="lists">
      <p class="currentList">当前播放列表</p>
      <ul>
        <!-- @update:currentSong="getTranslateSong"
          @update:newSongList="$emit('update:newSongList', newSongs)"
          -->
        <!-- v-for="(SongList, index) in newSongList" -->
        <PlayingItem
          v-for="(SongList, index) in playingList"
          :item="SongList"
          :index="index"
          :key="SongList.id"
          :SongList="SongList"
          :currentSong="$attrs.currentSong"
          :songQuility="$attrs.songQuility[index]"
          @update:currentSong="updateCurrentSong"
          @update:playingList="delSongListItem"
        ></PlayingItem>
        <!-- @update:newSongList="delSongListItem" -->
      </ul>
    </div>
  </div>
</template>

<script>
import PlayingItem from "@/components/PlayingItem.vue";
export default {
  props: ["playingList"],
  data() {
    return {
      isfixed: true,
    };
  },
  components: {
    PlayingItem,
  },
  methods: {
    updateCurrentSong(e, index) {
      console.log("当前音乐:", e, index);
      if (e === "nextSong") {
        this.$emit("update:currentSong", "nextSong");
        return;
      }
      // 更新当前播放歌曲
      this.$emit("update:currentSong", e, index);
    },
    delSongListItem(e, i) {
      console.log(e, i);
      this.$emit("update:playingList", e, i);
    },
  },
};
</script>

<style lang="scss" scoped>
.playingLists {
  .lists {
    overflow: auto;
    overflow-x: hidden;
    width: 86%;
    height: 50%;
    border-radius: 10px;
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    bottom: 60px;
    background: white;
    z-index: 3;
    box-shadow: 0px 1px 5px 1px #ccc;
    .currentList {
      text-align: center;
      font-size: 18px;
      padding: 5px;
    }
  }
}

/*遮罩层*/
.overlayer {
  position: fixed;
  background: black;
  opacity: 0.7;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
}
</style>
