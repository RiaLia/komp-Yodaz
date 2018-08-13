var React = require('react');
var ReactDOM = require("react-dom");
var axios = require('axios')

  class Cards extends React.Component {

      constructor(props) {
        super(props)
        this.state = {
          instruction: undefined,
          description: undefined
        },
        this.getCard = this.getCard.bind(this)
      }

      getCard() {
          axios.get('  https://deckofcardsapi.com/api/deck/bcqkya8dgckt/draw/?count=1')
            .then(function(response) {
              if (response.data.remaining == 0) {
                axios.get('https://deckofcardsapi.com/api/deck/bcqkya8dgckt/shuffle/')
              } else {
                this.setState({
                  card: {
                  image: response.data.cards[0].image
                  }
                })
                if (response.data.cards[0].value > 1 && response.data.cards[0].value < 11) {
                  if (response.data.cards[0].suit == 'CLUBS' || response.data.cards[0].suit == 'SPADES') {
                    this.setState({
                      instruction: ("Drink " + response.data.cards[0].value),
                      description: undefined
                    })
                  } else {
                    this.setState({
                      instruction: ("Give Away " + response.data.cards[0].value),
                      description: undefined
                    })
                  }
                }
                 else {
                  switch (response.data.cards[0].value) {
                    case 'JACK':
                      this.setState({
                        instruction: "New rule",
                        description: "Come up with a new rule that will effect everyone"
                      })
                      break
                    case 'QUEEN':
                      this.setState({
                      instruction: "Toilet Break",
                      description: "Save this card and use it when you need"
                    })
                      break
                    case 'KING':
                      this.setState({
                      instruction: "Category",
                      description: "Choose a category, ex cars. Then everyone needs to name a car-brand starting to your left this goes on until someone fails."
                    })
                      break
                    case 'ACE':
                      this.setState({
                        instruction: "Waterfall",
                        description: "Everyone starts drinking at the same time, when you stops the person on your left is allowed to stop and so on. "

                      })
                      break
                    default:

                  }
                }
              }
            }.bind(this))
        }

    render() {
      return <div id="imageDiv">
          <p id="title">Drinking game!</p>
           <img id="coverImage"
             alt="" src="cover.jpg"
             onClick={this.getCard}>
           </img>
           <img id="frontImage"
             alt="" src={this.state.card ? this.state.card.image : undefined}>
           </img>
          <p id="instruction">{this.state.card ? this.state.instruction : undefined}</p>
          <p id="desc">{this.state.card ? this.state.description : undefined}</p>
         </div>
    }

  }

  ReactDOM.render(<Cards></Cards>, document.getElementById('app'))
