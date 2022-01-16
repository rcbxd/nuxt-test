<template lang="pug">
  div
    b-button(label="Add picture" @click="isModalActive = true")
    b-modal(v-model="isModalActive" :width="640" scroll="keep")
      div.card
        .card-content
          b-field(label="Title")
            b-input(placeholder="Name of the picture" v-model="pictureName")
          b-field(label="Description")
            b-input(maxlength="200" type="textarea" v-model="pictureDesc")
          b-field(class="file is-primary" :class="{'has-name': !!file}")
            b-upload(v-model="file" class="file-label")
              span.file-cta
                b-icon(class="file-icon" icon="upload")
                span(class="file-label")
                  | Click to upload
              span(v-if="file" class="file-name")
                | {{ file.name }}
          b-button(label="Submit" @click="upload")
</template>
<script>
export default {
  name: 'CarouselModal',
  data () {
    return {
      isModalActive: false,
      file: null,
      pictureName: '',
      pictureDesc: ''
    }
  },
  methods: {
    async upload () {
      const formData = new FormData()
      formData.append('picture', this.$data.file)
      formData.append('name', this.$data.pictureName)
      formData.append('desc', this.$data.pictureDesc)

      const req = await fetch('http://localhost:3000/api/upload-picture', {
        method: 'POST',
        body: formData
      })

      const jsonData = await req.json()

      if (jsonData.success === false) {
        alert(`err: ${jsonData.message}`)
        return
      }

      const { url } = jsonData.body

      this.$store.commit('pictures/add', { text: this.$data.pictureName, desc: this.$data.pictureDesc, url })
      this.$data.isModalActive = false
      this.$data.file = null
      this.$data.pictureName = ''
      this.$data.pictureDesc = ''
      this.$emit('new-picture')
    }
  }
}
</script>
