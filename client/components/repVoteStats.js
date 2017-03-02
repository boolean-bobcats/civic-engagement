import React, { Component } from 'react';
import shortid from 'shortid';

import { Doughnut, Line } from 'react-chartjs-2';
import { DoughnutTemplate, LineGraphTemplate } from './graphTemplates';

import VoteDetails from './voteDetails';

class repVoteStats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    };
    
    // hacky force refresh
    setTimeout(() => {this.setState(this.state)}, 100);
  }

  handleClick() {
    this.setState({ expanded: !this.state.expanded });
  }

  render() {
    const doughnutGraphData = Object.assign({}, DoughnutTemplate);
    doughnutGraphData.labels = ['Yes', 'No', 'Present'];
    doughnutGraphData.datasets[0].data = [0, 0, 0];
    
    const lineGraphData = Object.assign({}, LineGraphTemplate);
    lineGraphData.labels = [];
    lineGraphData.datasets[0].data = [];

    const options = {
      // animationSteps: 100,
      // animationEasing: 'easeOutBounce',
      // animateRotate: true,
      responsive: false,
      maintainAspectRatio: false
    };

    let voteDisplay;
    const { rep } = this.props;
    if (rep && rep.votes && rep.roles) {
      const { votes, roles } = rep;

      roles.forEach((session) => {
        if (session.missed_votes_pct !== undefined) {
          const { congress, missed_votes_pct } = session;

          lineGraphData.labels.push(congress);
          lineGraphData.datasets[0].data.push(missed_votes_pct);
        }
      });
      voteDisplay = votes.map((vote) => {
        let { data } = doughnutGraphData.datasets[0];
        if (vote.position === 'Yes') data[0] += 1;
        if (vote.position === 'No') data[1] += 1;
        if (vote.position === 'Present') data[2] += 1;

        return (
          <VoteDetails
            key={shortid.generate()}
            vote={vote}
          />
        );
      });
    }


    return (
      <div>
        <div>Last 100 votes:<br />
          <Doughnut
            data={doughnutGraphData}
            height={200}
            width={400}
            options={ options }
          />
        </div>
        <div>
          <Line
            data={lineGraphData}
            height={200}
            width={400}
            options={ options }
          />
        </div>
        <button onClick={() => this.handleClick()}>
          stuff voted on
        </button>
        {this.state.expanded ?
          (
            <div>{voteDisplay}</div>
          ) : (
            <div />
          )
        }
      </div>
    );
  }
}

repVoteStats.propTypes = {
};
repVoteStats.defaultProps = {
};
export default repVoteStats;
