export const state = () => {
  return { list: [] }
}

export const getters = {
  getPictures: state => state.list
}

export const mutations = {
  add: (state, { text, url, desc }) => {
    state.list.push({ text, url, desc })
  }
}
