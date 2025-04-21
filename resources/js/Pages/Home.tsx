import React from "react";

interface HomeProps {
    message: string;
}

const Home: React.FC<HomeProps> = ({ message }) => {
    return <h1>{message}</h1>;
};

export default Home;
