export const userStates = {
    '1': 'Active',
    '2': 'Inactive',
    '3': 'Pending',
    '4': 'Blocked'
  } as { [key: string]: string};
  
export const ROLES = {
    '1': 'Administrador',
    '2': 'Usuario',
    '3': 'Cuenta Demo',
} as { [key: string]: string};

export function getROLE(value:String): string | undefined {
  for (const key in ROLES) {
    if (ROLES.hasOwnProperty(key) && ROLES[key] === value) {
      return key;
    }
  }
  return undefined;
}