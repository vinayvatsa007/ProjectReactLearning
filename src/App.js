import React, { Component } from 'react';
import logo from './logo.svg';
import cssClasses from './App.css';
import Person from './Person/Person';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary'

class App extends Component {
  // this property can have any data. here we have an object of an array- array of objects (persons)
  state = {
    persons: [
      { id: 'id1', name:'vinay', age:38},
      { id: 'id2', name:'vikky', age:36},
      { id: 'id3', name:'meenu', age:34}
    ], 
    otherState: 'some other value of second item in object',
    showPersons: false
  }
  switchPersonValuesHandler = (newName) => {
    this.setState(
      {
        persons: [
          {name: newName, age:40},
          {name:'vikky abc', age:36},
          {name:'meenu', age:30}
        ]
      })
  }
  nameChangedHandler = (event, id) =>{
    const personIndex = this.state.persons.findIndex(p =>{
      return p.id === id;
    });
    const person = {
      ...this.state.persons[personIndex]
    };
    // changing the name in individual person element in copy
    person.name = event.target.value;
    const personsList = [...this.state.persons];
    personsList[personIndex] = person;
    //updating back person array
    this.setState({persons: personsList});
  }
  togglePersonsHandler = () =>{
    var doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  }
  deletePersonHandler = (personIndex) =>
  {
    // bcoz array are reference type thus it just pass the pointer to same array pointer and would edit the original array
    // which may lead to issue. To avoid the issue we copy the array manipulate and update back org array
    const personsCopy = [...this.state.persons];
    personsCopy.splice(personIndex,1);
    this.setState({persons: personsCopy})
  }
  render() {
    const style = {
      backgroundColor: 'green',
      font: 'inherit',
      border: '1px solid blue',
      paddding: '20px',
      color: 'white',
      cursor: 'pointer'
    };
    // renderring persons dynamically basis showPerson condition
    // use variable instead of person component in reder and 
    // use the variable inside render

    let persons = null;
    if(this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((p,index) => {
            return <ErrorBoundary key = {p.id}>
              <Person 
                name = {p.name} 
                age = {p.name}
                click ={() => this.deletePersonHandler(index)}
                changed ={(event) =>this.nameChangedHandler(event,p.id)} />
            </ErrorBoundary>
          })}  
        </div>
      );
      style.backgroundColor = 'red';
    }

    //let classes = ['red', 'bold'].join(' ');
    const classes = [];
    if(this.state.persons.length<=2){
      classes.push('red');
    } 
    if(this.state.persons.length<=1){
      classes.push('bold');
    }

    // if showPersons true then populate persons in variable 
    return (
        <div className="App">
          <h1>Demo React App</h1> 
          <p className = {classes.join(' ')}>this is sample para</p>
          <button style ={style} onClick={()=> this.togglePersonsHandler()}
          
            >Toggle Persons show </button>
            {persons}
        </div>
    );
  }
}

export default App;
