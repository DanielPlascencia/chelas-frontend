const formatearMoneda = (moneda) => {
  const monedaFormateada = Number(moneda).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  return monedaFormateada;
};

export { formatearMoneda };
