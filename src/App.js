import React, { useState, useEffect } from 'react';
import './App.css';


function App(props) {
  let [colorAdd, setColorAdd] = useState(
    window.localStorage.getItem('colorAdd') ? window.localStorage.getItem('colorAdd').split(',') : props.colors)

  useEffect(() => window.localStorage.setItem('colorAdd', colorAdd));


  let [color, setColor] = useState(
    colorAdd[0]
  ); 

  const gridInit = Array(100).fill('#45B39D');

  let [gridTam, setGridTam] = useState(
    window.localStorage.getItem('gridTam') ? window.localStorage.getItem('gridTam').split(',') : gridInit)
  useEffect(() => window.localStorage.setItem('gridTam', gridTam));


  function clearBoard() {
    setGridTam(gridInit);
    
  }

  function getColors() {
    const myColors = []
    fetch('https://api.noopschallenge.com/hexbot?count=10').then(response =>
      response.json()
    ).then(myJson =>
      myJson.colors.map(item => myColors.push(item.value))
    ).then(() => {
      setColorAdd(myColors);
      setColor(myColors[0]);
    }
    )
  }


  function PickColor(props) {
    const {
        colors,
        pickColor,
        selectColor,
    } = props;

    return (
            <ul >
                {colors.map((color,index) => {
                    const choose = color === pickColor;
                    return (
                        <li
                          style={{ backgroundColor: color} }
                          key={index}
                          className={` ${choose ? 'gridColor' : 'selectcolor'}`}
                          onClick={() => selectColor(color)}
                        />
                    )
                })}
            </ul>
       
    )
}



function changeColor(index) {
    const newgridTam = [...gridTam];
    newgridTam[index] = color;
    setGridTam(newgridTam);
        }

function changeColor2(index, move) { 
            if (move.buttons === 1) { 
                const newgridTam = [...gridTam];
                newgridTam[index] = color;
                setGridTam(newgridTam);
            }
        }

function Grid(props){
        const {
            tam
        } = props;
        return (
                <div   className="  grid" >
                    { tam.map((boxColor, index) => (
                        <div
                            key={index}
                            className = 'pixel'
                            style={{  backgroundColor: boxColor}}    
                            onClick={() => changeColor(index)}
                            onMouseMove={(move) => changeColor2(index, move)} 
                        />

                    ))}

                </div>
        )
    }


  return (
    <div className="container">
    <h1 className="pixFont">
            Pixel Art App
          </h1>
      <div>
        <div >
          <button
            className="button pixFont"
            onClick={clearBoard}
          >Clear Board</button>


        </div>
        <div>
          <button
            className="button pixFont"
            onClick={getColors}
          >Change colors</button>
        </div>
        </div>

        <div  >
          <PickColor
            colors={colorAdd}
            pickColor={color}
            selectColor={setColor}
          />
      </div>
      <div
        className="gridtam"
      >    
          <Grid
            tam={gridTam}
          />
      </div>
    </div>
  );
}

export default App;
