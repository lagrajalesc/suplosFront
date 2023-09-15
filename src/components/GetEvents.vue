<template>
  <button class="button button1" @click="logout()">logout</button>
<table>
  <thead>
    <tr>
      <th>Operación</th>
      <th>Descripción</th>
      <th>Divisa</th>
      <th>Fecha de inicio</th>
      <th>Fecha de cierra</th>
      <th>Presupuesto</th>
      <th>Bienes o servicios</th>
      <th>Estado</th>
    </tr>
  </thead>
  <tbody>
  
      <tr v-for="event in events" v-bind:key="event.event_description">
      <td> {{ event.operation_name  }} </td>
      <td>{{ event.event_description }}</td>
      <td>{{ event.currency }}</td>
      <td>{{ event.startDate }}</td>
      <td>{{ event.endDate }}</td>
      <td>{{ event.budget }}</td>
      <td>{{ event.nombre_producto }}</td>
      <td>{{ event.status_name }} </td>
      </tr>

  </tbody>
</table>

<router-link
  to="/createEvents"
  v-slot="{href, route, navigate}"
  >
      <button :href="href" @click="navigate" class="button button1">Crear nuevo evento</button>
      {{ route.name }}

</router-link>
<button class="button button1" @click="download()">Descargar</button>
</template>

<style scoped>
/* Estilos de etiqueta*/
.button {
  background-color: #4CAF50; 
  border: none;
  color: white;
  padding: 0.3% 1.16%;
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
  border: 2px solid rgba(5, 5, 100, 95);;
}

.button1:hover {
  background-color: rgba(5, 5, 100, 95);
  color: white;
}



body {
  background-color: #CCBBEE;
}

table {
  background: white;
  width: 75%;
  margin: 0 auto;
  margin-top: 1%;
  border-collapse: collapse;
  text-align: center;
}

th {
  background-color: rgba(5, 5, 100, 95);
  height: 35px;
  border-bottom: 1px solid rgb(210, 220, 250);
  color: rgb(120, 120, 120);
}

td {
  color: rgba(100, 100, 100, 60);
  height: 30px;
  border: 0.5px solid rgba(240, 240, 240, 10);
}


/*Pseudo-clases*/
th:hover {
  background-color: rgba(20, 20, 20, 90);
}

tr:hover {
  background-color: rgba(15, 25, 25, 90);
}

/* Estililos de clases*/
.PrecioTotal:hover,
.CantidadTotal:hover {
  color: rgb(230, 50, 50);
}


a{
  text-decoration: none;
  color: white;
  font-size: 14pt;
}

</style>

<script>
import axios from 'axios'
import exportFromJSON from 'export-from-json'
export default {
    data() {
      // se crean las variables y se recolectan los datos necesarios para ver los eventos creados
        return {
            baseUrl: "http://localhost/proyectos/PruebaSuplos/",
            events : []
        };
    },
    // se crea función que valida que exista token en la localstore
    methods: {
        auth() {
          // se valida variable auth_token en la local store
          var token = localStorage.getItem("auth_token");
          // se valida el token
          if(token){
            // en caso de que exista se ejecuta la función updateStatus
            this.updateStatus();
          }else{
            // en caso de que no exista, se redirecciona hacia las vista del login
            location.href = "http://localhost:8080/";
          }
        },
        // se crea funcion la cual consume la api updateEventStatus
        updateStatus(){
          const headers = {
                'Content-Type': 'text/plain'
            };
            // por medio del objeto axios se consume la api
            axios.get(this.baseUrl + 'updateEventStatus',
          { headers })
          // se valida la respuesta de la api
          .then((response) => {
            var error = response.data.error
            if(error){
              // si retorna un error este se muestra como una alerta
              alert(response.data.message)
            }else{
              // si se consume correctamente, se llama a la función listEvents
              this.listEvents();
            }
          });
        },
        // se crea función listEvents la cual consume la api getEvents
        listEvents(){
          const headers = {
                'Content-Type': 'text/plain'
            };
            // por medio del objeto axios se consume la api
          axios.get(this.baseUrl + 'getEvents',
          { headers })
          .then((response) => {
            var error = response.data.error
            if(error){
               // si retorna un error este se muestra como una alerta
              alert(response.data.message)
            }else{
              // si se consume correctamente la api, el resultado de esta se asigna a la 
              // variable events y posteriormente será utilizada para presentar los registros obtenido en una tabla en esta vista
              this.events = response.data.data.getEvents;
            }
          });
        },
        // se crea función que desloguea al usuario
        logout(){
          // se actuliza el token por un arreglo vacío
          var token = localStorage.setItem("auth_token","");
          if(!token){
            // ya que no existe token, se redireccona hacia el login
            location.href = "http://localhost:8080/";
          }
        },
        // se crea función que permite descarhar los datos de la tabla 
        download(){
          const data = this.events;
          const dataType = exportFromJSON.types.xls;
          const fileName = 'eventos';
          exportFromJSON({data, fileName, dataType});
        }
    },
    mounted() {
      // se llama a las funciones auth y updateStatus mientras se monta la vista
      this.auth();
      this.updateStatus();
    },
}
</script>