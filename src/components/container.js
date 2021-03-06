class Board extends React.Component {
  constructor() {
    super();
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }
  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

function distribute(nodes, workload) {
  const answer = []
  for (let i = 0; i < Math.floor(workload / nodes); i++) {
    answer[i] = []
  }
  if (workload % nodes === 0) {
    let x = 0
    for (let i = 0; i < answer.length; i++) {
      for (let j = 0; j < workload / nodes; j++) {
        answer[i][j] = x
      x++
      }
    }
  }
  else {

  }
  return answer
}

var Saves = React.createClass({
  getInitialState: function(){
    return {
      saved: false,
      numSaves: 0
    }
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var saved = false;
  var numSaves = this.state.numSaves;

  if (this.state.saved === false) {
    saved = true;
    numSaves++;
  } else {
    numSaves--;
  }
  this.setState({
    numSaves: numSaves,
    saved: saved
  });
},
render: function() {
    var savedText = '';
    var submitText = 'Save';
    if (this.state.saved) {
      savedText = 'You have saved this home.';
      submitText = 'Remove';
    }

    return (
      <div className="saves">
        <form onSubmit={this.handleSubmit}>
          <input type="submit" value={submitText} />
        </form>
      {this.state.numSaves} saves. {savedText}
      </div>
    );
  }
});
import axios from 'axios';

const BASE_URL = 'https://api.github.com';

export {getRepos, getUserData};

function getRepos(username) {
  const url = `${BASE_URL}/users/${username}/repos?per_page=250`;
  return axios.get(url).then(response => response.data);
}
function getUserData(username) {
  return axios.all([
    axios.get(`${BASE_URL}/users/${username}`),
    axios.get(`${BASE_URL}/users/${username}/orgs`),
  ])
  .then(([user, orgs]) => ({
    user: user.data,
    orgs: orgs.data,
  }));
}
function getRepos() {
  return Promise.resolve({
    data: getMockRepos(),
  });
}

function getMockRepos(number = _.random(1, 40)) {
  return _.times(number, () => getMockRepo());
}
function getMockRepo(overrides = {}) {
  const name = overrides.name || _.kebabCase(randomStarWarsName());
  return {
    id: _.uniqueId(),
    language: _.sample('JavaScript', 'CSS', 'HTML', 'Ruby', 'Go', 'Elm'),
    stargazers_count: _.random(0, 10000),
    forks_count: _.random(0, 500),
    html_url: `https://github.com/${_.kebabCase(randomStarWarsName())}/${name}`,
    name,
    description: `The awesome repo for the ${name} project!`,
    pushed_at: getRandomTimestamp(),
    ...overrides,
  };
}

class NoteList extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    fetch('/notes')
      .then(response => response.json())
      .then(notes => this.props.updateState(notes))
  }
  render() {
    return <ul>{this.props.parentState.notes.map((note) => {
      return <li key={note.id}>{note.note}</li>
    })}
    </ul>
  }
}
class AddNote extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit(event) {
    const postNote = (newNote) => {
      let fetchData = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newNote)
      }
