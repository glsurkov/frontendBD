import React from 'react';
import SectionHeader from "./SectionHeader";
import About from "./About";
import Container from "../Container";

const Section = () => {

    const items = [<SectionHeader/>,<About/>];
    const listItem = items.map((item) =>
    <Container contain = {item} key = {Math.random() * (500 - 100) + 100}/>)

    return (
        <section className = "section">
            {listItem}
        </section>
    );
};

export default Section;