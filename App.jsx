import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [apodData, setApodData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApodData();
  }, []);

  const fetchApodData = async () => {
    try {
      const response = await fetch(
        'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY'
      );
      if (!response.ok) {
        throw new Error('HTTP Error! Status: ' + response.status);
      }
      const data = await response.json();
      setApodData(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Slika Dana</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h2>{apodData.title}</h2>
          <img src={apodData.url} alt={apodData.title} />
          <p>{apodData.explanation}</p>
        </>
      )}
    </div>
  );
}

export default App;
