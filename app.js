import axios from 'axios';

class App extends React.Component {
	// makes sure the component is initialized properly
	constructor(props) {
		super(props);
		this.state = {
			pastThirtyDays: [],
			allTime: [],
			display: pastThirtyDays
		}
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
		this.setState({ display });
	}

	render() {
		return (
			<h1>fCC Leaderboard</h1>
			<h4>Campers who've earned the most brownie points</h4>
			<h3>Sort by:</h3>
			<button onClick={() => this.changeDisplay('pastThirtyDays')}>Past 30 Days</button>
			<button onClick={() => this.changeDisplay('allTime')}>All Time</button>
			//table
		);
	}
}

const eachCamper = (props.campers) {
	return (
		<tr>
			<td>{number + 1}</td>
			<td><a href={`https://freecodecamp.com/${camper.username}`} target="_blank">{camper.icon}{camper.username}</td>
			<td>{camper.recent}</td>
			<td>{camper.alltime}</td>
		</tr>
	);
}

const Campers = (props.campers) {
	return (
		<table>
			<thead>
				<tr>
					<th>#</th>
					<th>Username</th>
					<th>Points in Past 30 Days</th>
					<th>All Time Points</th>
				</tr>
			</thead>
			<tbody>

			<eachCamper campers={this.state[this.state.display]} />

			</tbody>
		</table>
	)
}

ReactDOM.render(<App />, document.querySelector('body'));