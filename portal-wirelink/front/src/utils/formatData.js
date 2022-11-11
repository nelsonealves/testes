const formatData = (data) => {
  const [year, month, day] = data.split('-');
  return `${day}/${month}/${year}`;
};

export default formatData;
