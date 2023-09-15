# suplosFront
FrontEnd prueba técnica

Requesitos: nodejs, npm, vue 3.3.4 
Clone el proyecto, en lo posible, en la carpeta hdocs de la carpeta xampp abra el terminal  ubicado dentro del proyecto e
instale las dependencias :
axios: npm install axios
export-from-json: npm i --save export-from-json
FileSaver: npm install file-saver --save
read-excel-file: npm install read-excel-file --save
vue-axios: npm install --save axios vue-axios
vue-router: npm install vue-router@4

una vez instaladas estas dependencias, inice el servidor con el comando: npm run serv 
este le habilitará la url http://localhost:8080/
allí va a encontrar un formulario que le solicitará sus credenciales de acceso, si las tiene, ingrese, sino, 
en la parte inferior del formulario encontrará el letrero: Create an account 
el cual lo redirecciona hacia un formulario en el cual podrá crear su usuario, le solicitarán correo, nombre, apellido y contraseña
dándole click el botón register se ejecutará la api de creación de usuario, si hay algún error, le retornará una alerta con el error 
sino, lo redireccionará hacia otra página que le informará que su usuario ha sido creado y aparecerá un botón el cual lo redireccionará 
hacia el login nuevamente, ingrese sus credenciales, en caso de que el login sea incorrecto, le saldrá una alerta la cual le indicará que el usuario o contraseña son incorrectos, en caso de que sea correcto, lo redireccionará hacia un vista 
en donde usted va a encontrar una tabla con los eventos creados sean uno o 100(no existe paginado)
en la parte inferior de la tabla, encontrará dos botones, uno para crear un nuevo evento, al darle click, lo redireccionará hacia una vista la cual contiene un formulario con los datos requeridos para crear un nuevo evento, en la parte inferior encontrará dos botones, 
uno para crear un nuevo evento, el cual si no ha diligenciado todos los campos le retornará una alerta informándole que debe diligenciar todos los campos, en caso que de todo esté en orden, se creará un nuevo evento y lo redireccionará nuevamente hacia la vista con la tabla con todos los eventos, allí encontrará en la parte inferior de la tabla el evento que usted acaba de crear, en la vista anterior(formulario de creación de evento) hay un segundo botón que dice cancelar, al darle click, le redireccionará nuevamente hacia la vista con la tabla con los eventos creado, al lado del botón para crear eventos, encontrará un segundo botón el cual  dice descargar, al darle click, se descargará un archivo con todos los eventos hay en la tabla, por último, en parte superior de la tabla, encontrará un botón que dice logout, al darle click, se desloguará y le enviará nuevamente hacia la vista del login.
