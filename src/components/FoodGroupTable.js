import React from "react";

class FoodGroupTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      foodgroups: [{ id: 0, name: "food0" }]
    };
  }

  componentDidMount() {
    let service_url = process.env.SERVICE_BASE_URL;
    fetch(service_url + "/foodgroup")
      .then(response => response.json())
      .then(foodgroups => this.setState({ foodgroups }))
      .catch(console.log);
  }

  render() {
    const { foodgroups } = this.state;
    console.log("foodgroups: ", foodgroups);
    return (
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {foodgroups.slice(0, 10).map(foodgroup => (
            <FoodGroupRow
              foodgroup={foodgroup}
              key={foodgroup.id}
            ></FoodGroupRow>
          ))}
        </tbody>
      </table>
    );
  }
}

class FoodGroupRow extends React.Component {
  render() {
    return (
      <tr key="{this.props.foodgroup.id}">
        <td>{this.props.foodgroup.id}</td>
        <td>{this.props.foodgroup.name}</td>
      </tr>
    );
  }
}

export default FoodGroupTable;
