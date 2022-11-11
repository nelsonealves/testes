const formatValue = (value) => Intl.NumberFormat('pt-br', {
  style: 'currency',
  currency: 'BRL',
}).format(value); // TODO

export default formatValue;
