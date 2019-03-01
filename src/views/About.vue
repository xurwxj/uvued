<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script>
export default {
  async asyncData() {
    return {
      variable: 'test',
      description:'jk'
    };
  },
  metaInfo() {
    return {
      title: this.variable,
      meta: [
          { vmid: 'description', name: 'description', content: this.description }
        ]
    };
  }
}
</script>
