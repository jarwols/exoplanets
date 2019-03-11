import React, { Component } from 'react';
import planet from './planet.png';
import './Header.css';

const styles = {
  container: {
    height: '3rem',
    flex: '1 100%',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    background: '#010020',
  },
  header: {
    color: 'white',
    fontSize: '1.1em',
    marginLeft: '1em'
  },
  planet: {
    height: '2em',
    margin: 'auto 1em auto'
  }
}

class Header extends Component {
  render() {
    return (
      <div style={styles.container}>
        <h1 style={styles.header}>Exoplanet Data Explorer</h1>
        <img style={styles.planet} src={planet} alt="planet"/>
      </div>
    );
  }
}

export default Header;
