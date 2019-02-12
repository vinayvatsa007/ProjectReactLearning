import React from 'react';
import './Person.css';

const person = (props) => {
    // for using special style i.e. need to import StyleRoot component from radium 
    // and also we need to wrap our final reder return output inside StyleRoot section on whichever componet 
    // we wish to apply this styple
    const style = {
        '@media (min-width: 500px)': {
                width:'450px'
        }
    };

    const rnd = Math.random();
    //console.log(rnd);

    if(rnd > 0.7){
        throw new Error('Something went wrong');
    }
    return (
    <div className="Person" style={style}>
        <p onClick = {props.click}>I am {props.name} and i am {props.age} years old </p>
        <p>{props.children}</p>
        <input type="text" onChange={props.changed} value={props.name}></input>
    </div>
    ) 
    };
export default person;