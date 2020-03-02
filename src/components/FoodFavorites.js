import React from "react";

class FoodFavorites extends React.Component {
  state = {
    favourites: [1001, 1002, 1003]
  };

  render() {
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>id</th>
              <td>actions</td>
            </tr>
          </thead>
          <tbody>
            {this.state.favourites
              .map(id => this.get_food_by_id(id))
              .map(f => this.render_row(f))}
          </tbody>
        </table>
      </div>
    );
  }

  render_row(favourite) {
    console.log("render_row: ", favourite);
    return (
      <tr key={favourite.id}>
        <td>{favourite.name}</td>
        <td>
          <button key={favourite.id} onClick={e => this.add(favourite, e)}>
            Add
          </button>
        </td>
      </tr>
    );
  }

  add(favourite, e) {
    console.log("add: ", favourite, e);
  }

  get_food_by_id(id) {
    let favourite = {};

    let service_url = process.env.SERVICE_BASE_URL;
    fetch(service_url + "/food/" + id)
      .then(response => response.json())
      .then(food => {
        favourite = food;
        console.log(favourite);
      })
      .catch(console.log);
    return favourite;
  }
}

export default FoodFavorites;
