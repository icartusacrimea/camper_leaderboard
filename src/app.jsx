var React = require('react');
var ReactDOM = require('react-dom');
var axios = require('axios');

class App extends React.Component {
  // makes sure the component is initialized properly
  constructor(props) {
    super(props);
    this.state = {
      pastThirtyDays: [],
      allTime: [],
      display: 'pastThirtyDays'
    };
  }

  //use axios to quickly fetch APIs
  componentWillMount() {
    axios.all([this.getPastThirtyDays(), this.getAllTime()])
      .then(axios.spread((pastThirtyDays, allTime) => {
        this.setState({
          pastThirtyDays: pastThirtyDays.data,
          allTime: allTime.data
        });
      }));
  }

  getPastThirtyDays() {
    return axios.get('https://fcctop100.herokuapp.com/api/fccusers/top/recent');
  }

  getAllTime() {
    return axios.get('https://fcctop100.herokuapp.com/api/fccusers/top/alltime');
  }

  changeDisplay(display) {
    this.setState({
      display
    });
  }

  render() {
    if (this.state.pastThirtyDays.length === 0 && this.state.allTime.length === 0) {
      return (
        <h2>Loading...</h2>
      )
    }
    return (
      <div>
			  <h1>fCC Leaderboard</h1>
        <div className="row">
          <p>Sort by brownie points earned...</p>
  			  <button onClick={() => this.changeDisplay('pastThirtyDays')}>Past 30 Days</button>
  			  <button onClick={() => this.changeDisplay('allTime')}>All Time</button>
  	      <Campers campers={this.state[this.state.display]} />
        </div>
	    </div>
    );
  }
}

const Campers = ({campers}) => {
  const List = campers.map((camper, index) => {
    return <EachCamper key={index} camper={camper} number={index + 1}/>
  });

  return (
    <table className="table">
			<thead>
				<tr>
					<th>#</th>
					<th>Username</th>
					<th>Past 30 Days</th>
					<th>All Time</th>
				</tr>
			</thead>
			<tbody>
        {List}
			</tbody>
		</table>
  );
}

const EachCamper = ({camper, number}) => {
  return (
    <tr>
      <td>{number}</td>
      <td><a href={`https://freecodecamp.com/${camper.username}`} target="_blank"> <img src={camper.img}/> <span>{camper.username}</span></a></td>
      <td>{camper.recent}</td>
      <td>{camper.alltime}</td>
    </tr>
  );
}

ReactDOM.render(<App />, document.querySelector('.container'));