import React from 'react';
import './App.css';

function App() {
  const [status, setStatus] = React.useState('idle');
  const [colors, setColors] = React.useState([]);
  const [error, setError] = React.useState(null);

  function getAListOfColors() {
        setStatus('loading');
        // Docs to use the hexbot API: https://github.com/noops-challenge/hexbot
        fetch('http://api.noopschallenge.com/hexbot?count=10').then(
          (response) => {
            /** If we don't receive a successful response (status code: 200 OK)
            * then something happened like: status 404, not found or status 500, API error
            */
            if(!response.ok) {
              // Throw an error, this will be caught by .catch and printed on the console
              throw new Error(`Network response was not ok, status code: ${response.status}`);
            }
            /** This is just an HTTP response, not the actual JSON.
            * To extract the JSON body content from the response, we use the json() method
            */
            return response.json();
          }
        ).then(
          data => {
            setStatus('resolved');
            setColors(data.colors);
          }
        ).catch(
          error => {
            setStatus('rejected');
            setError(error.message);
            console.error('There has been a problem with your fetch operation;', error)
          }
        );
      }



  return (
        <div className="flex flex-col p-5 bg-gray-200">
          <h2>
            Pixel Art App
          </h2>
          
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mb-5 rounded"
            onClick={getAListOfColors}
          >
            Click me!
          </button>

          {status === 'idle' && (
            <p>Waiting for a list of colors</p>
          )}

          {status === 'loading' && (
            <p>Loading...</p>
          )}

          {status === 'resolved' && (
            <ul>
              {colors.map(item => {
                return (
                  <li
                   key={item.value}
                    className= "color"
                    style={{backgroundColor: item.value}}
                  />


                )
              })}
            </ul>
          )}
        </div>
      )
}

export default App;
