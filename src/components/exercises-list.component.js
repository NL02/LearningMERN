import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

//Exercise component is a functional react component
//Used because it just needs to accept props and return jsx
const Exercise = props => (
    <tr>
        <td>{props.exercise.username}</td>
        <td>{props.exercise.description}</td>
        <td>{props.exercise.duration}</td>
        <td>{props.exercise.date.substring(0,10)}</td>
        <td>
            <Link to={"/edit/"+props.exercise._id}>edit</Link> | <a href="#" onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</a>
        </td>
    </tr>
)

//Class component 
export default class ExerciseList extends Component {
    constructor(props) {
        super(props);

        this.deleteExercise = this.deleteExercise.bind(this);
        
        this.state = {exercises: []};
    }

    componentDidMount() {
        axios.get('http://localhost:5000/exercises/')
            .then(response => {
                this.setState({exercises: response.data});
            })
            .catch((error) => {
                console.log(error);
            })
    }

    //Takes in object id and deletes it 
    deleteExercise(id) {
        axios.delete('http://localhost:5000/exercises/' + id)
            .then(res => console.log(res.data));
        //After deleting from the backend delete from the frontend
        //Setting state automatically refreshes page
        this.setState({
            //_id is from the mongodb database
            exercises: this.state.exercises.filter(el => el._id !== id)
        })
    }

    exerciseList() {
        return this.state.exercises.map(currentexercise => {
            //For every exercise it returns the component Exercise and methods
            return <Exercise exercise={currentexercise} deleteExercise={this.deleteExercise} ket={currentexercise._id}/>;
        })
    }
    render() {
        return (
            <div>
                <a>Logged Exercises</a>
                <table className='table'>
                    <thead className="thead-light">
                        <tr>
                            <th>Username</th>
                            <th>Description</th>
                            <th>Duration</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.exerciseList() }
                    </tbody>
                </table>
            </div>
        )
    }
}