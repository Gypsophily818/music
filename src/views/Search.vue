<template>
  <div class="searchMusic">
    <div class="inputcover">
      <i class="u-svg u-svg-srch"></i
      ><input
        type="search"
        class="input"
        placeholder="搜索歌曲、歌手、专辑"
        v-model.trim="searchSong"
        @keydown.enter="entersearch()"
        @input="inputing = true"
      />
      <figure class="close"><i class="u-svg u-svg-empty"></i></figure>
    </div>
    <Loading v-show="isGetAllData"></Loading>

    <div class="hotSearch"></div>
    <div
      class="m-hotlist"
      v-if="!inputing && getSongs.length === 0 && !isGetAllData"
    >
      <span class="title">热门搜索</span>
      <ul class="list">
        <li
          class="item f-bd f-bd-full"
          v-for="(word, index) in HotWords"
          :key="index"
        >
          <a
            class="link"
            href="javascript:void(0);"
            @click.stop="clickHistory"
            >{{ word.first }}</a
          >
        </li>
      </ul>
      <!-- 搜索历史 -->

      <ul class="history">
        <li class="songs" v-for="(song, index) in search_history" :key="index">
          <i class="u-svg u-svg-srch"></i>
          <a
            class="link"
            href="javascript:void(0);"
            @click="clickHistory($event)"
          >
            <div class="item">{{ song }}</div>
          </a>
          <div
            class="right-close"
            @click="removeHistory($event)"
            :data-index="index"
          >
            <i class="close" :data-index="index"></i>
          </div>
        </li>
      </ul>
    </div>

    <!-- 搜索中--搜索建议 -->
    <div class="searchSuggest" v-if="inputing && !isGetAllData">
      <ul class="showGainSongs">
        <div class="searching">搜索"{{ searchSong }}"</div>

        <li
          class="songs"
          v-for="song in searchSuggest"
          :key="song.id"
          @click="inputing = false"
        >
          <i class="u-svg u-svg-srch"></i>
          <a
            class="link"
            href="javascript:void(0);"
            @click="clickHistory($event)"
          >
            <div class="item">{{ song.keyword }}</div>
          </a>
        </li>
      </ul>
    </div>

    <div class="result" v-if="!inputing && getSongs !== '' && !isGetAllData">
      <ul>
        <SearchSong
          v-for="(item, index) in getSongs"
          :key="item.id"
          :index="index"
          :item="item"
          :toplist="getSongs"
          :isPaused="$attrs.isPaused"
          class="songItem"
          :songQuility="songQuility[index]"
          :currentSong="$attrs.currentSong"
          @update:currentSong="updateCurrentSong"
          @update:newSongList="$emit('update:newSongList', getSongs)"
        >
        </SearchSong>
      </ul>
    </div>
  </div>
</template>
<script>
import SearchSong from "@/components/SearchSong .vue";
import Loading from "@/components/Loading.vue";

