<template lang="pug">
  b-carousel-item
    section.hero.is-body
      div.hero-body
        b-image.image(:src="url")
        h1.title
          | {{ text }}
        p.description
          | {{ desc }}
</template>

<script>
export default {
  name: 'CarouselItem',
  props: ['text', 'desc', 'url']
}
</script>

<style>
img{
  max-height: 600px;
}
</style>
