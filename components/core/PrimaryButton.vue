<template>
  <button class="primary-button" :type="type">
    {{ text }}
  </button>
</template>

<script setup lang="ts">
defineProps<{ type?: "button" | "submit" | "reset"; text: string }>();
</script>

<style lang="scss">


.primary-button{
  padding: 10px 20px;
  border: none;
  background-color: $primary;
  color: $white;
  width:6rem;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  transition: background-color 0.3s;

  &:hover {
    background-color: darken($primary, 10%);
  }
}
</style>
