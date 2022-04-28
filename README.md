# Desarrollo de Aplicaciones Web Multiplatafor

# Proyecto Final - Sistema de riego automatizado

## Paso a paso para estructurar el Proyecto

### Estructura general

1. Del `docker-compose` utilizado en el proyecto de `DAW`, se borra unicamente el contenedor del compilador para *TypeScript*. El resto se utiliza nuevamente en este proyecto.


### Backend

2. De la carpeta `backend` utilizada en el proyecto mencionado anteriormente, utilizamos el archivo `mysql-connector.json` donde en el campo `database` en el metodo `createConnection` pasa a llamarse `DAM`.

3. Luego, el modelo de datos `estructuraTPDAM-phpmyadmin.sql` creado por Brian y renombrada a `dam-structure.sql`, se coloca en la ruta `./db/dumps`, tal que al momento de lanzar el contenedor de *MySQL Server*, pueda crearse la base de datos.

Se corrobora en el servicio `mysql-server` que al momento de buscar entre los volumenes (persistencia de la informaci√≥n), realiza la lectura desde la ruta `db/dumps`.

4. El resuelto de *node* tiene la mayoria de las cosas correspondientes al desarrollo del *backend*.

5. Se debe modificar el puerto en `configMysql` al 3306 de modo que coindicida con el campo `PMA_PORT` definido en el `docker-compose` para servir `mysql-admin`.    

```
var configMysql = {
    connectionLimit: 10,
    host: 'mysql-server',
    port: 3306,
    user: 'root',
    password: 'userpass',
    database: 'DAM'
}
```

6. A partir del enunciado y el `resueltoNode` de las ejercitaciones propuestas, se generan las siguientes consultas y escrituras en la base de datos. Cada consulta/escritura se engloba dentro de 
la tabla de interes.

* `backend/routes/medicion`: 

  1. Brindar la ultima medicion de un dispositivo segun su Id.

  2. Brindar todas las mediciones provistas por un dispositivo.

  3. Insertar en la tabla Mediciones un nuevo registro con el nuevo valor sii se cierra la electrovalvula.


* `backend/routes/dispositivo`:

  4. Obtener el listado de dispositivos del sistema de riego


* `backend/routes/log`:

  5. Logear la informacion de apertura/cierre de la electrovalvula en la tabla *Log_Riegos*.
  
  6. Insertar la informacion de apertura/cierre de la electrovalvula en la tabla *Log_Riegos*.
 
### Frontend

7. Del documento [Ejercicios Angular-ionic](https://github.com/nandroidj/CEIoT/blob/main/02b/02-multiplatform-development/clases/dam/Ejercicios/Ejercicios%20Ionic.pdf) se realizan los pasos para crear el proyecto en `ionic`.

  1. Se agrega la dependencia de `ionic` a nivel general del ordenador a traves del gestor `yarn` con el comando: `yarn global add @ionic/cli`

  2. Se crea el proyecto con `ionic start irrigation-system` donde se selecciona a *Angular* como *framework* y luego la plantilla en blanco (*blank project template*)

  3. Se lanza el comando `yarn install` tal que se instalan todas las dependencias listadas en el `package.json` de manera local al proyecto. 

  4. Se migran los servicios y el modelo creados en la [ejercitacion de Angular-Ionic](https://github.com/nandroidj/CEIoT/blob/main/02b/02-multiplatform-development/clases/dam/Ejercicios/Ejercicios%20Angular%20-DAM.pdf).

  5. Se crea un la pagina `dispositivos` bajo el comando `ionic generate page dispositivos` que genera todos los archivos tal que se pueda interacion con la *page* `home`. 

  6. Se agrega la ruta `/dispositivos/:id/:idEl` para poder agregar la logica del `onClick` desde el listado de dispositivos a la visualizacion del dispositivo seleccionado con la propiedad `routerLink="/dispositivo/{{}dispositivo.dispositivoId}"` en el archivo `home.page.html`.

  7. A partir de la clase `Dispositivo`, del `resueltoAngular`, creado en el modulo `model`, se procede a modelar `Logs` y `Medicion`.

  8. De igual manera para `services`, se refactoriza el archivo `dispositivo.services.ts` tal que unicamente contenga los `getters` y se incluyen los siguientes archivos:

    * `dispositivo.service.ts`: se definen los metodos para obtener un dispositivo a partir de su identificador y el listado de todos los dispositivos que se encuentran en el sistema de riego.

    * `log.service.ts`: se declaran los metodos para obtener el logueo de la informacion de una electrovalvula a partir de su identificador y el `setter` para insertar un nuevo `log`.

    * `medicion.service.ts`: al igual que en los servicios mencionados previamente, se define el `getter` para leer la ultima medicion de un dispositivo a paritr de su id, el listado de mediciones a partir del `dispositivoId` y por ultimo, el metodo para insertar una nueva medicion.















50. Una vez que est√© listo el back, se debe crear una nueva carpeta llamada `frontend` que contenga el proyecto en *ionic*. 

- En el resuelto de *ionic* se pueden sacar varias cosas. 

- En el documento [Ejercicios Angular-ionic](https://github.com/nandroidj/CEIoT/blob/main/02b/02-multiplatform-development/clases/dam/Ejercicios/Ejercicios%20Ionic.pdf) se encuentran disponibles todos los pasos para crear un proyecto en ionic de cero.

- Para poder utilizar ionic desde el navegador web se debe utilizar el comando `ionic serve`



m
