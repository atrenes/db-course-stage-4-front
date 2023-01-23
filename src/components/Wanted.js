import React, {Component} from "react";
import axios from "axios";
import Table from "react-bootstrap/Table"

class Ninjas extends Component {
    state = {
        wanted: [],
        executors: [],
        id: 0
    }
    constructor(props) {
        super(props)
        this.state = {
            wanted: [],
            executors: [],
            id: 0
        }
        this.showWanted = this.showWanted.bind(this)
        this.deleteTable = this.deleteTable.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    showWanted() {
        axios.get('http://localhost:3000/wanted')
            .then((response) => {
                this.setState({
                    wanted: response.data,
                    executors: []
                })
            });
    }

    handleSubmit(event) {
        let url = 'http://localhost:3000/executors_for/' + this.state.id
        axios.get(url)
            .then((response) => {
                this.setState({
                    executors: response.data,
                    wanted: []
                })
            });
        event.preventDefault()
    }

    handleChange(event) {
        this.setState({id: event.target.value});
    }

    deleteTable() {
        this.setState({
            wanted: [],
            executors: []
        });
    }

    render() {
        let table;
        if (this.state.wanted.length !== 0) {
            let wanted = this.state.wanted.map((wanted) => {
                return (
                    <tr key={wanted.id}>
                        <td>{wanted.id}</td>
                        <td>{wanted.wantedNinjaName}</td>
                        <td>{wanted.isCaptured ? "true" : "false"}</td>
                        <td>{wanted.executorNinjaName}</td>
                        <td>{wanted.description}</td>
                        <td>{wanted.dateOfSearchStart}</td>
                        <td>{wanted.dateOfCapture}</td>
                    </tr>
                )
            });
            table =
                <Table className="Table">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Is captured</th>
                        <th>Executor</th>
                        <th>Description</th>
                        <th>Search date</th>
                        <th>Capture date</th>
                    </tr>
                    </thead>
                    <tbody>
                        {wanted}
                    </tbody>
                </Table>
        } else if (this.state.executors.length !== 0) {
            let executors = this.state.executors.map((executors) => {
                return (
                    <tr key={executors.id}>
                        <td>{executors.id}</td>
                        <td>{executors.name}</td>
                        <td>{executors.clan}</td>
                        <td>{executors.eye}</td>
                        <td>{executors.rank}</td>
                        <td>{executors.chakraAmount}</td>
                        <td>{executors.village}</td>
                    </tr>
                )
            });
            table =
                <Table className="Table">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Clan</th>
                        <th>Eye</th>
                        <th>Rank</th>
                        <th>Chakra</th>
                        <th>Village</th>
                    </tr>
                    </thead>
                    <tbody>
                        {executors}
                    </tbody>
                </Table>
        }

        return (
            <div className="Pole">
                <div className="TopBar">

                    <button className="ButtonStyle" onClick={this.showWanted}>
                        SHOW!
                    </button>

                    <form onSubmit={this.handleSubmit}>
                        <input type="text" value={this.state.id} onChange={this.handleChange} />
                        <input type="submit" value="find executor" />
                    </form>

                    <button className="ButtonStyle" onClick={this.deleteTable}>
                        CLEAR!
                    </button>

                </div>
                {table}
            </div>
        )
    }
}

export default Ninjas