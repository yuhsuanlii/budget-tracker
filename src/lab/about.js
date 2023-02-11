import React from "react";
import { Link } from "react-router-dom";

const About = () => {
    return (
        <div>
            <h1>About</h1>
            <Link to="/"><button>BudgetTracker</button></Link>
            <Link to="/home"><button>home</button></Link>
        </div>
    )
}

export default About;