<template>
  <div class="home">
    <RecommendList :currentRecommends="currentRecommends"
      >推荐歌单</RecommendList
    >

    <!-- @update:currentSong="$emit('update:currentSong', $event)" -->
    <RecommendNewMusic
      @update:newSongList="upLoadNowSongList"
      @update:currentSong="upLoadCurrentSong"
      :currentSongIndex="$attrs.currentSongIndex"
      :newSongs="newSongs"
      :currentSong="$attrs.currentSong"
      :isPaused="$attrs.isPaused"
      >最新音乐</RecommendNewMusic
    >
  </div>
</template>

<script>
// @ is an alias to /src
import RecommendList from "@/components/RecommendList.vue";
import RecommendNewMusic from "@/components/RecommendNewMusic.vue";
export default {
  name: "Recommend",
  data() {
    return {
      recommends: [],
      recommendsIndex: 0,
      newSongs: [],
      sonItems: [],
    };
  },
  components: {
    RecommendList,
    RecommendNewMusic,
  },
  computed: {
    currentRecommends() {
      return this.recommends.slice(
        this.recommendsIndex * 6,
        (this.recommendsIndex + 1) * 6
      );
    },
  },
  created() {
    this.axios.get("/personalized").then((response) => {
      this.recommends = response.data.result;
    });

    this.axios.get("/personalized/newsong").then((response) => {
      // console.log("newSong::::",response);
      this.newSongs = response.data.result;
    });
  },
  activated() {
    this.recommendsIndex =
      this.recommendsIndex >= this.recommends.length / 6 - 1
        ? 0
        : this.recommendsIndex + 1;
  },
  methods: {
    upLoadCurrentSong(music, index) {
      this.$emit("update:currentSong", music, index);
    },
    upLoadNowSongList(e) {
      console.log(e);
      this.$emit("update:newSongList", e);
    },
  },
};
</script>
