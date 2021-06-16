import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./index.css";

function CardItem(props) {
  return (
    <Route
      render={({ history }) => (
        <div
          className="card_item"
          onClick={() => {
            history.push("/visualizar/" + props.item.name);
          }}
        >
          <h2>{props.item.name}</h2>
        </div>
      )}
    ></Route>
  );
}

class ListarItens extends React.Component {
  constructor(props) {
    super(props);
    // 1 - Definir o estado inicial
    this.state = {
      itens: [],
    };
  }

  async componentDidMount() {
    console.log("Component ListarItens mounted!");
    const request = await fetch("https://pokeapi.co/api/v2/pokemon");
    const json = await request.json();
    // 2 - Atualiza o estado após receber a requisição
    this.setState({
      itens: json.results,
    });
    console.log(json.results);
  }
  render() {
    // 3 - Atualiza a informação de acordo com o estado
    return (
      <div className="lista_itens">
        {this.state.itens.map((item, index) => (
          <CardItem item={item} key={index} />
        ))}
      </div>
    );
  }
}

class VisualizarItem extends React.Component {
  constructor(props) {
    super(props);

    this.id = this.props.match.params.id;
    console.log("ID: " + this._id);
    this.state = {
      item: {},
    };
  }
  async componentDidMount() {
    console.log("Component ListarItens mounted!");
    const request = await fetch("https://pokeapi.co/api/v2/pokemon/" + this.id);
    const json = await request.json();
    // 2 - Atualiza o estado após receber a requisição
    console.log(json);
    this.setState({
      item: json,
    });
  }

  render() {
    if (this.state.item.sprites !== undefined) {
      return (
        <div className="lista_itens">
          <div className="card_item">
            <h2>{this.state.item.name}</h2>
            <img
              src={this.state.item.sprites.front_default}
              alt={this.state.item.name}
              width="300"
            ></img>
            <h4>height: {this.state.item.height} Kg</h4>
            <h4>base_experience: {this.state.item.base_experience}</h4>
            <div className="types">
              {this.state.item.types.map((type) => (
                <div className="type">
                  <h4>{type.type.name}</h4>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="lista_itens">
          <div className="card_item">
            <h2>{this.state.item.name}</h2>
            <img src="" alt={this.state.item.name} width="300"></img>
          </div>
        </div>
      );
    }
  }
}

function App() {
  return (
    <Switch>
      <Route path="/" exact={true} component={ListarItens} />
      <Route path="/visualizar/:id" component={VisualizarItem} />
    </Switch>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
