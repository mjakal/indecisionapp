import React from 'react';
import AddOption from './AddOption';
import Header from './Header';
import Action from './Action';
import Options from './Options';
import OptionModal from './OptionModal';

export default class IndecisionApp extends React.Component {
  constructor(props) {
    super(props);

    this.handlePick = this.handlePick.bind(this);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.handleDeleteOption = this.handleDeleteOption.bind(this);
    this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
    this.handleClearSelectedOption = this.handleClearSelectedOption.bind(this);

    this.state = {
      options: props.options,
      selectedOption: undefined
    };
  }
  /*
   * React component lifecycle methonds
   */
  componentDidMount() {
    try {
      const json =  localStorage.getItem('options');
      const options = JSON.parse(json);
      console.log("data loaded");
      if(options) {
        this.setState(() => { return {options: options}; });
      }
    } catch (e) {
      console.log("Error while loading data.");
    }

  }
  componentDidUpdate(prevProps, prevState) {
    if(prevState.options.length !== this.state.options.length) {
      const json =  JSON.stringify(this.state.options);
      localStorage.setItem('options', json);
      console.log("saving data");
    }
  }
  componentWillUnmount() {
    console.log("Component unmounted");
  }
  handleClearSelectedOption() {
    this.setState(() => {
      return {
        selectedOption: undefined
      };
    });
  }
  handleDeleteOptions() {
    this.setState(() => {
      return {
        options: []
      };
    });
  }
  handleDeleteOption(optionToRemove) {
    this.setState((prevState) => {
      return {
        options: prevState.options.filter((option) => {
          return option !== optionToRemove;
        })
      };
    });
  }
  handlePick() {
    const randomNum = Math.floor(Math.random() * this.state.options.length);
    const option = this.state.options[randomNum];

    this.setState(() => {
      return {
        selectedOption: option
      };
    });
  }
  handleAddOption(option) {
    if(!option) {
      return 'Enter valid value to add item';
    } else if (this.state.options.indexOf(option) > -1) {
      return 'This option already exists';
    }

    this.setState((prevState) => {
      return {
        options: prevState.options.concat(option)
      };
    });
  }
  render() {
    const title = 'Indecision';
    const subtitle = 'Put your life in the hands of a computer';

    return (
      <div>
        <Header title={title} subtitle={subtitle} />
        <div className="container">
          <Action
            hasOptions={this.state.options.length > 0}
            handlePick={this.handlePick}
          />
          <div className="widget">
            <Options
              options={this.state.options}
              handleDeleteOptions={this.handleDeleteOptions}
              handleDeleteOption={this.handleDeleteOption}
            />
            <AddOption handleAddOption={this.handleAddOption} />
          </div>
        </div>
        <OptionModal
          selectedOption={this.state.selectedOption}
          handleClearSelectedOption={this.handleClearSelectedOption}
        />
      </div>
    );
  }
}

IndecisionApp.defaultProps = {
  options: []
}
