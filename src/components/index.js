class ChatContainer extends React.Component {
  constructor(props) {
    super(props)
      this.state = {
        input: ''
        messages: props.messages
      }

   this.handleOnChange = this.handleOnChange.bind(this)
   this.handleOnSubmit = this.handleOnSubmit.bind(this)
   this._handleMessageEvent = this._handleMessageEvent.bind(this)
   }

  componentDidMount(){
    this._handleMessageEvent()
   }

   _handleMessageEvent(){
     socket.on('chat message', (inboundMessage) => {
       this.props.newMessage({user: 'test_user', message: inboundMessage})
        })
     }

   handleOnChange(ev) {
     this.setState({ input: ev.target.value })
   }

   handleOnSubmit(ev) {
     ev.preventDefault()
     socket.emit('chat message', { message: this.state.input })

       this.setState({ input: '' })
   }

   render() {
     return (
       <ChatLog messages={this.props.messages} />

          <form>
             <FormGroup>
               <InputGroup>
                 <FormControl onChange={this.handleOnChange} value={this.state.input/>
                 <Button bsStyle="primary" type="submit" onClick={this.handleOnSubmit}> Send </Button>

                 </InputGroup>
               </FormGroup>
             </form>
          )
        }
     }

function mapStateToProps(state, ownProps) {
  return { messages: state.messages }
 }

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ newMessage: messagesActions.newMessage}, dispatch)
}

class RoomsContainer extends Component {
  constructor(props){
    super()
    this.state = {
      input: '',
      connected: false
    }
    this.handleOnClick = this.handleOnClick.bind(this)
    this.handleNewRoom = this.handleNewRoom.bind(this)
    this.handleOnChange = this.handleOnChange.bind(this)
    this.fetchRooms = this.fetchRooms.bind(this)
  }

  componentDidMount(){
    this.fetchRooms()
  }
  handleOnClick(room){
    socket.emit("unsubscribe")
    socket.emit("subscribe", { room: room.title})
    this.props.joinRoom(room)
  }

  handleNewRoom(ev) {
    ev.preventDefault()
    this.props.newRoom(this.state.input)
    this.setState({input: ''})
  }
  handleOnChange(ev) {
    this.setState({input: ev.target.value})
  }

  fetchRooms(){
    if (!this.state.connected) {
      this.props.fetchRoomList()
      this.state.connected = true
    }
  }

  render() {
    const rooms = this.props.rooms.map((room) => {
    debugger
      return (
        <ListGroupItem key={room.title} onClick={this.handleOnClick.bind(null, room)}>
          {room.title}
        </ListGroupItem>
      )
    })

    return (
     <div>
       <Col xs={4} mdPull={1}>
         <ListGroup>
           {rooms}
           <NewRoom handleOnChange={this.handleOnChange} handleNewRoom={this.handleNewRoom} value={this.state.input}/>
         </ListGroup>
       </Col>
     </div>
   )

 }
}

export default connect(mapStateToProps, mapDispatchToProps(ChatContainer)

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
