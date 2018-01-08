<style lang="scss">
@import '../styles/variables.scss';

.greenBox {
  color: white;
  background-color: $thinGreen;
  padding: .2%;
  margin: 0 1%;
  display: inline-block;
  max-width: 35%;
  font-family: 'Nunito', sans-serif;
}

@media(max-width: 1080px) {
  .greenBox {
    border-radius: .2rem;
    width: 96%;
    max-width: 98%;
    font-size: 1.5rem;
    margin: 1% 0;
    box-shadow: 0 0 .8rem gray inset;
    &:nth-child(1) {
      margin-top: 4%;
    }
  }
}
</style>


<template>
  <li class="greenBox">{{ obj.name }}</li>  
</template>


<script>
export default {
  props: [
    'obj'
  ]
}
</script>