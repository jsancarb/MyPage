<template>
  <span :class="`mdi mdi-${name} ${size}`"></span>
</template>

<script>
export default {
  props: {
    name: String,
    size: {
      type: String,
      default: "sm"
    }
  }
};
</script>

<style>
.xs{
  font-size: 1em;
}
.sm{
  font-size: 2em;
}
.md{
  font-size: 3em;
}
.lg{
  font-size: 4em;
}
.xl{
  font-size: 5em;
}
</style>
