<style lang="scss">
@import '../styles/common.scss';
</style>


<template lang="html">

<section class="outerSection">
  <banner></banner>
  <navigation></navigation>
  <div class="box">
    <h1>Home</h1>
  </div>
</section>

</template>


<script>
import navigation from './child.navigation.vue';
import banner from './child.banner.vue';

export default {
  data: function() {
    return {};
  },
  components: {
    banner,
    navigation
  }
}
</script>
