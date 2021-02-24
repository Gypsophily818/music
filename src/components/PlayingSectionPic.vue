<template>
  <div @click="$emit('toggle-show-lyric')" class="sectionPic">
    <div class="showPic">
      <div class="imgContainer">
        <img
          class="needleImgState"
          src="../assets/needle-ab.png"
          :class="{ 'needleImgState-play': !isPaused }"
        />
        <i class="outer">
          <template>
            <!-- 音乐图 -->
            <img
              v-if="currentSong.al === undefined"
              :src="currentSong.picUrl"
              class="pic"
              :class="{ pause: isPaused }"
            />
            <img
              v-if="currentSong.al !== undefined"
              :src="currentSong.al.picUrl"
              class="pic"
              pause
              :class="{ pause: isPaused }"
            />
          </template>
        </i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PlayingSectionPic",
  props: ["currentSong", "isPaused"],
  methods: {},
};
</script>

<style lang="scss" scoped>
.sectionPic {
  width: 100%;
  height: 70%;
  min-width: 310px;
  .showPic {
    width: 100%;
    height: 100%;
    margin: 0px auto;
    // padding-top: 50px;

    .imgContainer {
      width: 100%;
      .needleImgState {
        width: 100px;
        position: relative;
        // top: 50%;
        top: 0px;
        left: 50%;
        // margin-top: -310px;
        margin-left: -10px;
        z-index: 3;
        transform: rotateZ(-15deg);
        transition: all 1s;
        transform-origin: 11px 10px;
      }
      .needleImgState-play {
        transform: rotateZ(0deg);
      }
      .outer {
        margin: -70px auto;
        $widths_heights: 300px;
        width: $widths_heights;
        height: $widths_heights;
        min-width: $widths_heights;
        display: block;

        background: url(../assets/disc.png) no-repeat;
        background-size: cover;
        background-position: center;
        position: relative;
        .pic {
          $picW_H: 182px;
          width: $picW_H;
          height: $picW_H;
          min-width: $picW_H;
          border-radius: 50%;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translateX(-50%) translateY(-50%);
          animation: revolve 8s linear infinite;
        }
        .pause {
          animation-play-state: paused;
        }
      }
    }
  }
}
@keyframes revolve {
  from {
    transform: translateX(-50%) translateY(-50%) rotate(0deg);
  }
  to {
    transform: translateX(-50%) translateY(-50%) rotate(360deg);
  }
}
</style>
