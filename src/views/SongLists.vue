<template>
  <div class="song-list">
    <div class="wraper">
      <Loading v-show="isGetAllData"></Loading>
      <keep-alive>
        <section class="list-top" v-if="accompleteIndex === 2">
          <div
            class="header-Bg-wraper"
            :style="'background-image:url(' + coverImgUrl + '?param=170y170)'"
          ></div>
          <div class="header-content-wraper">
            <div class="left">
              <img
                :src="coverImgUrl + '?imageView=1&type=webp&thumbnail=253x0'"
              />
              <span class="dec">歌单</span>
              <span class="play-count">
                {{ playCount | formatPlayCount }}
              </span>
            </div>
            <div class="right">
              <h2>{{ name }}</h2>
              <div class="lsthd_auth ">
                <a
                  class="lsthd_link"
                  href="//music.163.com/m/user?id=516707850"
                >
                  <div class="u-avatar">
                    <img
                      class="u-img"
                      :src="
                        authorImg +
                          '?imageView=1&amp;type=webp&amp;thumbnail=61x0'
                      "
                    />
                  </div>
                  {{ authorName }}
                </a>
              </div>
            </div>
          </div>
        </section>
      </keep-alive>

      <Loading v-show="isGetAllData"></Loading>
      <section class="song-list" v-if="accompleteIndex === 2">
        <keep-alive>
          <ul class="songs">
            <SongListSong
              v-for="(item, index) in songs"
              :key="item.id"
              :index="index"
              :item="item"
              :toplist="songs"
              class="songItem"
              :isPaused="$attrs.isPaused"
              :currentSong="$attrs.currentSong"
              @update:currentSong="updateCurrentSong"
              @update:newSongList="hotSongUpLoadNowSong"
            >
            </SongListSong>
          </ul>
        </keep-alive>
      </section>
    </div>
  </div>
</template>
<!--  -->

<script>
import Loading from "@/components/Loading.vue";
import SongListSong from "@/components/SongListSong.vue";
export default {
  components: {
    Loading,
    SongListSong,
  },
  filters: {
    formatPlayCount: function(value) {
      return (value / 10000).toFixed(1) + "万";
    },
  },
  data() {
    return {
      songs: [],
      isGetAllData: true,
      name: null,
      coverImgUrl: null,
      authorName: null,
      authorImg: null,
      playCount: null,
      accompleteIndex: 0,
    };
  },
  watch: {
    name() {
      if (name!==null) {
        this.isGetAllData = false;
      }
    },
  },
  beforeRouteEnter(to, from, next) {
    // ...
    next((e) => {
      e.axios
        .get("/playlist/detail?id=" + to.query.id)
        .then((response) => {
          console.log(response.data.playlist);
          e.songs = response.data.playlist.trackIds;
          e.name = response.data.playlist.name;
          e.coverImgUrl = response.data.playlist.coverImgUrl;
          e.authorName = response.data.playlist.creator.nickname;
          e.authorImg = response.data.playlist.creator.avatarUrl;
          e.playCount = response.data.playlist.playCount;
          e.songs = e.songs
            .map((e) => {
              return e.id;
            })
            .toString();
          e.axios
            .get("/song/detail?ids=" + e.songs + "")
            .then((response) => {
              // console.log(response.data.songs);
              e.songs = response.data.songs;
              e.songs = e.songs.slice(0, 20);
            })
            .finally(() => {
              e.accompleteIndex++;

              console.log("songs", e.songs);
              // e.isGetAllData = false;
            });
        })
        .finally(() => {
          e.accompleteIndex++;
        });
      if (e.accompleteIndex === 2) {
        e.isGetAllData = false;
        e.accompleteIndex = 0;
      }
    });
  },
  methods: {
    hotSongUpLoadNowSong() {
      // 更新新的播放列表
      this.$emit("update:newSongList", this.songs);
    },
    updateCurrentSong(e, index) {
      console.log("当前音乐:", e);
      // 更新当前播放歌曲
      this.$emit("update:currentSong", e, index);
    },
  },
};
</script>

