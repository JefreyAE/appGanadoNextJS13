
export const herdListOptions = [
    { description: "Listado de hatos", url: "/herds/index" },
    { description: "Registrar hato", url: "/herds/register" },
];
export const animalListOptions = [
    { description: "Listado de animales activos", url: "/animals/index" },
    { description: "Listado de animales fallecidos", url: "/animals/dead" },
    { description: "Listado de todos los animales registrados", url: "/animals/all" },
    { description: "Registrar un nacimiento", url: "/animals/register" },
    { description: "Buscar un animal", url: "/animals/search" },
];
export const purchaseListOptions = [
    { description: "Listado animales comprados", url: "/purchases/index/" },
    { description: "Registrar compras", url: "/purchases/register/" },
    { description: "Consultar compras por fecha", url: "/purchases/search/" },
];
export const salesListOptions = [
    { description: "Listado animales vendidos", url: "/sales/index/" },
    { description: "Registrar ventas", url: "/sales/register/" },
    { description: "Consultar ventas por fecha", url: "/sales/search/" },
];
export const incidentListOptions = [
    { description: "Listado de incidentes", url: "/incidents/index/" },
    { description: "Registrar un incidente", url: "/incidents/register/" },
];
export  const injectablesListOptions = [
    { description: "Listado inyectables aplicados", url: "/injectables/index/" },
    { description: "Registrar aplicación de inyectable", url: "/injectables/register/" },
];
export  const notificationsListOptions = [
    { description: "Listado de notificaciones activas", url: "/notifications/index/" },
    { description: "Listado de notificaciones vistas", url: "/notifications/checked/" },
    { description: "Listado de todas las notificaciones", url: "/notifications/all/" },
];
export const statisticsListOptions = [
    { description: "Estadísticas globales", url: "/statistics/index" },
    { description: "Estadísticas de subastas", url: "/statistics/auctions" },
];