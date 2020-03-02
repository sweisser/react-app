import React from "react";

class FoodTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      foods: [{ id: 0, name: "food0" }]
    };
  }

  componentDidMount() {
    let service_url = process.env.REACT_APP_SERVICE_BASE_URL;
    fetch(service_url + "/food")
      .then(response => response.json())
      .then(foods => this.setState({ foods }))
      .catch(console.log);
  }

  render() {
    const { foods } = this.state;
    console.log("foods: ", foods);
    return (
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Short</th>
            <th>Long</th>
          </tr>
        </thead>
        <tbody>
          {foods.slice(0, 10).map(food => (
            <FoodRow food={food} key={food.id}></FoodRow>
          ))}
        </tbody>
      </table>
    );
  }
}

class FoodRow extends React.Component {
  render() {
    return (
      <tr key="{this.props.food.id}">
        <td>{this.props.food.id}</td>
        <td>{this.props.food.short_desc}</td>
        <td>{this.props.food.long_desc}</td>
      </tr>
    );
  }
}

export default FoodTable;
