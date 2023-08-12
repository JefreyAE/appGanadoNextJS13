
export function formatDate(f:string) {
    if (f) {
        var sp = f.split(' ');
        return sp[0];
    } else {
        return "";
    }
}

export function getTimeElapsed(created_at: string) {
    const createdAtDate = new Date(created_at);
    const now = new Date();
    const timeDiff = now.getTime() - createdAtDate.getTime();
    
    const minutes = Math.floor(timeDiff / (1000 * 60));
    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 7));
    const months = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 30));
    
    if (months > 0) {
        return `${months} ${months === 1 ? 'mes' : 'meses'}`;
    } else if (weeks > 0) {
        return `${weeks} ${weeks === 1 ? 'semana' : 'semanas'}`;
    } else if (days > 0) {
        return `${days} ${days === 1 ? 'día' : 'días'} `;
    } else if (hours > 0) {
        return `${hours} ${hours === 1 ? 'hora' : 'horas'} `;
    } else {
        return `${minutes} ${minutes === 1 ? 'minuto' : 'minutos'} `;
    }
}