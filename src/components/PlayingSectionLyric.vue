<template>
  <div class="PlayingSectionLyric" @click="$emit('toggle-show-lyric')">
    <div class="box">
      <ul class="lyric" ref="lyric" v-if="currentSonglyric.lyric !== null">
        <template v-for="(lyrics, index) in paresLyric">
          <li class="lis" :key="index">
            {{ lyrics.text }}
          </li>
        </template>
      </ul>
      <div v-else>暂无歌词</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PlayingSectionLyric",
  props: ["currentSong", "duration", "currentTime", "currentSonglyric"],
  data() {
    return {};
  },
  created() {
    var patt = /\[\d{2}:\d{2}\.\d{2,3}\]/gi;
    if (this.currentSonglyric.lyric === null) {
      return;
    } else {
      var arr = this.currentSonglyric.lyric
        .split("\n")
        .filter((e) => e)
        .map((str) => {
          var time = str.match(patt)[0].replace(/(\[|\])/gi, "");
          var timeArr = time.split(":");
          time = Number(timeArr[0]) * 60 + Number(timeArr[1]);
          var text = str.replace(patt, "");
          return { time, text };
        });
      console.log(this.currentSonglyric.lyric);
      return arr;
    }
  },
  watch: {
    currentTime: function() {
      if (this.currentSonglyric.lyric === null) {
        return;
      }
      var i = this.paresLyric.findIndex((element) => {
        return element.time > this.currentTime;
      });
      console.log(i);
      this.$refs.lyric.style.marginTop = -20 * (i - 1) + 35 + "px";

      for (let j = 0; j < this.paresLyric.length; j++) {
        this.$refs.lyric.querySelectorAll("li")[j].style.color = "white";
      }
      this.$refs.lyric.querySelectorAll("li")[i - 1].style.color = "#29b8e5";
    },
  },
  computed: {
    paresLyric: function() {
      // var paresedLyric = paresLyric(this.currentSonglyric);
      var patt = /\[\d{2}:\d{2}\.\d{2,3}\]/gi;
      // console.log(lyric.split("\n"));
      if (this.currentSonglyric.lyric === null) {
        return;
      } else {
        var arr = this.currentSonglyric.lyric
          .split("\n")
          .filter((e) => e)
          .map((str) => {
            var time = str.match(patt)[0].replace(/(\[|\])/gi, "");
            var timeArr = time.split(":");
            time = Number(timeArr[0]) * 60 + Number(timeArr[1]);
            var text = str.replace(patt, "");
            return { time, text };
          });
        console.log(this.currentSonglyric.lyric);
        return arr;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.PlayingSectionLyric {
  width: 100%;
  height: 70%;

  .box {
    height: 100%;
    // background: green;
    text-align: center;
    overflow: hidden;
  }
  .lyric {
    line-height: 30px;
    margin-top: 300px;
    transform: translateY(200px);
    transition: all 1s;
  }
}
</style>
