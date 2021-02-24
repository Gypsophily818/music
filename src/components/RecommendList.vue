<template>
  <div class="recommendList">
    <RecommendTitle><slot></slot></RecommendTitle>
    <!-- <Loading v-show="!currentRecommends"></Loading> -->
    <div class="box" v-show="!currentRecommends">
      <div class="wraper">
        <span class="playing">
          <i></i>
          <i></i>
          <i></i>
        </span>
      </div>
    </div>
    <ul class="musicList" >
      <RecommendPlaylist
        v-for="(item, index) in currentRecommends"
        :key="item.id"
        :item="item"
        :index="index"
        :id="item.id"
      ></RecommendPlaylist>
    </ul>
  </div>
</template>

<script>
import RecommendTitle from "@/components/RecommendTitle.vue";
import RecommendPlaylist from "./RecommendPlaylist.vue";
// import Loading from "@/components/Loading.vue";

export default {
  name: "RecommenList",
  components: {
    RecommendTitle,
    RecommendPlaylist,
    // Loading,
  },
  props: ["currentRecommends"],
  beforeRouteEnter(to, from, next) {
    // ...
    console.log(to);
    console.log(from);
    next();
  },
};
</script>

<style lang="scss">
.recommendList {
  min-height: 310px;
  .musicList {
    display: flex;
    flex-wrap: wrap;
  }
}

.box {
  width: 100%;
  min-height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  .wraper {
    width: 30px;
    height: 30px;
    .playing {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      i {
        width: 3px;
        height: 30px;
        border-radius: 3px;
        background: red;
        margin: 0 2px;
        transform-origin: center bottom;
        animation: playing 0.6s linear -0.2s infinite alternate-reverse;
        &:first-of-type {
          animation-delay: 0s;
        }
        &:nth-of-type(2) {
          animation-delay: -0.3s;
        }
        &:last-of-type {
          animation-delay: 0s;
        }
      }
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
