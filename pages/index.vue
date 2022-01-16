<template lang="pug">
  section.container
    div
      h1.title
        | Picture gallery
      </h1>
      CarouselModal(v-on:new-picture="newPic = true")
      carousel(:newPic="newPic" v-on:new-picture-scrolled="newPic = false")
</template>

<script>
import Carousel from '../components/Carousel.vue'
import CarouselModal from '../components/CarouselModal.vue'

export default {
  name: 'IndexPage',
  components: { Carousel, CarouselModal },

  async asyncData ({ store }) {
    const pics = await fetch('http://localhost:3000/api/get-pictures')
    const picsJson = await pics.json()

    for (const pic of picsJson.body) {
      store.commit('pictures/add', {
        text: pic.title,
        url: 'http://localhost:3000/api' + pic.url,
        desc: pic.desc
      })
    }
  },
  data () {
    return {
      newPic: false
    }
  },
  watch: {
    newPic () {
      console.log(this.newPic)
    }
  }
}
</script>
