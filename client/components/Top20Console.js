import React, { Component } from 'react';
import { connect } from 'react-redux';

import Chart from './Top20Chart';
import top20Search from '../actions/top20SearchActions';
import { categories, cycles } from '../constants/top20SelectorOptions';
import Spinning from 'grommet/components/icons/Spinning';
import Select from 'grommet/components/Select';
import Form from 'grommet/components/Form';
import FormField from 'grommet/components/FormField';


class Top20Console extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: {
        value: 'contribution-total',
        label: 'Total Raised'
      },
      // 'contribution-total'
      catKey: 'total_contributions',
      // cycle: '2016'
      cycle: {
        value: '2016',
        label: '2016'
      }
    };
    this.catHandleChange = this.catHandleChange.bind(this);
    this.cycleHandleChange = this.cycleHandleChange.bind(this);
    this.catHandleChangeNew = this.catHandleChangeNew.bind(this);
    this.cycleHandleChangeNew = this.cycleHandleChangeNew.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.top20Search(this.state.category, this.state.cycle);
  }

  componentDidUpdate(nextProps, nextState) {
    console.log('Current State ', this.state);
    console.log('New State ', nextState);
    if (JSON.stringify(this.state) === JSON.stringify(nextState)) {
      return
    }
    this.props.top20Search(this.state.category, this.state.cycle);
  }

  catHandleChange(event) {
    let key = categories.find((el) => {
      return el[0] === event.target.value;
    });
    this.setState({
      category: event.target.value,
      catKey: key[1]
    });
  }

  catHandleChangeNew(event) {
    let key = categories.find((el) => {
      return el[0] === event.option.value;
    });
    this.setState({
      category: event.option,
      catKey: key[1]
    });
  }

  cycleHandleChange(event) {
    console.log('current cycle ', this.state.cycle);
    console.log('new cycle ', event.target.value);
    this.setState({
      cycle: event.target.value
    });
  }

  cycleHandleChangeNew(event) {
    console.log('current cycle ', this.state.cycle);
    console.log('new cycle ', event.target.value);
    this.setState({
      cycle: event.option
    });
  }


//   onChange      {function ({target: , option: , value: })}
// Function that will be called when the user selects an option. The target corresponds to the embedded input element, allowing you to distinguish which component triggered the event. The option contains the object chosen from the supplied options. The value contains all selected options when multiple={true}.

  // handleSubmit(event) {
  //   event.preventDefault();
  // }

  render() {
    const catOptions = categories.map(category =>
      (
        <option key={category[1]} value={category[0]}>{ category[3] }</option>
      )
    );
    const cycleOptions = cycles.map(cycle =>
      (
        <option value={cycle}>{cycle}</option>
      )
    );

    const catOptionsNew = categories.map((category) => {
      return {
        value: category[0],
        label: category[3]
      };
    });
    const cycleOptionsNew = cycles.map((cycle) => {
      return {
        value: cycle,
        label: cycle
      };
    });

    if (this.props.data && this.props.data.results) {
      const results = this.props.data.results;
      const spend = results.map((candidate, index) => {
          return (
            <div
              key={index}
            >
              {candidate.name}
            </div>
          )
      });




      // pad       none|small|medium|large|{...}
      // The amount of padding to put around the contents. An object can be specified to distinguish horizontal and vertical padding: {horizontal: none|small|medium|large, vertical: none|small|medium|large}. Defaults to none.
      return (
        <div className="top20-console">
          <Form
            className="row"
          >
            <Select
              value={this.state.category}
              onChange={this.catHandleChangeNew}
              options={catOptionsNew}
              placeHolder="Select Category"
              className="top20-category-selector"
            />
            <Select
              value={this.state.cycle}
              onChange={this.cycleHandleChangeNew}
              options={cycleOptionsNew}
              placeHolder="Election Cycle"
              className="top20-cycle-selector"
            />




          </Form>
          {/* <div className="row">
            <form>
              <label>
                  Category:
                  <select value={this.state.category} onChange={this.catHandleChange}>
                    {catOptions}
                  </select>
              </label>
              <label>
                  Election Cycle:
                  <select value={this.state.cycle} onChange={this.cycleHandleChange}>
                    {cycleOptions}
                  </select>
              </label>
            </form>
          </div> */}
          {/* <div> */}
            <Chart
              data={this.props.data.results}
              search={this.state.catKey}
            />
          {/* </div> */}
        </div>
      );
    }
    return (
      <div>
        <Spinning />
        <span>Loading</span>
      </div>
    );
  }


  // import Select from 'grommet/components/Select';
  // <Select placeHolder='None'
  //   options={['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight']}
  //   value={undefined}
  //   onChange={...} />

    // if (this.props.data) {
    //   const results = this.props.data.results;
    //   let spend = [];
    //
    //   if (results) {
    //     spend = results.map((candidate, index) => {
    //       return (
    //         <div
    //           key={index}
    //         >
    //           {candidate.name}
    //         </div>
    //       )
    //     });
  //
  //       return (
  //         <div className="top20-console">
  //           <div className="row">
  //             <>
  //           </div>
  //           { spend }
  //         </div>
  //       );
  //     }
  //   }
  //   return (
  //     <div>
  //       <h3>Loading</h3>
  //     </div>
  //   );
  // }
}

function mapStateToProps(state) {
  return {
    data: state.Propublica.Top20
  };
}

export default connect(mapStateToProps, { top20Search })(Top20Console);
