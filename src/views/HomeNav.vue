<template>
  <div class="homeNav">
    <ul class="homeList">
      <li><router-link to="/">推荐音乐</router-link></li>
      <li><router-link to="/HotTop">热歌榜</router-link></li>
      <li><router-link to="/Search">搜索</router-link></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "HomeNav",
};
</script>

<style lang="scss">
.homeNav {
  width: 100%;
  height: 38px;
  .homeList {
    position: fixed;
    top: 0;
    left: 0;
    background: #fff;
    border-bottom: 1px solid #eeeeee;
    width: 100%;
    height: 41px;
    display: flex;
    z-index: 15;
    li {
      flex: 1;
      text-align: center;
      a {
        text-decoration: none;
        color: black;
        line-height: 38px;
        display: inline-block;
        padding: 0 10px;

        &.router-link-exact-active {
          color: #dd001b;
          border-bottom: 2px solid #dd001b;
        }
      }
    }
  }
}
</style>
