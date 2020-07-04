<template>
    <div>
        <swiper ref="mySwiper" :options="swiperOptions " autoplay:true >
            <swiper-slide > <img src="../images/1.jpg" class="w-100"></swiper-slide>
            <swiper-slide><img src="../images/2.jpg" class="w-100"></swiper-slide>
            <swiper-slide ><img src="../images/3.jpg" class="w-100"></swiper-slide>
            <div class="swiper-pagination pagination-home text-right px-3 pb-2" slot="pagination"></div>
        </swiper>
        <!-- end of swiper -->
        <div class="nav-icons bg-white mt-3  text-center pt-3 text-grey-1 fs-sm">
        <div class="d-flex flex-wrap">
            <div class="nav-item mb-3  " >
               <i class="sprite sprite-news "></i>
               <div>战略英雄</div>
           </div>

          <div class="nav-item mb-3  " >
              <i class="sprite sprite-stories"></i>
               <div>故事站</div>
          </div>

          <div class="nav-item mb-3">
              <i class="sprite sprite-store"></i>
               <div>周边商城</div>
          </div>

          <div class="nav-item mb-3">
               <i class="sprite sprite-4"></i>
               <div>体验服</div>
          </div>

          <div class='nav-item mb-3'> 
               <i class="sprite sprite-5"></i>
               <div>新人专区</div>
          </div>

          <div class='nav-item mb-3'>    
               <i class="sprite sprite-6"></i>
               <div>荣耀传承</div>
          </div>

          <div class='nav-item mb-3'>
               <i class="sprite sprite-7"></i>
               <div>模拟站资料库</div>
          </div>

          <div class="nav-item mb-3">
               <i class="sprite sprite-8"></i>
               <div>王者营地</div>
          </div>

          <div class="nav-item mb-3">
               <i class="sprite sprite-9"></i>
               <div>公众号</div>
          </div>
        </div>
        <div class="bg-light py-2 ">
            <i class="sprite sprite-arrow mr-1"></i>
            <span>展开</span>
        </div>
    </div>
    
    <m-list-card icon='menu' title="新闻资讯" :categories="newsCats">
        <template #items="{category}">
            <router-link 
             tag="div"
             :to="`/articles/${news._id}`"
             class="py-2 fs-lg d-flex" v-for="(news,i) in category.newsList" :key="i">
                       <span class='text-info'>[{{news.categoryName}}]</span>
                       <span class='px-2'>|</span>
                       <span class="flex-1 text-dark-1 text-ellipse pr-2">{{news.title}}</span>
                       <span class="text-grey-1 fs-sm">{{news.createdAt|date}}</span>
            </router-link>
            </template> 
    </m-list-card>
    <m-list-card icon='card-hero' title="英雄列表" :categories="heroCats">
        <template #items="{category}">
            <div class="d-flex flex-wrap " style="margin:0 -0.5rem">
            <router-link
            tag="div"
            :to="`/heroes/${hero._id}`"
             class="p-2 text-center" v-for="(hero,i) in category.heroList" :key="i"
            style="width:20%;">
                    <img :src="hero.avatar" alt="" class="w-100">
                   <div>{{hero.name}}</div>
                </router-link>
            </div>
            </template> 
    </m-list-card>
    </div>
</template>
<script>
import dayjs from'dayjs'
export default {
    //过滤器
    filters:{
        date(val){
            return dayjs(val).format('MM/DD')
        }
    },
    data(){
         return{
           swiperOptions: {
               loop:true,
               autoplay:true,
               speed:400,
          pagination: {
            el: '.pagination-home'
          }
      },
      newsCats:[],
      heroCats:[],
 
    }
   },
   methods:{
       async fetchNewsCats(){
       const res=await this.$http.get('news/list')
       this.newsCats=res.data
       },
       async fetchHeroCats(){
       const res=await this.$http.get('heroes/list')
       this.heroCats=res.data
       }
   },
    created(){
         this.fetchNewsCats()
         this.fetchHeroCats()
    }
}
</script>
<style lang="scss">
@import '../SCSS/variables';
.pagination-home{
    .swiper-pagination-bullet{
        border-radius: 0.1538rem;
            opacity: 1;
        background:map-get($colors,'white');
        &.swiper-pagination-bullet-active{
            background-color:map-get($colors,'info');
            
        }
    }
    
}
.nav-icons{
    .nav-item{
        width:25%;
        border-right:1px solid $border-color;
    &.nth:child(4n){
        border-right:none;
    }
    }
}
</style>