<template>
  <div class="playtingfooter">
    <div class="playingTime">
      <!-- 播放时长 -->
      <span>{{ formatAll }}</span>
      <span>{{ formatNow }}</span>
    </div>
    <!-- 播放条 -->
    <div class="progress">
      <input
        type="range"
        min="0"
        :max="duration"
        step="1"
        @input="getValue"
        :value="currentTime"
      />
      <span :style="{ width: (currentTime / duration) * 100 + '%' }"></span>
    </div>

    <div class="playMenu">
      <div class="pre" @click="preSong">
        <img src="../assets/48previous.png" alt="" />
      </div>
      <div class="pause-play" @click.stop="togglePlayState">
        <img style="width:40px" src="../assets/46play.png" v-if="isPaused" />
        <img style="width:40px" src="../assets/47paused.png" v-else />
      </div>
      <div class="next" @click="nextSong">
        <img src="../assets/49next.png" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Playingfooter",
  props: [
    "currentTime",
    "duration",
    "isPaused",
    "playingList",
    "currentSongIndex",
  ],
  data() {
    return {
      time: "",
    };
  },
  computed: {
    formatNow: function(value) {
      value = this.duration;
      var seconds = parseInt(value); // 秒
      var mins = 0; // 分
      var hours = 0; // 小时
      if (seconds >= 60) {
        mins = parseInt(seconds / 60);
        seconds = parseInt(seconds % 60);
        if (mins >= 60) {
          hours = parseInt(mins / 60);
          mins = parseInt(mins % 60);
        }
      }
      var result = "" + parseInt(seconds);
      if (result < 10) {
        result = "0" + result;
      }
      if (mins > 0) {
        result = "" + parseInt(mins) + ":" + result;
        if (mins < 10) {
          result = "0" + result;
        }
      } else {
        result = "00:" + result;
      }
      if (hours !== 0) {
        if (hours > 0) {
          result = "" + parseInt(hours) + ":" + result;
          if (hours < 10) {
            result = "0" + result;
          }
        } else {
          result = "00:" + result;
        }
      }

      return result;
    },
    formatAll: function(value) {
      value = this.currentTime;
      var seconds = parseInt(value); // 秒
      var mins = 0; // 分
      var hours = 0; // 小时
      if (seconds >= 60) {
        mins = parseInt(seconds / 60);
        seconds = parseInt(seconds % 60);
        if (mins >= 60) {
          hours = parseInt(mins / 60);
          mins = parseInt(mins % 60);
        }
      }
      var result = "" + parseInt(seconds);
      if (result < 10) {
        result = "0" + result;
      }
      if (mins > 0) {
        result = "" + parseInt(mins) + ":" + result;
        if (mins < 10) {
          result = "0" + result;
        }
      } else {
        result = "00:" + result;
      }
      if (hours !== 0) {
        if (hours > 0) {
          result = "" + parseInt(hours) + ":" + result;
          if (hours < 10) {
            result = "0" + result;
          }
        } else {
          result = "00:" + result;
        }
      }
      return result;
    },
  },
  methods: {
    togglePlayState() {
      // this.isPaused = !this.isPaused;
      console.log(this.isPaused);
      this.$emit("update:isPaused");
    },
    getValue: function(e) {
      console.log(e.target.value);
      this.$emit("update:currentTime", e.target.value);
    },
    preSong() {
      console.log("上一首");
      this.$emit("update:currentSong", "preSong");
    },
    nextSong() {
      console.log("下一首");
      this.$emit("update:currentSong", "nextSong");
    },
  },
};
</script>

<style lang="scss" scoped>
.playtingfooter {
  width: 100vw;
  // height: 50px;
  position: fixed;
  bottom: 0;
  margin-bottom: 30px;
  padding: 0 10px;

  .playingTime {
    margin: 10px 0px 5px 0px;
    display: flex;
    justify-content: space-between;
  }

  .progress {
    width: 100%;
    height: 2px;
    border-radius: 5px;
    background: linear-gradient(to right, rgb(81, 103, 155), rgb(71, 101, 109));
    position: relative;
    top: 0;
    left: 0;
    margin: 0 auto;
    margin-bottom: 20px;
    border-radius: 3px;
    input {
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 99;
      opacity: 0;
    }
    span {
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: 0%;
      height: 100%;
      background: rgb(255, 255, 255);
      border-radius: 3px;
    }
  }
  .playMenu {
    display: flex;
    justify-content: space-between;
    padding: 0 50px;
    .pre {
      img {
        width: 36px;
      }
    }
    .next {
      img {
        width: 36px;
      }
    }
  }
}
</style>
