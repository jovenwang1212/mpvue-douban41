<template>
  <div>
    <div class="header">
      <span>豆瓣</span>
      <icon type="search"
            size="16"
            color="#00b600">
      </icon>
      <button>打开豆瓣App</button>
    </div>

    <div class="movie-item" v-for="(cate, j) in categoryList" :key="cate.name">
      <p class="title">
        <span>{{cate.name}}</span>
        <span class="more-link">更多</span>
      </p>
      <scroll-view class="scroll-view_H"
                   scroll-x="true"
                   style="width: 100%"
                   enable-flex>

        <div class="scroll-view-item_H"
             v-for="item in cate.movieList"
             :key="item.id">
          <img :src="item.images.large"
               alt="">
          <p class="text-line1">{{item.title}}</p>
          <div class="rating">
            <div class="stars"
                 v-if="item.rating.average">
              <img v-for="(item2,i) in item.starNum"
                   :key="item2"
                   src="../../../static/images/star.svg"
                   alt="">
              <img v-for="(item2,i) in (5-item.starNum)"
                   :key="item2"
                   src="../../../static/images/unstar.svg"
                   alt="">
            </div>
            <span>{{item.rating.average?item.rating.average:'暂无评论'}}</span>
          </div>
        </div>
      </scroll-view>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      categoryList: [
        {
          name: '影院热映',
          param: 'in_theaters',
          movieList: []
        },
        {
          name: 'TOP250',
          param: 'top250',
          movieList: []
        }
      ]
    }
  },
  created () {
    this.categoryList.forEach(v => {
      this.getMovieList(v)
    })
  },
  methods: {
    getMovieList (movie) {
      this.$request({
        url: `/v2/movie/${movie.param}?apikey=0df993c66c0c636e29ecbb5344252a4a`
      }).then(res => {
        let movieList = res.data.subjects

        movieList.forEach(v => {
          v.starNum = Math.ceil(v.rating.average / 2)
        })
        movie.movieList = movieList
      })
    }
  }
}
</script>
<style lang="less">
.header {
  height: 94rpx;
  border-bottom: 1rpx solid #eee;
  display: flex;
  padding: 0 36rpx;
  align-items: center;
  span {
    color: #00b600;
    font-size: 40rpx;
  }
  icon {
    flex: 1;
    margin-left: 28rpx;
  }
  button {
    background-color: #42bd56;
    color: #fff;
    width: 200rpx;
    height: 58rpx;
    border-radius: 8rpx;
    line-height: 58rpx;
    font-size: 24rpx;
  }
}

.movie-item {
  margin-bottom: 62rpx;
  .title {
    height: 88rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 36rpx;
    .more-link {
      color: #42bd56;
    }
  }
}

.scroll-view_H {
  display: flex;
  margin-top: 12rpx;
  height: 370rpx;
}
.scroll-view-item_H {
  width: 200rpx;
  margin-right: 18rpx;
  img {
    width: 200rpx;
    height: 286rpx;
  }
  p {
    text-align: center;
  }
}

.rating {
  display: flex;
  justify-content: center;
  span {
    color: #aaa;
    margin-left: 8rpx;
  }
}

.stars {
  img {
    width: 20rpx;
    height: 20rpx;
  }
}
</style>