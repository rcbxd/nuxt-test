<template lang="pug">
  b-carousel(:value="pos" :autoplay="false")
    CarouselItem(v-for="(pic, i) in pictures" :key="i" :text="pic.text" :url="pic.url" :desc="pic.desc")
</template>

<script>
import { mapGetters } from 'vuex'
import CarouselItem from './CarouselItem.vue'

export default {
  name: 'CarouselComponent',
  components: { CarouselItem },
  ...mapGetters({
    pictures: 'getPictures'
  }),
  props: ['newPic'],
  data () {
    return {
      pos: 0
    }
  },
  computed: {
    pictures () {
      return this.$store.state.pictures.list
    }
  },
  watch: {
    newPic () {
      if (this.newPic) {
        setTimeout(() => {
          this.pos = this.$store.state.pictures.list.length - 1
        })
        this.$emit('new-picture-scrolled')
      }
    }
  }
}
</script>
