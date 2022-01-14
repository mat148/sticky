<template>
    <modal>
      <template v-slot:body>
        {{type.string}}
        <button @click="$emit('confirm', type)">Yes</button>
        <button @click="$emit('deny', type)">No</button>
      </template>
    </modal>
</template>

<script>
  export default {
    props: {
      type: { required: true, type: Object }
    }
  }
</script>