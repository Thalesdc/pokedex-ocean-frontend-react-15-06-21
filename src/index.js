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
            history.push("/visualizar/" + props.item._id);
          }}
        >
          <h2>{props.item.nome}</h2>
          <img src={props.item.imagem} alt={props.item.nome} width="300"></img>
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
    // const request = await fetch("https://pokeapi.co/api/v2/pokemon");
    const request = await fetch("https://backend-flexivel.herokuapp.com/", {
      headers: new Headers({
        Authorization: "thalesdiascarvalho",
      }),
    });
    const json = await request.json();
    // 2 - Atualiza o estado após receber a requisição
    this.setState({
      itens: json,
    });
    console.log(json);
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
    // const request = await fetch("https://pokeapi.co/api/v2/pokemon");
    const request = await fetch(
      "https://backend-flexivel.herokuapp.com/" + this.id,
      {
        headers: new Headers({
          Authorization: "thalesdiascarvalho",
        }),
      }
    );
    const json = await request.json();
    // 2 - Atualiza o estado após receber a requisição
    console.log(json);
    this.setState({
      item: json,
    });
  }

  render() {
    return <CardItem item={this.state.item} key={this.state.item_id} />;
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
