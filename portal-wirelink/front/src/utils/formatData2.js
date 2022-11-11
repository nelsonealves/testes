const formatData2 = (data) => {
  const [year, month] = data.split('-');
  return `${month}/${year}`;
};

export default formatData2;
