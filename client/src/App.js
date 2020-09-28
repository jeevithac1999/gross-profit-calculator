import React, { Component } from 'react';
import './App.css';
import './style.scss';
import { Card,Form,ListGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  state = {
    response: '',
    cost: '',
    percent: '',
    responseToPost: ''
  };

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }
  resetForm = () => {
    this.setState({
        ...this.state,
        cost: '',
        percent: '',
        responseToPost: ''
    })
 }

  callApi = async () => {
    const response = await fetch('/api/about');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch('/api/home', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cost: this.state.cost ,percent: this.state.percent}),
    });
    const body = await response.json();
    if(this.state.cost){
    this.setState({ responseToPost: body });
    }               
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p style={{paddingTop:"20px"}}>Home</p>
        </header>
        <div style={{position:"relative",top:"5em"}}>
          <div class="text">
            <h2 style={{color:"#000000",fontWeight:"700",fontSize:"3em"}}>Profit margin calculator</h2>
          </div>
          <div class="text" style={{padding:"0px 370px"}}>
        <p style={{fontFamily:"ShopifySans,Helvetica,Arial,Lucida Grande,sans-sherif",fontSize:"2em",lineHeight:"1.5",color:"#637381",fontWeight:"00"}}>{this.state.response}</p>
    </div>
        <div class="container">
        <Card style={{width:"50rem"}}>
        <div style={{ backgroundColor: "#ebe7fc", height:"150px"}}>
        <div class="row justify-content-center" style={{position:"relative",top:"20px"}}>
          <div class="col-5">
            <Form.Control size="lg" placeholder="Cost of item ($)" type="number"
                  value={this.state.cost}
                  onChange={e => this.setState({ cost: e.target.value })}
                  id="a" required="true"/>
          </div>
          <div class="col-5">
          <Form.Control size="lg" placeholder="Markup (%)"  type="number"
                  value={this.state.percent}
                  onChange={f => this.setState({ percent: f.target.value })}
                  id="b" required="true"/>
          </div>
        </div>
        <div class="row justify-content-end" style={{position:"relative",right:"10.5%",top:"40px"}}>
          <button type="button" style={{color:"#5c6ac4"}} class="btn btn-link" onClick={this.resetForm}>Reset</button>
          <button type="button" class="buttons" onClick={this.handleSubmit}>Calculate Profit</button>
        </div>
        </div>
        <br></br>
        </Card>
        <Card style={{width:"50rem"}}>
        <div>
          <Card.Header>PROFIT MARGIN CALCULATOR RESULTS</Card.Header>
          <ListGroup horizontal>
          <ListGroup.Item style={{width:"33.4%",height:"100px"}}><Card.Text>Your sale price</Card.Text>
              <Card.Text>{this.state.responseToPost.dollar}{this.state.responseToPost.sale}</Card.Text></ListGroup.Item>
              <ListGroup.Item style={{width:"33.3%",height:"100px"}}> <Card.Text>Your profit</Card.Text>
              <Card.Text>{this.state.responseToPost.dollar}{this.state.responseToPost.profit}</Card.Text></ListGroup.Item>
            <ListGroup.Item style={{width:"33.3%",height:"100px"}}><Card.Text>Gross margin</Card.Text>
              <Card.Text>{this.state.responseToPost.margin}{this.state.responseToPost.symbol}</Card.Text></ListGroup.Item>
              </ListGroup>
              </div>
          </Card>
        </div>
      </div>
      </div>
    );
  }
}
export default App;
