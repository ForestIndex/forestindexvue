<style lang="scss">
.banner {
  background-color: white;
  width: 100%;
  margin: 0;
  padding: 0;
  img {
    width: 20%;
    margin: 0 40%;
  }
}

@media(max-width: 1080px) {
  .banner {
    img {
      width: 80%;
      margin: 0 10%;
    }
  }
}
</style>


<template>

<div class="banner">
  <img src="media/forestindex3_transparent.png" alt="Forest Index" />
</div>

</template>


<script>
export default {

}
</script>
