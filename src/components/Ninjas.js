import React, {Component} from "react";
import axios from "axios";
import Table from "react-bootstrap/Table"

class Ninjas extends Component {
    state = {
        ninjas: [],
        id: 0
    }
    constructor(props) {
        super(props)
        this.state = {
            ninjas: [],
            id: 0
        }
        this.showNinjas = this.showNinjas.bind(this)
        this.deleteTable = this.deleteTable.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    showNinjas() {
        axios.get('http://localhost:3000/ninjas')
            .then((response) => {
                this.setState({
                    ninjas: response.data
                })
            });
    }

    handleSubmit(event) {
        let url = 'http://localhost:3000/ninjas/' + this.state.id
        axios.get(url)
            .then((response) => {
                this.setState({
                    ninjas: [response.data]
                })
            });
        event.preventDefault()
    }

    handleChange(event) {
        this.setState({id: event.target.value});
    }

    deleteTable() {
        this.setState({
            ninjas: []
        });
    }

    render() {
        let ninjas = this.state.ninjas.map((ninja) => {
            return (
                <tr key={ninja.id}>
                    <td>{ninja.id}</td>
                    <td>{ninja.name}</td>
                    <td>{ninja.clan}</td>
                    <td>{ninja.eye}</td>
                    <td>{ninja.rank}</td>
                    <td>{ninja.chakraAmount}</td>
                    <td>{ninja.criminalNum}</td>
                    <td>{ninja.criminalGroup}</td>
                    <td>{ninja.isCriminal ? "true" : "false"}</td>
                    <td>{ninja.village}</td>
                </tr>
            )
        });
        return (
            <div className="Pole">
                <div className="TopBar">

                    <button className="ButtonStyle" onClick={this.showNinjas}>
                        SHOW!
                    </button>

                    <button className="ButtonStyle" onClick={this.deleteTable}>
                        CLEAR!
                    </button>

                    <form className="FormStyle" onSubmit={this.handleSubmit}>
                        <input className="TextField" type="text" value={this.state.id} onChange={this.handleChange} />
                        <input className="TextSubmit"  type="submit" value="Submit" />
                    </form>


                </div>
                <Table className="Table">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Clan</th>
                        <th>Eyes</th>
                        <th>Rank</th>
                        <th>Chakra</th>
                        <th>Crimes committed</th>
                        <th>Criminal Group</th>
                        <th>Criminal</th>
                        <th>Village</th>
                    </tr>
                    </thead>
                    <tbody>
                    {ninjas}
                    </tbody>
                </Table>
            </div>
        )
    }
}

export default Ninjas