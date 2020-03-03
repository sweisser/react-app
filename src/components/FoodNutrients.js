import React from "react";
import "../nutrient.css";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";

class FoodNutrients extends React.Component {
  state = {
    food_id: 1001,
    food_nutrients: {}
  };

  componentDidMount() {
    this.get_food_nutrients(this.state.food_id);
  }

  handleKeyPress = event => {
    if (event.key === "ArrowLeft") {
      this.prev();
    } else if (event.key === "ArrowRight") {
      this.next();
    } else if (event.key === "PageDownRight") {
      this.prev10();
    } else if (event.key === "PageUp") {
      this.next10();
    } else {
      console.log("keypress", event.key);
    }
  };

  render() {
    return (
      <div>
        <h1>Food Nutrients</h1>

        <Container>
          <Table width="400" align="center">
            <tbody>
              <tr>
                <td width="100">
                  <Button
                    variant="primary"
                    onClick={this.prev}
                    onKeyDown={this.handleKeyPress}
                  >
                    &lt;
                  </Button>
                </td>
                <td>
                  {this.state.food_id} {this.state.food_nutrients.long_desc}
                </td>
                <td width="100">
                  <Button
                    variant="primary"
                    onClick={this.next}
                    onKeyDown={this.handleKeyPress}
                  >
                    &gt;
                  </Button>
                </td>
              </tr>
            </tbody>
          </Table>
          <Table striped bordered size="sm">
            <thead>
              <tr>
                <th align="left">Name</th>
                <th align="right">Amount</th>
                <th align="right">Unit</th>
              </tr>
            </thead>
            {this.render_nutrients(this.state.food_nutrients)}
          </Table>
        </Container>
      </div>
    );
  }

  render_nutrients(food_nutrient) {
    if (food_nutrient != null) {
      if (food_nutrient.nutrients != null) {
        let keys = Object.keys(food_nutrient.nutrients);
        // <tr>{keys.map(k => this.render_row(food_nutrient.nutrients[k]))}</tr>
        return (
          <tbody>
            {keys.map(x => this.render_row(food_nutrient.nutrients, x))}
          </tbody>
        );
      }
    } else {
      return (
        <tbody>
          <tr>
            <td colSpan="3">empty</td>
          </tr>
        </tbody>
      );
    }
  }

  render_row(nutrients, key) {
    return (
      <tr key={key}>
        <td align="left">{nutrients[key].name}</td>
        <td align="right">{nutrients[key].amount}</td>
        <td align="right">{nutrients[key].units}</td>
      </tr>
    );
  }

  prev = () => {
    // 1001 is the min food_id in the database.
    let id = Math.max(this.state.food_id - 1, 1001);
    this.setState({ food_id: id });
    this.get_food_nutrients(id);
  };

  prev10 = () => {
    // 1001 is the min food_id in the database.
    let id = Math.max(this.state.food_id - 10, 1001);
    this.setState({ food_id: id });
    this.get_food_nutrients(id);
  };

  next = () => {
    let id = Math.min(this.state.food_id + 1, 93600);
    this.setState({ food_id: id });
    this.get_food_nutrients(id);
  };

  next10 = () => {
    let id = Math.min(this.state.food_id + 10, 93600);
    this.setState({ food_id: id });
    this.get_food_nutrients(id);
  };

  get_food_nutrients(id) {
    let service_url = process.env.REACT_APP_SERVICE_BASE_URL;
    let url = service_url + "/v2/food/" + id + "/nutrients";
    console.log(url);
    fetch(url)
      .then(response => response.json())
      .then(food_nutrients => {
        this.setState({
          food_nutrients
        });
        console.log("nut:", this.state.food_nutrients.nutrients);
      })
      .catch(console.log);
  }
}

export default FoodNutrients;
