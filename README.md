<a href="https://www.gotoiot.com/">
    <img src="doc/gotoiot-logo.png" alt="logo" title="Goto IoT" align="right" width="60" height="60" />
</a>

Sistema de riego automatizado - Desarrollo de aplicaciones multiplataforma
=======================

Este proyecto es una aplicación web fullstack que se ejecuta sobre el ecosistema `Docker`. Está compuesta por un servicio en `NodeJS` que permite ejecutar código en el backend y al mismo tiempo disponibilizar el código del cliente web para interactar con el servicio. Además tiene una `base de datos` MySQL que puede interactuar con el backend para guardar y consultar datos, y de manera adicional trae un `administrador` de base de datos para poder administrar la base en caso que lo necesites.

Por otro lado, el frontend se desarrolla en el lenguaje `TypeScript` con los *frameworks* `Angular` y `Ionic`.


La aplicación que viene con este proyecto se encarga de crea y poblar las tablas llamadas: `Dispositivos`, `Electrovalvulas`, `Log_Riegos` y `Mediciones` en la base de datos, y la idea es ir desarrollando el código de backend y frontend que permita visualizar los dispositivos y controlar las electrovalvulas desde el navegador.  

En esta imagen se puede ver el panel de control con la información de cada dispositivo. 

![devicePanel](https://github.com/nandroidj/dam-automated-irrigation-system/blob/main/docs/screenshots/dam_01_control_panel.png)

## Comenzando

Esta sección es una guía con los pasos escenciales para que poner en marcha la aplicación.

<details><summary><b>Mira los pasos necesarios</b></summary><br>

### Instalar las dependencias del backend

Para correr este proyecto es necesario que instales `Docker` y `Docker Compose`. 

En [este artículo](https://www.gotoiot.com/pages/articles/docker_installation_linux/) publicado en nuestra web están los detalles para instalar Docker y Docker Compose en una m√°quina Linux. Si quer√©s instalar ambas herramientas en una Raspberry Pi podés seguir [este artículo](https://www.gotoiot.com/pages/articles/rpi_docker_installation) de nuestra web que te muestra todos los pasos necesarios.

En caso que quieras instalar las herramientas en otra plataforma o tengas alg√∫n incoveniente, podes leer la documentaci√≥n oficial de [Docker](https://docs.docker.com/get-docker/) y tambi√©n la de [Docker Compose](https://docs.docker.com/compose/install/).


### Instalar las dependencias del frontend

Para correr el código del cliente es necesario contar con `Node.js`, `Angular` y `Ionic`.

Node se instala utilizando el comando `brew install node`.

Una vez instalado Node, también instala el manejador de paquetes npm. Mediante esta utilidad, se debe instalar Angular ejecutando el siguiente comando: `npm install -g @angular/cli`.

Finalmente, para instalar Ionic, se procede de manera similar, usando este comando:

`npm install -g @ionic/cli`


### Descargar el código

Para la descarga del código, es necesario realizar una clonación del repositorio: 

```
git clone https://github.com/nandroidj/dam-automated-irrigation-system 
```

>En caso que no tengas una cuenta en Github podes clonar directamente este repo.

### Ejecutar la aplicación


#### Backend 

Para ejecutar la aplicación tenés que digirte a la carpeta **backend** y realizar los siguientes pasos:

1. Lanzar el comando `source .env` de como que capture las variables de entorno propuestas para los servicios docker mencionados anteriormente.

2. Correr el comando `docker-compose up`, tal que en una primera instancia descargue las imágenes Docker de node, de la base datos y del admin de la DB, y luego ponerlas en funcionamiento. 

#### Frontend

Luego, es necesario estar ubicado en la ruta `~/frontend/dam-automated-irrigation-system-frontend/automated-irrigation-system` y escribir el comando `ionic serve` donde el framework `Ionic` se ocupa de exponer el cliente en un puerto. Por lo general, en el 8100 salvo que se encuentre ocupado.

Si pudiste acceder al cliente web y al administrador significa que la aplicación se encuentra corriendo bien. 

> Si te aparece un error la primera vez que corres la app, detené el proceso y volvé a iniciarlo. Esto es debido a que el backend espera que la DB esté creada al iniciar, y en la primera ejecución puede no alcanzar a crearse. A partir de la segunda vez el problema queda solucionado.

</details>


## Configuraciones de funcionamiento

Al crearse la aplicación se ejecutan los contenedores de Docker de cada servicio, se crea la base de datos y sus tablas. A continuación se puede encontrar como fue configurada la estructura del backend. 

<details><summary><b>Lee c√≥mo configurar la aplicación</b></summary><br>

### Configuración de la DB

1. Del `docker-compose` utilizado en el proyecto de `DAW`, se borra unicamente el contenedor del compilador para *TypeScript*. El resto se utiliza nuevamente en este proyecto.

2. De la carpeta `backend` utilizada en el proyecto mencionado anteriormente, utilizamos el archivo `mysql-connector.json` donde en el campo `database` en el metodo `createConnection` pasa a llamarse `DAM`.

3. Luego, el modelo de datos `estructuraTPDAM-phpmyadmin.sql` creado por Brian y renombrada a `dam-structure.sql`, se coloca en la ruta `./db/dumps`, tal que al momento de lanzar el contenedor de *MySQL Server*, pueda crearse la base de datos.

Se corrobora en el servicio `mysql-server` que al momento de buscar entre los volumenes (persistencia de la informaci‚àö‚â•n), realiza la lectura desde la ruta `db/dumps`.

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



Para acceder PHPMyAdmin hay que ingresar en la URL [localhost:8001/](http://localhost:8001/). En el login del administrador, el usuario para acceder a la db es `root` y contraseña es la variable `MYSQL_ROOT_PASSWORD` del archivo `.env`.

Para el caso del servicio de NodeJS que se comunica con la DB es necesario obervar el archivo `src/backend/mysql-connector.js` que cuenta con los datos de acceso para ingresar a la base.

Si querés cambiar la contraseña, puertos, hostname u otras configuraciones de la DB; primero tenés que  modificar el servicio de la DB en el archivo `docker-compose.yml` y luego actualizar las configuraciones para acceder desde PHPMyAdmin y el servicio de NodeJS.


### Estructura de la DB

Al iniciar el servicio de la base de datos, si esta no está creada toma el archivo que se encuentra en `db/dumps/daw_structure.sql` para crear la base de datos automáticamente.

En ese archivo se encuentra el modelo de datos con las tablas que se comentarion anteriormente y la población de las mismas. Si quisieras cambiar algunas configuraciones es necesario modificar este archivo y crear nuevamente la base de datos para que se tomen en cuenta los cambios.

Es importante contemplar que la creación de la db y su posterior alteración necesita permisos de superusuario por lo que no vas a poder borrar el directorio con tu usuario de sistema, para eso tenés que hacerlo con permisos de administrador. En ese caso podés ejecutar el comando `sudo rm -r db/data` para borrar el directorio completo.

</details>


## Desarrollo y navegación del cliente

En esta sección se pueden ver los detalles del desarrollo y la navegación del cliente.

<details><summary><b>Mira los pasos del desarrollo de la aplicación</b></summary><br>

### Pasos para el desarrollo de la aplicación en Ionic

1. Del documento [Ejercicios Angular-ionic](https://github.com/nandroidj/CEIoT/blob/main/02b/02-multiplatform-development/clases/dam/Ejercicios/Ejercicios%20Ionic.pdf) se realizan los pasos para crear el proyecto en `ionic`.

2. Se agrega la dependencia de `ionic` a nivel general del ordenador a traves del gestor `yarn` con el comando: `yarn global add @ionic/cli`

3. Se crea el proyecto con `ionic start irrigation-system` donde se selecciona a *Angular* como *framework* y luego la plantilla en blanco (*blank project template*)

4. Se lanza el comando `yarn install` tal que se instalan todas las dependencias listadas en el `package.json` de manera local al proyecto. 

5. Se migran los servicios y el modelo creados en la [ejercitacion de Angular-Ionic](https://github.com/nandroidj/CEIoT/blob/main/02b/02-multiplatform-development/clases/dam/Ejercicios/Ejercicios%20Angular%20-DAM.pdf).

6. Se crea un la pagina `dispositivos` bajo el comando `ionic generate page dispositivos` que genera todos los archivos tal que se pueda interacion con la *page* `home`. 

7. Se agrega la ruta `/dispositivos/:id/:idEl` para poder agregar la logica del `onClick` desde el listado de dispositivos a la visualizacion del dispositivo seleccionado con la propiedad `routerLink="/dispositivo/{{}dispositivo.dispositivoId}"` en el archivo `home.page.html`.

8. A partir de la clase `Dispositivo`, del `resueltoAngular`, creado en el modulo `model`, se procede a modelar `Logs` y `Medicion`.

9. De igual manera para `services`, se refactoriza el archivo `dispositivo.services.ts` tal que unicamente contenga los `getters` y se incluyen los siguientes archivos:

    * `dispositivo.service.ts`: se definen los metodos para obtener un dispositivo a partir de su identificador y el listado de todos los dispositivos que se encuentran en el sistema de riego.

    * `log.service.ts`: se declaran los metodos para obtener el logueo de la informacion de una electrovalvula a partir de su identificador y el `setter` para insertar un nuevo `log`.

    * `medicion.service.ts`: al igual que en los servicios mencionados previamente, se define el `getter` para leer la ultima medicion de un dispositivo a paritr de su id, el listado de mediciones a partir del `dispositivoId` y por ultimo, el metodo para insertar una nueva medicion.


<details><summary><b>Mira la navegación de la aplicación</b></summary><br>

### Navegación de la aplicación

La aplicación ofrece la visualización de un listado de sensores de humedad que se encuentran distribuidos en diferentes sectores de un hogar. 

Cada sensor tiene asociado una electroválvula que cuenta con su estado llamado `apertura`. Se presenta la siguiente dualidad entre el campo `apertura` de la base de datos, tipado como un entero, y como es modelado en el cliente 

```
db -> cliente

0 -> abierta
1 -> cerrada
```

En primer lugar, se puede observar el listado de dispositivos con información del sensor que le fue asignado y en que punto del hogar se encuentra.

![panel](https://github.com/nandroidj/dam-automated-irrigation-system/blob/main/docs/screenshots/dam_01_control_panel.png)

Luego, al hacer click en cada dispositivo se puede observar el medidor de humedad con su valor actual y los botones para abrir o cerrar la electroválvula, ver la tabla de mediciones y ver la tabla de riegos.

![dispositivo](https://github.com/nandroidj/dam-automated-irrigation-system/blob/main/docs/screenshots/dam_02_device_default.png)

Por último se presentan la tabla de mediciones, que se realiza en cada cierre de la electroválvula, y el historial de riegos que cuenta con la información de cada apertura y cierre de la electroválvula.


![mediciones](https://github.com/nandroidj/dam-automated-irrigation-system/blob/main/docs/screenshots/dam_04_measurements_table.png)


![LogRiegos](https://github.com/nandroidj/dam-automated-irrigation-system/blob/main/docs/screenshots/dam_05_log_table.png)


## Tecnologías utilizadas

En esta sección se puede ver las tecnologías más importantes utilizadas.

<details><summary><b>Mira la lista completa de tecnologías</b></summary><br>

* [Docker](https://www.docker.com/) - Ecosistema que permite la ejecuci√≥n de contenedores de software.
* [Docker Compose](https://docs.docker.com/compose/) - Herramienta que permite administrar múltiples contenedores de Docker.
* [Node JS](https://nodejs.org/es/) - Motor de ejecuci√≥n de c√≥digo JavaScript en backend.
* [MySQL](https://www.mysql.com/) - Base de datos para consultar y almacenar datos.
* [PHPMyAdmin](https://www.phpmyadmin.net/) - Administrador web de base de datos.
* [TypeScript](https://www.typescriptlang.org/) - Superset de JavaScript tipado y con clases.
* [Ionic](https://ionicframework.com/) - Framework open-source destinado al desarrollo de aplicaciones multiplataforma.
* [Angular](https://angular.io/) - Framework para desarrollo de aplicaciones *single-page*.
</details>

## Autores

Las colaboraciones principales fueron realizadas por:

* **[Brian Ducca](https://github.com/brianducca)**: Ayuda para conectar el backend a la base de datos, puesta a punto de imagen de Docker.

## Licencia

Este proyecto está bajo Licencia ([MIT](https://choosealicense.com/licenses/mit/)). Podés ver el archivo [LICENSE.md](LICENSE.md) para más detalles sobre el uso de este material.


