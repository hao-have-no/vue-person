<template>
  <div class="display-flex align-items-center">
    <span class="el-icon-s-flag" style="font-size: 20px; margin-right: 10px; color: #00B4FF;" aria-hidden="true"></span>
    <span style=" font-size: 18px; font-weight: 600">
      <slot name="titleName"></slot>
       <slot></slot>
    </span>
  </div>
</template>

<script>
    export default {
        name: "ModuleTitle"
    }
</script>
