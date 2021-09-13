<template>
  <div
    @click="$router.push({ name: 'entry', params: { id: 10 } })"
    class="entry-container mb-3 pointer p-2"
  >
    <!-- Title -->
    <div class="entry-title d-flex">
      <span class="text-success fs-5 f2-bold">12</span>
      <span class="mx-1 fs-5">Septiembre</span>
      <span class="mx-1 fw-light">2021, domingo</span>
    </div>

    <div class="entry-description">
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Excepturi eaque
      esse cumque, assumenda illo explicabo cupiditate ipsa, ab totam quae
      expedita labore molestiae officiis beatae deserunt illum atque aperiam
      exercitationem?
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.entry-container {
  border-bottom: 1px solid #2c3e50;
  transition: 0.2s all ease-in;

  &:hover {
    background-color: lighten($color: gray, $amount: 45);
    transition: 0.2s all ease-in;
  }

  .entry-description {
    font-size: 12px;
  }
}
</style>