export default {
  components: {
    SearchSong,
    Loading,
  },
  data() {
    return {
      searchSong: "",
      inputing: false,
      isShowResult: null,
      searchSuggest: null,
      HotWords: null,
      result: null,
      search_history: [],
      getAlbum: "",
      getSongs: [],
      songQuility: [],
      isGetAllData: true,
      accompleteIndex: 0,
    };
  },
  created() {
    this.axios.get("/search/hot").then((response) => {
      this.HotWords = response.data.result.hots;
      this.isGetAllData = false;
    });
    this.search_history = this.$storage.get("__search__") || [];
  },
  watch: {
    searchSong(n) {
      if (n) {
        this.isShowResult = true;
        this.axios
          .get("/search/suggest?keywords= " + this.searchSong + "&type=mobile")
          .then((response) => {
            this.searchSuggest = response.data.result.allMatch;
          });
      } else {
        this.inputing = false;
        this.getSongs = [];
      }
    },
    search_history() {
      this.$storage.set("__search__", this.search_history);
    },
  },
  methods: {
    // 删除历史
    removeHistory(e) {
      this.search_history.splice(e.target.dataset.index, 1);
    },
    // 点击搜索
    clickHistory(e) {
      this.isGetAllData = true;
      this.getSongs = [];
      console.log("getSongs.length === 0 ==>", this.getSongs.length === 0);
      console.log("!isGetAllData ==>", !this.isGetAllData);
      // inputing && getSongs.length === 0 && !isGetAllData

      let text = e.target.innerHTML;

      // 存入历史
      if (this.search_history.indexOf(text) === -1) {
        this.search_history.unshift(text);
      } else {
        this.search_history.map((item, index) => {
          if (index == this.search_history.indexOf(text)) {
            this.search_history.unshift(
              this.search_history.splice(index, 1)[0]
            );
          }
        });
      }

      // 当前元素的文子进行搜索
      this.searchSong = text;
      // 可以搜索该音乐 / 专辑 radio / 歌手 artist  / 歌单 playlist / 用户
      this.axios.get("/search/multimatch?keywords=" + text).then((response) => {
        this.getAlbum = response.data.result.radio;
      });
      // 歌曲
      this.axios
        // /cloudsearch
        .get("search?keywords=" + text)
        .then((response) => {
          this.getSongs = response.data.result.songs;
          this.getSongs = this.getSongs
            .map((e) => {
              return e.id;
            })
            .toString();
          console.log("this.accompleteIndex", this.accompleteIndex);
          console.log("");
          console.log("");
          console.log("");
          console.log("getSongs.length === 0 ==>", this.getSongs.length === 0);
          console.log(this.getSongs);
          console.log("!isGetAllData ==>", this.isGetAllData);
          console.log("get songs id");
          this.axios
            .get("/song/detail?ids=" + this.getSongs + "")
            .then((response) => {
              this.songQuility = response.data.privileges;
              this.songQuility = this.songQuility.map((e) => {
                return e.playMaxbr;
              });
              console.log("this.songQuilit ====>  ", this.songQuility);
              this.getSongs = response.data.songs;
            })
            .finally(() => {
              this.accompleteIndex++;
              console.log("this.accompleteIndex", this.accompleteIndex);
              if (this.accompleteIndex === 2) {
                this.isGetAllData = false;
                this.accompleteIndex = 0;
              }
            });
        })
        .finally(() => {
          this.accompleteIndex++;
        });
    },
    updateCurrentSong(e, index) {
      this.$emit("update:currentSong", e, index);
    },
    entersearch() {
      if (this.searchSong) {
        this.inputing = false;
        let text = this.searchSong;
        // 存入历史
        if (this.search_history.indexOf(text) === -1) {
          this.search_history.unshift(text);
        } else {
          this.search_history.map((item, index) => {
            if (index == this.search_history.indexOf(text)) {
              this.search_history.unshift(
                this.search_history.splice(index, 1)[0]
              );
            }
          });
        }

        // 歌曲多重匹配

        this.axios
          .get("search?keywords=" + text)
          .then((response) => {
            this.getSongs = response.data.result.songs;
            this.getSongs = this.getSongs
              .map((e) => {
                return e.id;
              })
              .toString();
            this.axios
              .get("/song/detail?ids=" + this.getSongs + "")
              .then((response) => {
                console.log(response);
                this.songQuility = response.data.privileges;
                this.songQuility = this.songQuility.map((e) => {
                  return e.playMaxbr;
                });
                console.log("this.songQuilit ====>  ", this.songQuility);
                this.getSongs = response.data.songs;
              })
              .finally(() => {
                this.accompleteIndex++;
              });
          })
          .finally(() => {
            this.accompleteIndex++;
          });
        if (this.accompleteIndex === 2) {
          this.isGetAllData = false;
          this.accompleteIndex = 0;
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.searchMusic {
  padding: 8px;
  .inputcover {
    position: relative;
    padding: 10px;
    width: 100%;
    .u-svg-srch {
      width: 13px;
      height: 13px;
      position: absolute;
      left: 17px;
      top: 17px;
      display: inline-block;
      background-image: url(../assets/search-icon.svg);
      background-repeat: no-repeat;
    }
    .input {
      display: inline-block;
      width: 100%;
      height: 30px;
      line-height: 18px;
      font-size: 14px;
      border-radius: 20px;
      color: #333;
      padding-left: 25px;
      outline: none;
      border: none;
      z-index: 3;
    }
    .holder {
      position: absolute;
      left: 40px;
      line-height: 30px;
    }
  }
  .m-hotlist {
    .title {
      border: none;
      color: #666;
      font-size: 12px;
    }
    ul.list {
      min-height: 160px;
      margin-top: 8px;
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      margin-left: 15px;
      .item {
        display: inline-block;
        height: 32px;
        margin-right: 8px;
        margin-bottom: 8px;
        padding: 0 14px;
        font-size: 14px;
        line-height: 32px;
        border: 2px solid #ccc;
        border-radius: 30px;
        color: #333;
        a {
          text-decoration: none;
          color: #333;
        }
        &::after {
          border-color: #d3d4da;
          border-radius: 32px;
        }
      }
    }
  }
  .searchSuggest {
    .showGainSongs {
      padding: 0 20px 20px;
      .searching {
        height: 50px;
        padding-right: 10px;
        font-size: 15px;
        line-height: 50px;
        border-bottom: 1px solid #eee;
        color: #507daf;
      }
      .songs {
        display: flex;
        margin: 5px 0;
        font-size: 15px;
        height: 44px;
        line-height: 44px;
        .u-svg-srch {
          width: 20px;
          height: 13px;
          flex: 0 0 auto;
          display: inline-block;
          background-image: url(../assets/search-icon.svg);
          background-repeat: no-repeat;
          margin: auto 0;
        }
        .link {
          color: #333;
          text-decoration: none;
        }
      }
    }
  }

  .history {
    padding: 0 10px 0px;
    .songs {
      display: flex;
      margin: 5px 0;
      font-size: 15px;
      height: 44px;
      line-height: 44px;
      border-bottom: 1px solid #eee;

      .u-svg-srch {
        width: 15px;
        height: 15px;
        // flex: 0 0 auto;
        // flex: 1;

        display: inline-block;
        background-image: url(../assets/history.svg);
        background-repeat: no-repeat;
        margin: auto 0;
        margin-right: 8px;
      }
      .link {
        color: #333;
        flex: 2;
        text-decoration: none;
      }
      .right-close {
        margin-right: 8px;
        width: 30px;
        height: 100%;
        text-align: center;
        .close {
          width: 12px;
          height: 12px;
          z-index: -1;
          display: inline-block;
          background-image: url(../assets/close.svg);
        }
      }
    }
  }
}
</style>
