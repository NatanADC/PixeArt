import React, { useState, useEffect } from 'react';
import './App.css';


function App(props) {
  let [colorAdd, setColorAdd] = useState(
    window.localStorage.getItem('colorAdd') ? window.localStorage.getItem('colorAdd').split(',') : props.colors)

  useEffect(() => window.localStorage.setItem('colorAdd', colorAdd));


  let [color, setColor] = useState(
    colorAdd[0]
  ); 

  const gridInit = Array(100).fill('#FFF');

  let [gridTam, setGridTam] = useState(
    window.localStorage.getItem('gridTam') ? window.localStorage.getItem('gridTam').split(',') : gridInit)
  useEffect(() => window.localStorage.setItem('gridTam', gridTam));


  function clearBoard() {
    setGridTam(gridInit);
    
  }

  function getColors() {
    const myColors = []
    fetch('http://api.noopschallenge.com/hexbot?count=10').then(response =>
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
            <ul style={{display: 'flex'}}>
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
      <div>
        <div  className="col-sm-6 col-12 ">
          <button
            className="button"
            onClick={clearBoard}
          >Clear Board</button>

          <button
            className="button"
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
        className="row marginTop gridtam"
      >    
          <Grid
            tam={gridTam}
          />
      </div>
    </div>
  );
}

export default App;
