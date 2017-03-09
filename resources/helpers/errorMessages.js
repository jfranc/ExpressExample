exports.lineOfCode= function() {
    var error= new Error().stack;
    var indexOfLine= error.indexOf("at Query._callback (");

    return error.substring(indexOfLine, error.indexOf(")", indexOfLine));
};

exports.msgs= {
    authUser: {code: 0, description: "Error al autenticarse el usuario."},
    registerUser: {code: 1, description: "Error al registrarse el usuario."},
    duplicateUser: {code: 2, description: "Usuario duplicado."},
    listUser: {code: 3, description: "Error al dar la lista de usuarios."},
    expiredUser: {code: 4, description: "Error la sesión del usuario ha expirado."},
    invalidTokenUser: {code: 5, description: "Error token inválido del usuario."}
};