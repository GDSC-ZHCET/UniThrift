import React from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';
import logo from '../assets/logo.png';  
import member1 from '../assets/pp.jpeg';
import member2 from '../assets/pp.jpeg';
import member3 from '../assets/pp.jpeg';
import member4 from '../assets/pp.jpeg';

const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* <nav className="navbar">
        <div className="logo">
          <img src={logo} alt="Logo" />
          <span className="logo-name">UniThrift</span>
        </div>
        <div className="menu">
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#mission">Mission</a></li>
            <li><a href="#features">Features</a></li>
            <li><a href="#guide">Guide</a></li>
            <li><a href="#team">The Team</a></li>
          </ul>
        </div>
      </nav> */}

 
      <section id="home">
        <h1 className="home-heading">UniThrift</h1>
        <p className="home-tagline">Your tagline here</p>
        <Link to={'/products'} className='border-2 border-[#86b5af] mt-10 px-6 py-3 rounded-full text-xl bg-white text-[#86b5af] transition-all hover:scale-110 hover:bg-transparent hover:text-white hover:border-white cursor-pointer'>Explore</Link>
      </section>

      <section id="mission">
        <h2>Our Mission</h2>
        <p>
          At UNITHRIFT, our mission is to simplify student life by creating a platform where affordability, sustainability, and community come together. We’re here to help students buy, sell, and exchange essentials—from books to bikes to hostel must-haves—while promoting mindful consumption and reducing waste.
        </p>
        <p>
          By focusing on the unique needs of students, we aim to build a trusted space that’s practical, accessible, and eco-friendly. Together, we can make everyday living easier while contributing to a more sustainable future.
        </p>
      </section>

      <section id="features">
        <h2>Features</h2>
        <div className="features-grid">
          <div className="feature"><p>Feature Block 1</p></div>
          <div className="feature"><p>Feature Block 2</p></div>
          <div className="feature"><p>Feature Block 3</p></div>
          <div className="feature"><p>Feature Block 4</p></div>
          <div className="feature"><p>Feature Block 5</p></div>
          <div className="feature"><p>Feature Block 6</p></div>
        </div>
      </section>

   
      <section id="guide">
        <h2>Guide</h2>
      </section>

      <section id="team">
        <h2>Meet the Team</h2>
        <div className="team-members">
          <div className="team-member">
            <img src={member1} alt="Team Member 1" />
            <p>Team Member 1</p>
            <p>description here...</p>
          </div>
          <div className="team-member">
            <img src={member2} alt="Team Member 2" />
            <p>Team Member 2</p>
            <p>description here...</p>
          </div>
          <div className="team-member">
            <img src={member3} alt="Team Member 3" />
            <p>Team Member 3</p>
            <p>description here...</p>
          </div>
          <div className="team-member">
            <img src={member4} alt="Team Member 4" />
            <p>Team Member 4</p>
            <p>description here...</p>
          </div>
        </div>
        </section>
    </div>
  );
};

export default LandingPage;