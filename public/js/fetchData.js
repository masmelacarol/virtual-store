const fetchData = async () => {
  const response = await fetch('js/API.json');
  const data = await response.json();
  return data;
}
