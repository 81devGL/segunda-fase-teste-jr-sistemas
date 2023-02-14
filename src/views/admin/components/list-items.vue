<template>
  <div>
    <table class="table table-boreded">
      <tr>
        <th>Nome</th>
        <th>CPF</th>
        <th>Dt. Nascimento</th>
        <th>Email</th>
        <th>Telefone</th>
        <th>Ações</th>
      </tr>
      <tr v-for="(item, index) in items" :key="`item-${index}`">
        <td>{{ item.nome }}</td>
        <td>{{ item.cpf_cnpj }}</td>
        <td>{{ item.dt_nascimento }}</td>
        <td>{{ item.email }}</td>
        <td>{{ item.telefone_1 }}</td>
        <td>
          <button class="btn btn-info" @click="action('edit', item)">
            Editar
          </button>
          <button class="btn btn-danger" @click="action('delete', item)">
            Excluir
          </button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    items: {
      type: Array,
      default() {
        return [] as any[];
      },
    },
  },
});
</script>

<style scoped>
.table {
  margin-top: 20px;
}
</style>