<template>
    <form class="form">
        <h2>Nuevo Evento</h2>
        <p type="Objeto"></p>
        <select v-model="assets">
            <option value="" disabled selected>Selecciona una opción</option>
            <option v-for="asset in assetsA" v-bind:key="asset.nombre_producto" v-bind:value="asset.codigo_producto">
                {{ asset.nombre_producto }}</option>
        </select>

        <p type="Descripción"><input v-model="description" placeholder="Ingrese la descripción o alcance" /></p>

        <p type="Moneda"></p>
        <select v-model="currency">
            <option value="" disabled selected>Selecciona una opción</option>
            <option v-for="c in currencyA" v-bind:key="c.currency" v-bind:value="c.id">{{ c.currency }}</option>
        </select>
        <p type="Fecha de inicio"><input v-model="startDate" placeholder="YYYY-MM-DD" /></p>
        <p type="Hora de inicio (4:00pm = 16:00)"><input v-model="startTime" placeholder="HH:MM" /></p>
        <p type="Fecha de cierre:"><input v-model="endDate" placeholder="YYYY-MM-DD" /></p>
        <p type="Hora de cierre (4:00pm = 16:00)"><input v-model="endTime" placeholder="HH:MM" /></p>
        <p type="Presupuesto (menor que 100000000)"><input v-model="budget" placeholder="Indique el presupuesto" /></p>

        <p type="Operación"></p>
        <select v-model="operation_id">
            <option value="" disabled selected>Selecciona una opción</option>
            <option v-for="o in operationsA" v-bind:key="o.operation_name" v-bind:value="o.id">{{ o.operation_name }}
            </option>
        </select>

        <router-link to="/getEvents" v-slot="{ href, route, navigate }">
            <button :href="href" @click="navigate">Cancelar</button>
            {{ route.name }}
        </router-link>
        <button @click="addEvent()">Crear</button>

    </form>
</template>

<style scoped>
select {
    display: block;
    height: 35px;
    width: 100%;
}

body {
    background: #59ABE3;
    margin: 0
}

.form {
    width: 340px;
    height: 900px;
    background: #e6e6e6;
    border-radius: 8px;
    box-shadow: 0 0 40px -10px #000;
    margin: calc(50vh - 220px) auto;
    padding: 20px 30px;
    max-width: calc(100vw - 40px);
    box-sizing: border-box;
    font-family: 'Montserrat', sans-serif;
    position: relative
}

h2 {
    margin: 10px 0;
    padding-bottom: 10px;
    width: 180px;
    color: #78788c;
    border-bottom: 3px solid #78788c
}

input {
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
    background: none;
    outline: none;
    resize: none;
    border: 0;
    font-family: 'Montserrat', sans-serif;
    transition: all .3s;
    border-bottom: 2px solid #bebed2
}

input:focus {
    border-bottom: 2px solid #78788c
}

p:before {
    content: attr(type);
    display: block;
    margin: 28px 0 0;
    font-size: 14px;
    color: #5a5a5a
}

button {
    float: right;
    padding: 8px 12px;
    margin: 8px 0 0;
    font-family: 'Montserrat', sans-serif;
    border: 2px solid #78788c;
    background: 0;
    color: #5a5a6e;
    cursor: pointer;
    transition: all .3s
}

button:hover {
    background: #78788c;
    color: #fff
}

div {
    content: 'Hi';
    position: absolute;
    bottom: -15px;
    right: -20px;
    background: #50505a;
    color: #fff;
    width: 320px;
    padding: 16px 4px 16px 0;
    border-radius: 6px;
    font-size: 13px;
    box-shadow: 10px 10px 40px -14px #000
}

span {
    margin: 0 5px 0 15px
}
</style>

