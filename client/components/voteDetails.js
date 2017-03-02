import React from 'react';

const VoteDetails = ({ vote }) => {
  const { description, question, date, position } = vote;

  return (
    <div>
      { date } <br />
      Voted: { position } { question } for { description }
    </div>
  );
};

export default VoteDetails;

// "member_id": "S000148",
// "chamber": "Senate",
// "congress": "115",
// "session": "1",
// "roll_call": "72",
// "bill": {},
// "description": "Wilbur L. Ross, Jr., of Florida, to be Secretary of Commerce",
// "question": "On the Cloture Motion",
// "date": "2017-02-17",
// "time": "13:17:00",
// "position": "No"
