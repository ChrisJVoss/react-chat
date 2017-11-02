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
