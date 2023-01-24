import React, {Component} from "react";
import axios from "axios";
import Table from "react-bootstrap/Table"

class Ninjas extends Component {
    state = {
        wanted: [],
        executors: [],
        id: 0,
        setDescription: {
            id: 0,
            description: ""
        }
    }
    constructor(props) {
        super(props)
        this.state = {
            wanted: [],
            executors: [],
            id: 0,
            setDescription: {
                id: 0,
                description: ""
            }
        }
        this.showWanted = this.showWanted.bind(this)
        this.deleteTable = this.deleteTable.bind(this)
        this.getExecutorsForId = this.getExecutorsForId.bind(this)
        this.handleIdChange = this.handleIdChange.bind(this)
        this.handleDescriptionIdChange = this.handleDescriptionIdChange.bind(this)
        this.handleDescriptionTextChange = this.handleDescriptionTextChange.bind(this)
        this.addDescription = this.addDescription.bind(this)
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

    getExecutorsForId(event) {
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

    handleIdChange(event) {
        this.setState({id: event.target.value});
    }

    handleDescriptionIdChange(event) {
        this.setState({setDescription: {id: event.target.value, description: this.state.setDescription.description}});
    }

    handleDescriptionTextChange(event) {
        this.setState({setDescription: {id: this.state.setDescription.id, description: event.target.value}});
    }

    addDescription(event) {
        let url = 'http://localhost:3000/wanted/addDescription'
        axios.post(url, this.state.setDescription)
            .then((response) => {
                console.log(response.data)
                this.showWanted()
            });
        event.preventDefault()
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

                    <form className="FormStyle" onSubmit={this.getExecutorsForId}>
                        <input className="TextField" type="text" value={this.state.id} onChange={this.handleIdChange} />
                        <input className="TextSubmit" type="submit" value="find executor" />
                    </form>

                    <form className="FormStyle" onSubmit={this.addDescription}>
                        <input className="TextField" type="text" value={this.state.setDescription.id} onChange={this.handleDescriptionIdChange}/>
                        <input className="TextField" type="text" value={this.state.setDescription.description} onChange={this.handleDescriptionTextChange}/>
                        <input className="TextSubmit" type="submit" value="set description"/>
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