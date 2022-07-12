# Next.js OpenJira App

Para correr localmente, se necesita la base de datos

```
docker-compose up -d
```


## Configurar las variables de entorno

Renombrar el archivo __.env.example__ a __.env__


* MongoDB URL local:

```
mongodb://localhost:27018/entriesdb
```

* Instalar dependencias y arrancar Next;

```
yarn add & yarn dev
```

## Llenar la base de datos con info de prueba

Data localizada en __/database/seed-data.ts__

Llamar:
```
http://localhost:3000/api/seed 
```