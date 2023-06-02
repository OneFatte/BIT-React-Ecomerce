import React, { useState } from 'react';
import { useContext } from "react";
import { loginContext } from "../Context/loginContext";
import { useNavigate } from "react-router-dom";
import "./LoginUsuario.css"

const LoginUsuario = () => {
  // const { cart } = useContext(dataContext);
  const [user, setUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");

  const { usuario, cambiarEstado } = useContext(loginContext);

  const navegate = useNavigate();

  function capturar() {
    fetch("https://6477fdae362560649a2d1ba2.mockapi.io/users")
      .then(res => res.json())
      .then(res => validar(res))
  }

  function validar(res) {
    const persona = res.filter(x => (x.usuario == user && x.pass == contraseña))[0]
    if (persona != undefined) {
      cambiarEstado({
        "usuario": persona.usuario,
        "admin": persona.admin,
        "activo": true,
      })

      console.log(usuario)
      navegate("/")
    } else {
      alert("Usuario o contraseña incorrectos.")
    }

  }

  return (
    <>
      <div className='contenedor'>
        <form className='formulario'>

          <div>
            <span className='texto'>Usuario</span>
            <input
              className='inputs'
              type="text"
              value={user}
              onChange={(e) => setUsuario(e.target.value)}
            />
          </div>

          <div>
            <span className='texto'>Contraseña</span>
            <input
              className='inputs'
              type="password"
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
            />
          </div>

          <div>
            <button type="button" onClick={capturar} className='boton'>Enviar</button>
          </div>
        </form>
      </div>

    </>
  );
}

export default LoginUsuario;
