import { isExpired, decodeToken } from 'react-jwt'

export function setJWT(token) {
    localStorage.setItem('JWT_YUMMT', token)
}

export function getJWT() {
    if (localStorage.getItem('JWT_YUMMT'))
        return localStorage.getItem('JWT_YUMMT')

    return ''
}

export function removeJWT() {
    localStorage.removeItem('JWT_YUMMT')
}

export function expiredJWT() {
    const expired = isExpired(getJWT())

    return expired
}

export function decodedJWT() {
    const decoded = decodeToken(getJWT())

    return decoded
}

export function decodedDataJWT() {
    const decoded = decodeToken(getJWT())
    const data = decoded.data

    return data
}