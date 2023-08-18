
export const herdListOptions = [
    { description: "Listado de hatos", url: "/herds/index", icon: 'list'},
    { description: "Registrar hato", url: "/herds/register", icon: 'create'},
];
export const animalListOptions = [
    { description: "Listado de animales activos", url: "/animals/index", icon: 'list' },
    { description: "Listado de animales fallecidos", url: "/animals/dead", icon: 'list' },
    { description: "Listado de todos los animales registrados", url: "/animals/all", icon: 'list' },
    { description: "Registrar un nacimiento", url: "/animals/register", icon: 'create'},
    { description: "Buscar un animal", url: "/animals/search", icon: 'search' },
];
export const purchaseListOptions = [
    { description: "Listado animales comprados", url: "/purchases/index/", icon: 'list' },
    { description: "Registrar compras", url: "/purchases/register/", icon: 'create' },
    { description: "Consultar compras por fecha", url: "/purchases/search/", icon: 'search' },
];
export const salesListOptions = [
    { description: "Listado animales vendidos", url: "/sales/index/", icon: 'list' },
    { description: "Registrar ventas", url: "/sales/register/", icon: 'create' },
    { description: "Consultar ventas por fecha", url: "/sales/search/", icon: 'search' },
];
export const incidentListOptions = [
    { description: "Listado de incidentes", url: "/incidents/index/", icon: 'list' },
    { description: "Registrar un incidente", url: "/incidents/register/", icon: 'create' },
];
export  const injectablesListOptions = [
    { description: "Listado inyectables aplicados", url: "/injectables/index/", icon: 'list' },
    { description: "Registrar aplicación de inyectable", url: "/injectables/register/", icon: 'create' },
];
export  const notificationsListOptions = [
    { description: "Listado de notificaciones activas", url: "/notifications/index/", icon: 'list' },
    { description: "Listado de notificaciones vistas", url: "/notifications/checked/", icon: 'list' },
    { description: "Listado de todas las notificaciones", url: "/notifications/all/", icon: 'list' },
];
export const statisticsListOptions = [
    { description: "Estadísticas globales", url: "/statistics/index", icon: 'chart' },
    { description: "Estadísticas de subastas", url: "/statistics/auctions", icon: 'chart' },
];