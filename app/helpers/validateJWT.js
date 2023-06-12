
export default function validateJWT() {

    const token = sessionStorage.getItem("token")

    if (token) {
        const [header, payload, signature] = token.split('.');

        const decodedPayload = JSON.parse(atob(payload));
        const currentTime = Math.floor(Date.now() / 1000); // Obtiene la fecha actual en segundos

        if (decodedPayload.exp && decodedPayload.exp >= currentTime) {
            console.log('El token es válido.');
            return true;
        } else {
            console.log('El token ha expirado.');
            return false;
        }

    } else {
        return false;
    }

}