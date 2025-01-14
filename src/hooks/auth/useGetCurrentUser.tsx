import jwtDecode from 'jwt-decode'
import React, { useState } from 'react'

const useGetCurrentUser = () => {
    const [decodedToken, setDecodeToken] = useState(() => {
        const token = localStorage.getItem('token')
        if(!token) throw new Error("Không thể lấy được token") 
        return jwtDecode(token)
    })
    return decodedToken
}

export default useGetCurrentUser