export function validar(input) {
    let errors = {};
    if (!input.name) {
      errors.name = "El nombre es necesario";
    } else if (
      !/^[A-Za-z0-9\s]*$/.test(input.name) || // permite únicamente caracteres alfabéticos en mayúsculas o minúsculas, dígitos y espacios. 
      typeof input.name !== "string"
    ) {
      errors.name = "naaaa... ese nombre no es válido";
    }
  
    if (!input.description) {
      errors.description = "ponete algo en la descripción";
    }
  
    if (!input.fechaLanzamiento) {
      errors.fechaLanzamiento = "ponele fecha también";
    // } else if (!/^\d{4}([\-/.])(0?[1-9]|1[1-2])\1(3[01]|[12][0-9]|0?[1-9])$/.test(input.fechaLanzamiento)) {
    } else if (!/^\d{4}[-/.](0[1-9]|1[0-2])[-/.](0[1-9]|[12][0-9]|3[01])$/.test(input.fechaLanzamiento)) {
      errors.fechaLanzamiento = "usa 4 para el año, 2 para el mes y 2 para el día... en ese orden"; //l formato de fecha (AAAA-MM-DD, AAAA/MM/DD, AAAA.MM.DD)
    }
    
    if (!input.background_image) {
      errors.background_image = "Hay que poner una imagen...";
    } else if (
      !/^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/.test(input.background_image)
    ) {
      errors.background_image = "el formato de la URL no es correcto..";
    }

    if (!input.rating) {
      errors.rating = "bue... hay q poner algún rating también";
    } else if (
      input.rating > 5 ||
      input.rating < 0 ||
      /^(?:[1-9]\d{0,4}|0)\.\d$/.test(input.rating) // verificar si funciona asi o con 2 dec : /^(?:[1-9]\d{0,4}|0)\.\d{1,2}$/
    ) {
      errors.rating =
        "nro hasta 5 y con 2 decimales";
    }
  
    if (input.generos.length < 1) {
      errors.generos = "elegite un género";
    }
  
    if (input.plataformas.length < 1) {
      errors.plataformas = "uff y una plataforma...";
    }
  
    return errors;
  }
  