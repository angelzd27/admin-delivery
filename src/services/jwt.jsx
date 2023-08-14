import { useJwt } from 'react-jwt'

export const JWT_YUMMY = localStorage.getItem('JWT_YUMMY') ? localStorage.getItem('JWT_YUMMY') : ''

export const Is_Expired_JWT = async () => {
    const { isExpired } = useJwt(JWT_YUMMY)

    return isExpired
}

export const Data_JWT = async () => {
    const { decodedToken } = useJwt(JWT_YUMMY)

    return decodedToken
}

export const Delete_JWT = () => {
    localStorage.removeItem('JWT_YUMMY')
}