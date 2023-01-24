import React, {Component} from "react";
import axios from "axios";
import Table from "react-bootstrap/Table"

class Techniques extends Component {
    state = {
        techniques: []
    }
    constructor(props) {
        super(props)
        this.state = {
            techniques: []
        }
        this.showTechniques = this.showTechniques.bind(this)
        this.deleteTable = this.deleteTable.bind(this)
    }

    showTechniques() {
        axios.get('http://localhost:3000/techniques')
            .then((response) => {
                this.setState({
                    techniques: response.data
                })
            });
    }

    deleteTable() {
        this.setState({
            techniques: []
        });
    }

    render() {
        let techniques = this.state.techniques.map((technique) => {
            return (
                <tr key={technique.id}>
                    <td>{technique.id}</td>
                    <td>{technique.name}</td>
                    <td>{technique.clanName}</td>
                    <td>{technique.typeType}</td>
                    <td>{technique.chakraCost}</td>
                </tr>
            )
        });
        return (
            <div className="Pole">
                <div className="TopBar">

                    <button className="ButtonStyle" onClick={this.showTechniques}>
                        SHOW!
                    </button>

                    <button className="ButtonStyle" onClick={this.deleteTable}>
                        CLEAR!
                    </button>


                </div>
                <Table className="Table">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Clan</th>
                        <th>Type</th>
                        <th>Chakra</th>
                    </tr>
                    </thead>
                    <tbody>
                    {techniques}
                    </tbody>
                </Table>
            </div>
        )
    }
}

export default Techniques