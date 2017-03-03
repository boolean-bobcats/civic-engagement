import React from 'react';
import Console from './Top20Console';
import Section from 'grommet/components/Section';
import Header from 'grommet/components/Header';
import Title from 'grommet/components/Title';


const Top20Wrapper = () =>
  (
    <div className="top20-main">
      <Header
        className="top20-header header"
        size="small"
      >
        <Title>
          Campaign Finance Top 20 Lists
        </Title>
      </Header>
      <Section
        className="top20-main"
      >
        <Console />
      </Section>
    </div>
  );

export default Top20Wrapper;
