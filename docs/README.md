# EndPoints

## Usuarios

> [!NOTE]
> Parametros posibles a la hora de buscar: mail

- Url Base: usuarios
- Get:
  - All: usuarios
  - By id: usuarios/id
- Post: usuarios
- Patch: usuarios/id
- Delete: usuarios/id

## Inscripciones

> [!NOTE]
> Parametros posibles a la hora de buscar: idUsuario, idPlan, idSede, fechaBaja, cuota

- Url Base: inscripciones
- Get:
  - All: inscripciones
  - By id: inscripciones/id
  - By idUsuario: inscripciones?idUsuario=idUsuario
  - By idPlan: inscripciones?idPlan=idPlan
  - By idSede: inscripciones?idSede=idSede
  - By idUsuario and fechaBaja: inscripciones?idUsuario=idUsuario&fechaBaja=null
  - By fechaBaja: inscripciones?fechaBaja=null
  - By cuota: inscripciones?cuota=true
- Post: inscripciones
- Patch: inscripciones/id
> [!IMPORTANT]
> Solo se puede modificar la fecha de baja. Cuando el usuario se cambia de plan, no se elimina la inscripción ni se modifica el plan de esta, sino que se crea una nueva una vez la antigua esté dada de baja.
- Delete: inscripciones/id

## Planes

- Url Base: planes
- Get:
  - All: planes
  - By id: planes/id
- Post: planes
- Patch: planes/id
- Delete: planes/id

## Provincias

- Url Base: provincias
- Get:
  - All: provincias
  - By id: provincias/id
- Post: provincias
- Patch: provincias/id
- Delete: provincias/id

## Localidades

- Url Base: localidades
- Get:
  - All: localidades
  - By id: localidades/id
- Post: localidades
- Patch: localidades/id
- Delete: localidades/id

## Sedes

- Url Base: sedes
- Get:
  - All: sedes
  - By id: sedes/id
- Post: sedes
- Patch: sedes/id
- Delete: sedes/id

## Productos

> [!NOTE]
> Parametros posibles a la hora de buscar: ord

- Url Base: productos
- Get:
  - All: productos
  - By id: productos/id
  - Order by ascending: productos?ord=ASD
  - Order by descending: productos?ord=DESC
- Post: productos
> [!IMPORTANT]
> La imagen no se envía como URL sino que se tiene que enviar la imagen. Además, no tiene formato JSON sino que form-data.
- Patch: productos/id
- Delete: productos/id

## Actividades

> [!NOTE]
> Parametros posibles a la hora de buscar: nombre

- Url Base: actividades
- Get:
  - All: actividades
  - By id: actividades/id
- Post: actividades
- Patch: actividades/id
- Delete: actividades/id

## Plan-Actividades

> [!NOTE]
> Parametros posibles a la hora de buscar: idPlan, idActividad

- Url Base: plan-actividades
- Get:
  - All: plan-actividades
  - By id: plan-actividades/id
- Post: plan-actividades
- Patch: plan-actividades/id
- Delete: plan-actividades/id

## Sede-Actividades

> [!NOTE]
> Parametros posibles a la hora de buscar: idSede, idActividad

- Url Base: sede-actividades
- Get:
  - All: sede-actividades
  - By id: sede-actividades/id
- Post: sede-actividades
- Patch: sede-actividades/id
- Delete: sede-actividades/id

## Horarios

> [!NOTE]
> Parametros posibles a la hora de buscar: idsedeAct

- Url Base: horarios
- Get:
  - All: horarios
  - By id: horarios/id
- Post: horarios
- Patch: horarios/id
- Delete: horarios/id

## Entrenadores

- Url Base: entrenadores
- Get:
  - All: entrenadores
  - By id: entrenadores/id
- Post: entrenadores
- Patch: entrenadores/id
- Delete: entrenadores/id

## Sede-Act-Entrenadores

> [!NOTE]
> Parametros posibles a la hora de buscar: idSedeAct, idEntrenador

- Url Base: sede-act-entrenadores
- Get:
  - All: sede-act-entrenadores
  - By id: sede-act-entrenadores/id
- Post: sede-act-entrenadores
- Patch: sede-act-entrenadores/id
- Delete: sede-act-entrenadores/id

## Cuota

> [!NOTE]
> Parametros posibles a la hora de buscar: idInscripcion, ultima, ultimas

- Url Base: cuota
- Get:
  - All: cuota
  - By id: cuota/id
  - By idInscripcion: cuota?idInscripcion=idInscripcion
  - By ultima: cuota?ultima=true
  - By idInscripcion and ultima: cuota?idInscripcion=idInscripcion&ultima=true
  - By ultimas: cuota?ultimas=true
- Get Vencimiento: cuota/vencimiento/id
- Post: 
  - Create: cuota/crear
  - Pagar: cuota
- Patch: cuotas/id
- Delete: cuota/id

## Check-In

- Url Base: check-in
- Get:
  - All: check-in
  - By id: check-in/id
  - Access Control: check-in/accessControl/id
- Post: check-in
- Patch: check-in/id
- Delete: check-in/id