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
}

export default connect(mapStateToProps, mapDispatchToProps(ChatContainer)
