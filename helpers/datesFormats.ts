
export function formatDate(f:string) {
    if (f) {
        var sp = f.split(' ');
        return sp[0];
    } else {
        return "";
    }
}