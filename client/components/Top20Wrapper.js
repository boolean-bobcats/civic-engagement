import React from 'react';
import Console from './Top20Console';

const Top20Wrapper = () =>
  (
    <div className="top20-main">
      <div className="top20-header header">
        <h2>Campaign Finance Top 20 Lists</h2>
      </div>
      <div className="row">
        <Console />
      </div>
    </div>
  );

export default Top20Wrapper;
