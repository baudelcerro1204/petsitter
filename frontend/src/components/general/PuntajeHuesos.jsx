import React from "react";
import EstrellaLlena from "../../assets/estrellaLlena.svg";
import EstrellaVacia from "../../assets/estrellaVacia.svg";
import GarraLlena from "../../assets/garrasLlena.svg";
import GarraVacia from "../../assets/garrasVacia.svg";
import HuesoLleno from "../../assets/huesoLleno.svg";
import HuesoVacio from "../../assets/huesoVacio.svg";

export const PuntajeHuesos = ({ puntaje, mascotas }) => {
  const totalHuesos = 5; // Total de huesos a mostrar
  const huesosLlenos = puntaje; // Número de huesos llenos basado en el puntaje
  const huesosVacios = totalHuesos - puntaje; // Número de huesos vacíos

  let iconoLleno, iconoVacio;

  if (mascotas.length >= 2) {
    iconoLleno = EstrellaLlena;
    iconoVacio = EstrellaVacia;
  } else if (mascotas.length === 1) {
    switch (mascotas[0]) {
      case "Cat":
        iconoLleno = GarraLlena;
        iconoVacio = GarraVacia;
        break;
      case "Dog":
        iconoLleno = HuesoLleno;
        iconoVacio = HuesoVacio;
        break;
      default:
        iconoLleno = EstrellaLlena;
        iconoVacio = EstrellaVacia;
    }
  } else {
    // En caso de que no haya mascotas, usar estrellas por defecto
    iconoLleno = EstrellaLlena;
    iconoVacio = EstrellaVacia;
  }

  return (
    <div style={{flex:1}}>
      {[...Array(huesosLlenos)].map((_, index) => (
        <img
          key={`lleno-${index}`}
          src={iconoLleno}
          alt="Icono Lleno"
          style={{
            
            marginRight:
              index === huesosLlenos - 1 && huesosVacios > 0
                ? "3px"
                : index === huesosLlenos - 1
                ? 0
                : "3px",
          }}
        />
      ))}
      {[...Array(huesosVacios)].map((_, index) => (
        <img
          key={`vacio-${index}`}
          src={iconoVacio}
          alt="Icono Vacío"
          style={{ marginRight: index === huesosVacios - 1 ? 0 : "3px" }}
        />
      ))}
    </div>
  );
};
