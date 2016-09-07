import React from 'react';
import Paper from 'material-ui/Paper';

const paperStyle = {
  margin: '0 auto',
  padding: '1%',
};


const Author = () => {
  const links = {
    linkedin: 'https://www.linkedin.com/in/rafesp',
    github: 'https://github.com/NerdDiffer'
  };

  return (
    <section className="author">
      <h1>Rafael Espinoza</h1>
      <ul>
        <li>
          <a href={links.linkedin}
            target="_blank"
            className="authorLink">LinkedIn</a>
        </li>
        <li>
          <a href={links.github}
            target="_blank"
            className="authorLink">GitHub</a>
        </li>
      </ul>
    </section>
  );
}

const About = () => (
  <div className="about">
    <Paper style={paperStyle}>
      <section className="aboutApp">
        <p>
          The source code for this project is available on <a href="https://github.com/NerdDiffer/BeatSequencer" target="_blank">GitHub</a>
        </p>
        <p>
          TR808 samples were taken from Michael Fischer's recordings.
          See the <a href="http://smd-records.com/tr808/?page_id=14" target="_blank">original post.</a>
        </p>
        <Author />
      </section>
    </Paper>
  </div>
);

export default About;
