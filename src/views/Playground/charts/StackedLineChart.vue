<script setup>
  import { onMounted } from 'vue'
  import c3 from 'c3'

  onMounted(() => {
    generate()
  })

  const props = defineProps({
    data: {
      type: Object,
      required: true
    }
  })

  const generate = () => {
    c3.generate({
      bindto: `#stacked-line-chart-${props.data.id}`,
      ...props.data
    })
  }
</script>

<template>
  <div
    class="[&>svg]:w-auto [&>svg]:flex"
    :id="`stacked-line-chart-${props.data.id}`"
  />
</template>
