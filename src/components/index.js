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

export default connect(mapStateToProps, mapDispatchToProps(ChatContainer)  