<style lang="scss" scoped>
.song-list {
  width: 100%;
  .wraper {
    width: 100%;
    min-height: 100%;
    .list-top {
      min-height: 170px;
      width: 100vw;
      height: 30vh;
      padding: 30px 10px 30px 15px;
      overflow: hidden;
      position: relative;
      .header-Bg-wraper {
        width: 100vw;
        height: 31vh;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: 50%;
        filter: blur(20px);
        transform: scale(1.5);
        z-index: 2;
        &::after {
          content: " ";
          background-color: rgba(0, 0, 0, 0.25);
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          z-index: 1;
        }
      }
      .header-content-wraper {
        display: flex;
        position: relative;
        left: 0;
        top: 0;
        z-index: 2;
        .left {
          width: 120px;
          height: 120px;
          position: relative;
          img {
            width: 100%;
            vertical-align: middle;
          }
          span.dec {
            position: absolute;
            z-index: 3;
            top: 10px;
            left: 0;
            padding: 0 8px;
            height: 17px;
            color: #fff;
            font-size: 9px;
            text-align: center;
            line-height: 17px;
            background-color: rgba(217, 48, 48, 0.8);
            border-top-right-radius: 17px;
            border-bottom-right-radius: 17px;
          }
          span.play-count {
            font-size: 12px;
            position: absolute;
            right: 5px;
            top: 2px;
            color: #fff;

            &::before {
              content: "";
              display: inline-block;
              background: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMiAyMCI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjMDQwMDAwIiBkPSJNMjIgMTYuNzc3YzAgMS4yMzMtMS4xMjEgMi4yMzMtMi41MDYgMi4yMzMtMS4zODQgMC0yLjUwNi0xLTIuNTA2LTIuMjMzdi0yLjU1M2MwLTEuMjM0IDEuMTIyLTIuMjMzIDIuNTA2LTIuMjMzLjE3NCAwIC4zNDMuMDE3LjUwNi4wNDZ2LTEuMzdoLS4wMzNjLjAxNy0uMjIuMDMzLS40NDEuMDMzLS42NjZhOCA4IDAgMCAwLTE2IDBjMCAuMjI1LjAxNi40NDYuMDM0LjY2Nkg0djEuMzdjLjE2My0uMDI5LjMzMy0uMDQ2LjUwNS0uMDQ2IDEuMzg0IDAgMi41MDYuOTk5IDIuNTA2IDIuMjMzdjIuNTUzYzAgMS4yMzMtMS4xMjIgMi4yMzMtMi41MDYgMi4yMzNTMiAxOC4wMTEgMiAxNi43Nzd2LTIuNTUzYzAtLjI1OC4wNTktLjUwMS4xNDgtLjczQS45ODIuOTgyIDAgMCAxIDIgMTMuMDAxdi0yLjY2N2MwLS4wMjMuMDEyLS4wNDMuMDEzLS4wNjctLjAwNC0uMDg4LS4wMTMtLjE3Ni0uMDEzLS4yNjYgMC01LjUyMyA0LjQ3Ny0xMCAxMC0xMHMxMCA0LjQ3NyAxMCAxMGMwIC4wOS0uMDA5LjE3OC0uMDE0LjI2Ni4wMDIuMDI0LjAxNC4wNDQuMDE0LjA2N3YyYS45ODguOTg4IDAgMCAxLS4zNi43NTNjLjIyNC4zMzQuMzYuNzIuMzYgMS4xMzh2Mi41NTIiIG9wYWNpdHk9Ii4xNSIvPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgZmlsbD0iI2ZmZiIgZD0iTTIwIDE2Ljc3N2MwIDEuMjMzLTEuMTIxIDIuMjMzLTIuNTA2IDIuMjMzLTEuMzg0IDAtMi41MDYtMS0yLjUwNi0yLjIzM3YtMi41NTNjMC0xLjIzNCAxLjEyMi0yLjIzMyAyLjUwNi0yLjIzMy4xNzQgMCAuMzQzLjAxNy41MDYuMDQ2di0xLjM3aC0uMDMzYy4wMTctLjIyLjAzMy0uNDQxLjAzMy0uNjY2YTggOCAwIDAgMC0xNiAwYzAgLjIyNS4wMTYuNDQ2LjAzNC42NjZIMnYxLjM3Yy4xNjMtLjAyOS4zMzMtLjA0Ni41MDUtLjA0NiAxLjM4NCAwIDIuNTA2Ljk5OSAyLjUwNiAyLjIzM3YyLjU1M2MwIDEuMjMzLTEuMTIyIDIuMjMzLTIuNTA2IDIuMjMzUzAgMTguMDExIDAgMTYuNzc3di0yLjU1M2MwLS4yNTguMDU5LS41MDEuMTQ4LS43M0EuOTgyLjk4MiAwIDAgMSAwIDEzLjAwMXYtMi42NjdjMC0uMDIzLjAxMi0uMDQzLjAxMy0uMDY3LS4wMDQtLjA4OC0uMDEzLS4xNzYtLjAxMy0uMjY2IDAtNS41MjMgNC40NzctMTAgMTAtMTBzMTAgNC40NzcgMTAgMTBjMCAuMDktLjAwOS4xNzgtLjAxNC4yNjYuMDAyLjAyNC4wMTQuMDQ0LjAxNC4wNjd2MmEuOTg4Ljk4OCAwIDAgMS0uMzYuNzUzYy4yMjQuMzM0LjM2LjcyLjM2IDEuMTM4djIuNTUyIi8+PC9zdmc+");
              background-position: left center;
              background-repeat: no-repeat;
              background-size: auto 100%;
              width: 1.2em;
              height: 0.9em;
            }
          }
          &::after {
            content: " ";
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 18px;
            z-index: 2;
            background-image: -webkit-linear-gradient(
              left,
              rgba(0, 0, 0, 0),
              rgba(0, 0, 0, 0.2)
            );
            background-image: linear-gradient(
              90deg,
              rgba(0, 0, 0, 0),
              rgba(0, 0, 0, 0.2)
            );
          }
        }
        .right {
          flex: 1 1 auto;
          width: 1%;
          margin-left: 16px;
          h2 {
            padding-top: 1px;
            font-size: 17px;
            line-height: 1.3;
            color: #fefefe;
            height: 44px;
            display: -webkit-box;
            -webkit-box-pack: center;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          .lsthd_auth {
            display: block;
            position: relative;
            margin-top: 20px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            word-break: normal;
            .lsthd_link {
              display: inline-block;
              color: hsla(0, 0%, 100%, 0.7);
              .u-avatar {
                display: inline-block;
                width: 30px;
                height: 30px;
                border-radius: 50%;
                vertical-align: middle;
                margin-right: 5px;
                img.u-img {
                  border-radius: 50%;
                  width: 100%;
                  vertical-align: middle;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
