<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header"> default header </slot>
          </div>
          <div class="modal-body">
            <slot name="body"> default body </slot>
          </div>
          <div class="modal-footer">
            <slot name="footer"></slot>
            <button
              class="modal-default-button btn btn-danger"
              @click="$emit('close')"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

 <script lang="ts">
import Vue from "vue";
export default Vue.extend({});
</script>