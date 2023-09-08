export declare enum HasuraAllowedRoles {
  admin = 'admin',
  user = 'user',
}

export type HasuraAllowedRolesString = keyof typeof HasuraAllowedRoles

export interface JwtHasuraClaims {
  'x-hasura-allowed-roles': HasuraAllowedRolesString[]
  'x-hasura-default-role': HasuraAllowedRolesString
  'x-hasura-user-id': string
  'x-hasura-role': HasuraAllowedRolesString
}

export interface JwtPayload {
  'https://hasura.io/jwt/claims': JwtHasuraClaims
  sub: string
  iat: number
}