<script>
import axios from 'axios'
export default {
    // se crean las variables y se recolectan los datos necesarios para ver los eventos creados
    data() {
        return {
            baseUrl: "http://localhost/proyectos/PruebaSuplos/",
            currencyA: [],
            assetsA: [],
            operationsA: [],
            assets: "",
            description: "",
            currency: "",
            startDate: "",
            startTime: "",
            endDate: "",
            endTime: "",
            token_auth : "",
            budget: "",
            operation_id: ""

        };
    },
    methods: {
        auth() {
            // se valida variable auth_token en la local store
            var token = localStorage.getItem("auth_token");
            // se valida el token
            if (token) {
                // en caso de que exista, se asigna el token a una variable y se ejecutan las funciones
                // getAssets(), getCurrency() y getOperations()
                this.token_auth = token;
                this.getAssets();
                this.getCurrency();
                this.getOperations();
            } else {
                // en caso de que no exista, se redirecciona hacia las vista del login
                location.href = "http://localhost:8080/";
            }
        },
        // se crea funcion la cual consume la api currency
        getCurrency() {
            const headers = {
                'Content-Type': 'text/plain'
            };
            // por medio del objeto axios se consume la api
            axios.get(this.baseUrl + 'currency',
                { headers })
                // se valida la respuesta de la api
                .then((response) => {
                    var error = response.data.error
                    if (error) {
                        // si retorna un error este se muestra como una alerta
                        alert(response.data.message)
                    } else {
                        // si se consume correctamente, se asignan los datos obtenidos a la variable currencyA
                        this.currencyA = response.data.data.currency;
                    }
                });
        },
        // se crea funcion la cual consume la api currency
        getAssets() {
            const headers = {
                'Content-Type': 'text/plain'
            };
            // por medio del objeto axios se consume la api
            axios.get(this.baseUrl + 'assets',
                { headers })
                // se valida la respuesta de la api
                .then((response) => {
                    var error = response.data.error
                    if (error) {
                        // si retorna un error este se muestra como una alerta
                        alert(response.data.message)
                    } else {
                        // si se consume correctamente, se asignan los datos obtenidos a la variable assetsA
                        this.assetsA = response.data.data.assets;
                    }
                });
        },
        // se crea funcion la cual consume la api operation
        getOperations() {
            const headers = {
                'Content-Type': 'text/plain'
            };
            // por medio del objeto axios se consume la api
            axios.get(this.baseUrl + 'operation',
                { headers })
                // se valida la respuesta de la api
                .then((response) => {
                    var error = response.data.error
                    if (error) {
                        // si retorna un error este se muestra como una alerta
                        alert(response.data.message)
                    } else {
                        // si se consume correctamente, se asignan los datos obtenidos a la variable operationsA
                        this.operationsA = response.data.data.operations;
                    }
                });
        },
        // se crea funcion la cual consume la api operatio
        addEvent() {
            // se valida que se envíen los datos necesarios para el correcto funcionamiento de la api
            if (!this.assets || !this.description || !this.currency ||
                !this.endDate || !this.endTime || !this.startDate || !this.startTime ||
                !this.budget || !this.operation_id) {
                    // en caso de que no, se generará una alerta informando del error
                alert("Debe diligenciar todos los campos")
            } else {
                const headers = {
                    'Content-Type': 'text/plain'
                };
                // por medio del objeto axios se consume la api, y se envían los datos como cuerpo de la solicitud
                axios
                    .post(this.baseUrl + 'event', {
                        assets: this.assets,
                        description: this.description,
                        currency: this.currency,
                        startDate: this.startDate,
                        startTime: this.startTime,
                        endDate: this.endDate,
                        endTime: this.endTime,
                        token: this.token_auth,
                        budget: this.budget,
                        operation_id: this.operation_id
                    }, { headers })
                    // se valida la respuesta de la api
                    .then((response) => {
                        var error = response.data.error
                        if (error) {
                             // en caso de que no, se generará una alerta informando del error
                            alert(response.data.message)
                        } else {
                            // si la api se consume correctamente, redirige al usuario hacia otra vista
                            location.href = "http://localhost:8080/#/getEvents";
                        }
                    });
            }
        }
    },
    mounted() {
        // se ejecuta la función durante el montaje de la vista
        this.auth();
    },
}
</script>