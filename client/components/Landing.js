import React, { Component } from 'react';
import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import Button from 'grommet/components/Button';
import Article from 'grommet/components/Article';
import Footer from 'grommet/components/Footer';
import Hero from 'grommet/components/Hero';
import Section from 'grommet/components/Section';
import Image from 'grommet/components/Image';
import Headline from 'grommet/components/Headline';
import Animate from 'grommet/components/Animate';
import Form from 'grommet/components/Form';
import SearchInput from 'grommet/components/SearchInput';
import Heading from 'grommet/components/Heading';
import UserFemaleIcon from 'grommet/components/icons/base/UserFemale';
import UserIcon from 'grommet/components/icons/base/User';


class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      searchVisibility: false
    };
    this.toggleVisibility = this.toggleVisibility.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  toggleVisibility() {
    this.setState({
      searchVisibility: true
    });
  }

  onInputChange(event) {
    console.log(event.target.value);
    this.setState({ input: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
  }


  render() {
    return (
      <Article scrollStep={true}>

        <Header float={false} fixed={true} />

        <Hero background={<Image src={'../media/landing.jpg'} fit="cover" full={true} />}>
          <Box align="center" justify="center" full="horizontal">
            <Headline align="center">
              Your personal politics agency
            </Headline>
            <Box align="center" justify="center" pad={{ between: 'medium' }}>
              <Button
                label="Get Started"
                primary={true}
                onClick={this.toggleVisibility}
                className="landing-toggle"
              />
              <Animate
                enter={{ animation: 'slide-up', duration: 1000, delay: 300 }}
                visible={this.state.searchVisibility}
              >
                <Box>
                  <Form onSubmit={this.onSubmit} plain={true}>
                    <SearchInput
                      className="landing-searchbar"
                      placeHolder="Enter Address"
                      onDOMChange={this.onInputChange}
                      value={this.state.input}
                    />
                  </Form>
                </Box>
              </Animate>
            </Box>
          </Box>
        </Hero>

        <Section align="center" justify="center" colorIndex="grey-4-a" size="full" className="landing-panel2">
          <Headline align="center" size="small">
            Content and stuff about how cool the app is etc.
          </Headline>
        </Section>
        <Section align="center" justify="center" colorIndex="neutral-1-a" size="full" className="landing-team">
          <Heading align="center" strong={true} tag="h3" uppercase={true}>
            Meet The Team
          </Heading>
          <Box direction="row" size="full" pad={{ between: 'large' }}>
            <Box>
              {/* <UserFemaleIcon size="xlarge" /> */}
              <Heading tag="h3" strong={true}>Nino</Heading>
              <h4>Fullstack Developer</h4>
            </Box>
            <Box>
              {/* <UserIcon size="xlarge" /> */}
              <Heading tag="h3" strong={true}>Kevin</Heading>
              <h4>Fullstack Developer</h4>
            </Box>
            <Box>
              {/* <UserIcon size="xlarge" /> */}
              <Heading tag="h3" strong={true}>Rishi</Heading>
              <h4>Fullstack Developer</h4>
            </Box>
          </Box>
        </Section>
        <Footer align="center" justify="center">
          Copyright Boolean Bobcats 2017
        </Footer>
      </Article>
    );
  }
 }

export default Landing;
