<template>
    <modal>
      <template v-slot:body>
        Are you sure you want to delete your note?  This will delete it forever!
        <button @click="$emit('confirm')">Yes</button>
        <button @click="$emit('deny')">No</button>
      </template>
    </modal>
</template>