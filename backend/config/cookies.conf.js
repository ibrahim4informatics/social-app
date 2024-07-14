const authConf = {
    refresh: { sameSite: 'strict', httpOnly: true, maxAge: 1000 * 3600 * 24 * 7 },
    access: { sameSite: 'strict', httpOnly: true, maxAge: 1000 * 60 * 5 }
}

export {
    authConf
}
