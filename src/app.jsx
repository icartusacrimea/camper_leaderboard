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
    return (
      <div>
			  <h1>fCC Leaderboard</h1>
			  <button onClick={() => this.changeDisplay('pastThirtyDays')}>Past 30 Days</button>
			  <button onClick={() => this.changeDisplay('allTime')}>All Time</button>
	      <Campers campers={this.state[this.state.display]} />
	    </div>
    );
  }
}

const Campers = ({ campers }) => {
  var list = campers.map((camper, index) => {
    return (
      <eachCamper key={index} camper={camper} number={index + 1} />
    );
  });

  return (
    <table>
			<thead>
				<tr>
					<th>#</th>
					<th>Username</th>
					<th>Points in Last 30 Days</th>
					<th>All Time Points</th>
				</tr>
			</thead>
			<tbody>
				{list}
			</tbody>
		</table>
  );
}

const eachCamper = ({ camper, number }) => {
  return (
    <tr>
      <td>{number}</td>
      <td><a href={`https://freecodecamp.com/${camper.username}`} target="_blank">{camper.username}</a></td>
      <td>{camper.recent}</td>
      <td>{camper.alltime}</td>
    </tr>
  );
}

ReactDOM.render(<App />, document.querySelector('.container'));