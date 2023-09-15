<template>
    <h1>
        Su cuenta ha sido creada exitosamente.
    </h1>

    <router-link to="/" v-slot="{ href, route, navigate }">
        <button :href="href" @click="navigate" class="button button1">Ir a login</button>
        {{ route.name }}

    </router-link>

</template>

<style scoped>

.button {
  background-color: #4CAF50; 
  border: none;
  color: white;
  padding: 1% 1.16%;
  text-align: center;
  text-decoration: none;
  font-size: 16px;
  transition-duration: 0.4s;
  cursor: pointer;
  position: relative;
  margin-top: 0.3%;

}

.button1 {
  background-color: white; 
  color: black; 
  border: 2px solid #4CAF50;
}

.button1:hover {
  background-color: #4CAF50;
  color: white;
}
</style>