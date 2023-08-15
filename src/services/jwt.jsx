import { useJwt } from 'react-jwt'

export const JWT_YUMMY = localStorage.getItem('JWT_YUMMY') ? localStorage.getItem('JWT_YUMMY') : ''

export const Expired_JWT = () => {
    const { isExpired } = useJwt(JWT_YUMMY)

    return isExpired
}

export const Decoded_JWT = () => {
    const { decodedToken } = useJwt(JWT_YUMMY)

    return decodedToken
}

export const Set_JWT = (token) => {
    localStorage.setItem('JWT_YUMMY', token)
}

export const Delete_JWT = () => {
    localStorage.removeItem('JWT_YUMMY')
} 